"use client"
import './carrinho.css'
import ProdCarrinho from '@/components/ProdCarrinho'
import { useEffect, useState } from 'react'


export default function Carrinho() {
    const [usuario, setUsuario] = useState(null);
    const [gerente, setGerente] = useState(null)

    const [produtos, setProdutos] = useState([])

    const [totalUnits, setTotalUnits] = useState(0)
    const [totalCompra, setTotalCompra] = useState(0)

    const [erro, setErro] = useState(null)

    const [comentario, setComentario] = useState("")


    /* Pegando as infos do usuario logado */
    useEffect(() => {
        const dados = localStorage.getItem('usuario');
        if (dados) {
            setUsuario(JSON.parse(dados));
        }
    }, []);

    /* Buscando o Gerente */
    useEffect(() => {
        async function carregarGerente() {
            try {
                const res = await fetch(`http://localhost:4000/gerentes/${usuario.id}`);
                const data = await res.json();
                if (data.gerente) setGerente(data.gerente);
            } catch (error) {
                console.error("Erro ao buscar gerente:", error);
            }
        }

        if (usuario && !isNaN(usuario.id)) {
            carregarGerente();
        }
    }, [usuario])

    // Recebendo a lista de produtos
    useEffect(() => {
        const lista = JSON.parse(localStorage.getItem('lista')) || [];

        setProdutos(lista)
    }, [])


    // Função para atualizar a quantidade de produtos
    function atualizarQuantidade(id, novaQtd, precoUnitario, nomeProd) {
        setProdutos(prev => prev.map(p =>
            p.id === id ? { ...p, qtd: novaQtd, preco: precoUnitario, nome: nomeProd } : p
        ))

        const lista = JSON.parse(localStorage.getItem('lista')) || [];

        const index = lista.findIndex(item => item.id === id);
        if (index !== -1) {
            lista[index].qtd = novaQtd;
        }

        localStorage.setItem('lista', JSON.stringify(lista))
    }

    // Recalcula os totais sempre que "produtos" muda
    useEffect(() => {
        const totalUnidades = produtos.reduce((acc, p) => acc + p.qtd, 0)
        const totalPreços = produtos.reduce((acc, p) => acc + (p.preco ? p.qtd * p.preco : 0), 0)

        setTotalUnits(totalUnidades)
        setTotalCompra(totalPreços)
    }, [produtos])

    function limparLista() {
        localStorage.removeItem('lista')
        setProdutos([])
    }

    function enviarLista() {
        if (produtos.length === 0) {
            setErro('- A lista deve ter ao menos 1 produto');
            return;
        }

        // Montando a lista de compras
        const dadosLista = {
            idGerente: gerente.id,
            idEmpresa: gerente.idEmpresa,
            produtos,
            mensagemPedido: comentario,
            total: {
                unidades: totalUnits,
                preco: Number(totalCompra.toFixed(2))
            }
        }

        fetch('http://localhost:4000/gerentes/listas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosLista)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Erro ao enviar a lista');
                }
                return res.json();
            })
            .then(data => {
                if (data.sucesso) {
                    alert(data.mensagem);

                    localStorage.removeItem('lista')
                    window.location.href = `/gerente/pedidos/${data.idLista}`
                }
                else { 
                    console.log( data.erro);
                }
            })
            .catch(err => {
                console.error(err);
                setErro('Erro ao enviar a lista.');
            });

    }

    return (
        <div className="container d-flex flex-column gap-3">
            <div className="titulo carrinho-titulo">Lista de Compras</div>

            <div className="carrinho-quadro col-12 bordaCinza">

                {/* Adicionando os componentes com os produtos do carrinho */}
                <div className="p-3 bordaCinza carrinho-quadro-interno">
                    {produtos.map(prod => (
                        <ProdCarrinho
                            key={prod.id}
                            id_prod={prod.id}
                            qtd={prod.qtd}
                            funcaoAlterar={atualizarQuantidade}
                        />
                    ))}
                </div>

                {/* Totais da compra */}
                <div className='carrinho-total bordaCinza d-flex p-3'>
                    <div className="col-6">
                        <div><b>Total de Itens</b></div>
                        <div>{totalUnits} Unidades</div>
                    </div>

                    <div className="col-6">
                        <div><b>Preço total</b></div>
                        <div className="pc-precoTotal">R$ {totalCompra.toFixed(2).replace('.', ',')}</div>
                    </div>
                </div>

            </div>

            <div className="carrinho-quadro col-12 bordaCinza">
                <div>
                    <div><strong>Ponto de entrega</strong></div>
                    <div>
                        
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="comentario" className="form-label"><b>Comentário</b></label>
                    <textarea
                        className="form-control bordaCinza"
                        id="comentario"
                        rows={3}
                        placeholder="Adicione um comentário para a sua lista"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    />
                </div>

                <div className='col-12 d-flex gap-3 justify-content-end'>
                    <button className='btn btn-1' onClick={enviarLista}>Enviar lista para aprovação</button>
                    <button className='btn btn-2' onClick={limparLista}>Limpar lista</button>
                </div>

                {erro && <div className='pt-2 text-end text-danger'>{erro}</div>}
            </div>
        </div>
    )
}
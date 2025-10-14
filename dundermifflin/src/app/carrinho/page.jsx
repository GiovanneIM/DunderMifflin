"use client"
import './carrinho.css'
import ProdCarrinho from '@/components/ProdCarrinho'
import { useEffect, useState } from 'react'


export default function Carrinho() {
    // Lista de produtos
    const [produtos, setProdutos] = useState([
        { id: 0, quantidade: 1 },
        { id: 1, quantidade: 4 },
        { id: 2, quantidade: 2 }
    ])

    // Variáveis para os totais da compra
    const [totalUnits, setTotalUnits] = useState(0)
    const [totalCompra, setTotalCompra] = useState(0)

    // Função para atualizar a quantidade de produtos
    function atualizarQuantidade(id, novaQtd, precoUnitario) {
        setProdutos(prev => prev.map(p =>
            p.id === id ? { ...p, quantidade: novaQtd, preco: precoUnitario } : p
        ))
    }

    // Recalcula os totais sempre que "produtos" muda
    useEffect(() => {
        const totalUnidades = produtos.reduce((acc, p) => acc + p.quantidade, 0)
        const totalPreços = produtos.reduce((acc, p) => acc + (p.preco ? p.quantidade * p.preco : 0), 0)

        setTotalUnits(totalUnidades)
        setTotalCompra(totalPreços)
    }, [produtos])

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
                            qtd={prod.quantidade}
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
                <div className="mb-3">
                    <label htmlFor="comentario" className="form-label"><b>Comentário</b></label>
                    <textarea
                        className="form-control"
                        id="comentario"
                        rows={3}
                        placeholder="Adicione um comentário para a sua lista"
                        defaultValue={""}
                    />
                </div>

                <div className='col-12 d-flex gap-3 justify-content-end'>
                    <button className='btn btn-1'>Enviar lista para aprovação</button>
                    <button className='btn btn-2'>Apagar lista</button>
                </div>
            </div>
        </div>
    )
}
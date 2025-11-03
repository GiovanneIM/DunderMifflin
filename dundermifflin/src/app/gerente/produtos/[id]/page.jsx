"use client"

import '../produtos.css'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function ProdutoDetalhes() {
    const { id } = useParams();   // Obtendo o ID do produto
    const [produto, setProduto] = useState(null);
    const [descricao, setDescricao] = useState(null);
    const [imagemPrincipal, setImagemPrincipal] = useState(null)
    const [contagem, setContagem] = useState(1);

    // Recebendo o produto
    useEffect(() => {
        async function carregarProduto() {
            try {
                const res = await fetch(`http://localhost:4000/produtos/${id}`);
                const data = await res.json();
                setProduto(data.produto);
                setDescricao(data.descricao);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
            }
        }

        if (id) carregarProduto();
    }, [id]);

    // Atribuindo a imagem inicial da galeria
    useEffect(() => {
        if (produto?.imagem?.length) {
            setImagemPrincipal(produto.imagem[0]);
        }
        else {
            setImagemPrincipal("https://placehold.co/300x300");
        }
    }, [produto]);

    // Controlando o valor da contagem
    useEffect(() => {
        console.log(contagem);

        if (contagem < 1) {
            setContagem(1)
        }
    }, [contagem]);

    if (!produto) {
        return <div className="text-center">
            <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    /* Função para quando o usuário adiciona ao carrinho */
    function adicionarCarrinho() {
        const lista = JSON.parse(localStorage.getItem('lista')) || [];
        const idNum = Number(id)

        const index = lista.findIndex(item => item.id === idNum);

        if (index !== -1) {
            lista[index].qtd += contagem;
        } else {
            lista.push({ id: idNum, qtd: contagem });
        }

        const container = document.getElementById("toastContainer");

        if (!container) return;

        // Criando um toat
        const toast = document.createElement("div");
        toast.className = "toast align-items-center text-bg-light show mb-2";
        toast.role = "alert";
        toast.ariaLive = "assertive";
        toast.ariaAtomic = "true";
        toast.style.minWidth = "250px";

        toast.innerHTML = `
            <div class="toast-header fundoPreto">
                <strong class="me-auto">Produto adicionado</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body d-flex align-items-center gap-2">
                <img src="${produto.imagem[0]}" alt="${produto.nome}" class="toast-img" style="width:40px;height:40px;object-fit:cover;border-radius:5px;" />
                <div>
                <div><strong>${produto.nome}</strong></div>
                <div>Quantidade: ${contagem}</div>
                </div>
            </div>
        `;

        localStorage.setItem('lista', JSON.stringify(lista));
        container.appendChild(toast);

        // Inicializa e exibe o toast
        const toastInstance = new window.bootstrap.Toast(toast, { delay: 2500 });
        toastInstance.show();

        // Remove o toast do DOM depois de sumir
        toast.addEventListener("hidden.bs.toast", () => {
            toast.remove();
        });

    }

    return (
        <>
            <div className="container gap-4 d-flex flex-column ">
                <div className="produto-informacoes fundoBranco bordaCompleta bordaCinza">
                    <div className="col-12 col-lg-7">
                        <div className="galeria flex-column flex-md-row">
                            {/* Imagem Principal */}
                            <div className='img-galeria col-12 col-md-10'>
                                <img
                                    src={imagemPrincipal}
                                    className="img-fluid"
                                    alt="Produto"
                                />
                            </div>

                            {/* Miniaturas  VERTICAL*/}
                            <div className=" col-2 d-none d-md-flex justify-content-end">
                                <div className="container-miniaturas cm-vertical col-10">
                                    {
                                        produto.imagem.map((imagem, index) => {
                                            return <div
                                                onClick={() => setImagemPrincipal(imagem)}
                                                key={index}
                                            >
                                                <img
                                                    src={imagem}
                                                    className="img-thumbnail miniatura"
                                                />
                                            </div>
                                        })
                                    }
                                </div>
                            </div>

                            {/* Miniaturas  HORIZONTAL*/}
                            <div className="container-miniaturas cm-horizontal d-md-none">
                                {
                                    produto.imagem.map((imagem, index) => {
                                        return <div
                                            onClick={() => setImagemPrincipal(imagem)}
                                            key={index}
                                            className='col-2'
                                        >
                                            <img
                                                src={imagem}
                                                className="img-thumbnail miniatura"
                                            />
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-5">
                        <div className='div-infos'>
                            <div className='info-superior'>
                                <nav style={{ "--bs-breadcrumb-divider": "'/'" }} aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        {produto.categoria.map((cat, index) => {
                                            return <li key={index} className="breadcrumb-item">
                                                {cat}
                                            </li>
                                        })
                                        }
                                    </ol>
                                </nav>
                            </div>

                            <div className='info-meio'>
                                <div className='produto-nome'>{produto.nome}</div>
                                <div className='produto-preco'>R$ {produto.preco.toFixed(2).replace('.', ',')}</div>
                                <div className='d-flex justify-content-end gap-2'>
                                    <div className="prod-contador">
                                        <button className='prod-btn-contador' onClick={() => { setContagem(contagem - 1) }}>-</button>
                                        <div className='contador'>{contagem}</div>
                                        <button className='prod-btn-contador' onClick={() => { setContagem(contagem + 1) }}>+</button>
                                    </div>

                                    <div>
                                        <button className='btn btn-1' onClick={() => { adicionarCarrinho() }}>
                                            Adicionar ao carrinho
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='info-inferior'>
                                <div>Marca: {produto.marca}</div>
                                <div>ID Produto: {produto.id}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='descricao fundoBranco bordaCompleta bordaCinza' dangerouslySetInnerHTML={{ __html: descricao }}></div>
            </div>
        </>
    );
}

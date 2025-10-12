"use client"

import '../produtos.css'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function ProdutoDetalhes() {
    const { id } = useParams();   // Obtendo o ID do produto
    const [produto, setProduto] = useState(null);
    const [imagemPrincipal, setImagemPrincipal] = useState(null)
    const [contagem, setContagem] = useState(1);

    // Recebendo o produto
    useEffect(() => {
        async function carregarProduto() {
            try {
                const res = await fetch(`http://localhost:4000/produtos/${id}`);
                const data = await res.json();
                setProduto(data);
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

    /* Controlando o valor da contagem */
    useEffect(() => {
        console.log(contagem);

        if (contagem < 1) {
            setContagem(1)
        }
    }, [contagem]);

    if (!produto) {
        return <div className="text-center">
            <div className="spinner-border" role="status" style={{width:'3rem', height:'3rem'}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    return (
        <div className="container gap-4 d-flex flex-wrap justify-content-center">
            <div className="produto-informacoes">
                <div className="col-12 col-sm-5">
                    <div className="container galeria">
                        {/* Imagem Principal */}
                        <div className='img-galeria'>
                            <img
                                src={imagemPrincipal}
                                className="img-fluid"
                                alt="Produto"
                            />
                        </div>

                        {/* Miniaturas */}
                        <div className="container-miniaturas">
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

                <div className="col-12 col-sm-5">
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

                        <div className='info-principal'>
                            <div className='produto-nome'>{produto.nome}</div>
                            <div className='produto-preco'>R$ {produto.preco.toFixed(2).replace('.', ',')}</div>
                            <div className='d-flex justify-content-end gap-2'>
                                <div className="prod-contador">
                                    <button className='prod-btn-contador' onClick={() => { setContagem(contagem - 1) }}>-</button>
                                    <div className='contador'>{contagem}</div>
                                    <button className='prod-btn-contador' onClick={() => { setContagem(contagem + 1) }}>+</button>
                                </div>

                                <div>
                                    <button className='btn btn-1'>
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
        </div>


    );
}

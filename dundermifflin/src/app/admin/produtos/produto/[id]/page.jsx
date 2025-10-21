"use client"

import ImagemProd from '@/components/ImagemProd'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import '../../produtos.css'

export default function Produto() {
    const { id } = useParams();   // Obtendo o ID do produto
    const [produto, setProduto] = useState(null);

    // Recebendo o produto
    useEffect(() => {
        async function carregarProduto() {
            try {
                const res = await fetch(`http://localhost:4000/produtos/${id}`);
                const data = await res.json();
                const produto = data.produto;

                if (produto) { setProduto(produto); }
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
            }
        }

        if (id) carregarProduto();
    }, [id]);


    // Abrir modal
    function abrirModal() {
        const modal = new bootstrap.Modal(document.getElementById('modalImagem'))
        modal.show()
    }

    return <>
        {produto && <div className="container corpo py-4">
            <h2 className="titulo fs-2 text-center mb-4">produto {produto.id}</h2>

            <div className="d-flex flex-column align-items-center gap-4" onSubmit={atualizarProduto}>

                <div className="col-12 col-lg-10 p-4 rounded fundoCinza border bordaCinza">
                        /* DADOS DO PRODUTO */
                    <h4 className="mb-3">Dados do Produto</h4>

                    <div className="row col-12 g-3">
                        <div className="col-md-6">{produto.nome}</div>

                        <div className="col-md-6">
                            <label htmlFor="preco" className="form-label">Preço <span className="text-body-secondary">*</span></label>

                            <div className="input-group">
                                <span className="input-group-text">R$</span>{" "}
                                <input type="text" className="form-control" id="preco" placeholder="0,00" value={preco} onChange={(e) => setPreco(e.target.value)} required />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="marca" className="form-label">Marca <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="marca" placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} required />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="cat1" className="form-label">Categoria Geral<span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="cat1" placeholder="Categoria Geral" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="cat2" className="form-label">Subcategoria<span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="cat2" placeholder="Subcategoria" value={subcategoria} onChange={(e) => setSubcategoria(e.target.value)} required />
                        </div>
                    </div>

                        /* IMAGENS */
                    <h4 className="mb-3 mt-4">Imagens</h4>

                    <div className="row col-12 g-3 p-2">
                        <div className="adicionarImagem col-12">
                            <button
                                type="button"
                                className="botaoAdicionar btn col-12"
                                onClick={abrirModal}
                            >
                                <div>Adicionar imagem</div>
                                <div>+</div>
                            </button>

                            <div className='container-imagens p-3' id='divImagens'>
                                {imagens && imagens.map((imagem, index) => {
                                    return <ImagemProd key={index} imagem={imagem} funcaoExcluir={excluirImagem} index={index} />
                                })}
                            </div>
                        </div>
                    </div>

                    {/* DESCRIÇÃO DO PRODUTO */}
                    <h4 className="mb-3 mt-4">Descrição</h4>

                    <div className="row col-12 g-3 p-2">
                        <div className="form-floating">
                            <textarea
                                className="form-control bordaCinza"
                                placeholder="Descrição do Produto"
                                id="descricao"
                                style={{ height: 200 }}
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                    /* REGISTRAR PRODUTO */
                <div className="col-12 col-lg-10 d-flex justify-content-end">
                    <button type="submit" className="btn btn-1">Atualizar Produto</button>
                </div>
            </div>
        </div>
        }



        {/* MODAL */}
        <div className="modal fade" id="modalImagem" tabIndex="-1" aria-labelledby="modalImagemLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalImagemLabel">Adicionar Imagem</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>

                    {/* INPUT */}
                    <div className="modal-body">
                        
                    </div>

                    {/* BOTÕES */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Cancelar</button>
                        <button type="button" className="btn btn-primary" >Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
"use client"

import ImagemProd from '@/components/ImagemProd'
import { useState, useEffect } from 'react'
import '../produtos.css'

export default function AtualizarProduto() {
    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState('')
    const [marca, setMarca] = useState('')
    const [categoria, setCategoria] = useState('')
    const [subcategoria, setSubcategoria] = useState('')
    const [imagens, setImagens] = useState([])
    const [descricao, setDescricao] = useState('')

    function adicionarImagem() {
        const novaImagem = prompt("Insira o link da imagem:")
        if (novaImagem) setImagens([...imagens, novaImagem])
    }

    function excluirImagem(indice) {
        setImagens(imagens.filter((_, i) => i !== indice))
    }

    function cadastrarProduto(e) {
        e.preventDefault() // impede o reload do form

        const produto = {
            nome,
            preco,
            marca,
            categoria,
            subcategoria,
            descricao,
            imagens
        }

        console.log("Produto a cadastrar:", produto)
        // aqui você pode fazer:
        // fetch("http://localhost:4000/produtos", { method: "POST", body: JSON.stringify(produto), headers: { "Content-Type": "application/json" } })
    }

    return <>
        <div className="container corpo py-4">
            <h2 className="titulo fs-2 text-center mb-4">Registrar produto</h2>

            <form className="d-flex flex-column align-items-center gap-4" onSubmit={cadastrarProduto}>

                {/* ===== Dados da Empresa ===== */}
                <div className="col-12 col-lg-10 p-4 rounded fundoCinza border bordaCinza">
                    <h4 className="mb-3">Dados do Produto</h4>

                    <div className="row col-12 g-3">
                        <div className="col-md-6">
                            <label htmlFor="razaoSocial" className="form-label">Nome <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="Nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>

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

                    <h4 className="mb-3 mt-4">Imagens</h4>

                    <div className="row col-12 g-3 p-2">
                        <div className="adicionarImagem col-12">
                            <button
                                type="button"
                                className="botaoAdicionar btn col-12"
                                onClick={adicionarImagem}
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

                {/* ===== Botão ===== */}
                <div className="col-12 col-lg-10 d-flex justify-content-end">
                    <button type="submit" className="btn btn-1">Registrar Produto</button>
                </div>
            </form>
        </div>
    </>
}
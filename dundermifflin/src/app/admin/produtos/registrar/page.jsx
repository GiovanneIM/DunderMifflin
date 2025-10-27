"use client"

/*
    Página para registrar um produto
        • Pedir informações do produto
        • Permitir adcionar imagens do produto (No mínimo 1)
        • Permmitir adicionar a descrição do produto
*/

import { useState } from 'react'
import '../produtos.css'

export default function RegistrarProduto() {
    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState('')
    const [marca, setMarca] = useState('')
    const [categoria, setCategoria] = useState('')
    const [subcategoria, setSubcategoria] = useState('')
    const [imagens, setImagens] = useState([])
    const [descricao, setDescricao] = useState('')

    const [novaImagem, setNovaImagem] = useState('')
    const [imagemPrincipal, setImagemPrincipal] = useState('https://placehold.co/300x300?text=Sem+imagem');

    const [id, setID] = useState(false)
    const [erros, setErros] = useState([])

    // Abrir modal
    function abrirModal() {
        const modal = new bootstrap.Modal(document.getElementById('modalImagem'))
        modal.show()
    }

    // Excluir uma imagem do array
    function excluirImagem() {
        const novasImagens = imagens.filter((imagem) => imagem !== imagemPrincipal);
        setImagens(novasImagens);
        setImagemPrincipal(novasImagens[0] || 'https://placehold.co/300x300?text=Sem+imagem');
    }


    // Adicionar imagem ao array e fechar modal
    function adicionarImagem() {
        if (novaImagem.trim() === '') return

        setImagens([...imagens, novaImagem]);
        setImagemPrincipal(novaImagem);
        setNovaImagem('');

        const modal = bootstrap.Modal.getInstance(document.getElementById('modalImagem'));
        modal.hide();
    }

    // Adicionando o produto ao banco
    function cadastrarProduto(e) {
        e.preventDefault()

        const novosErros = [];

        if (imagens.length < 1) novosErros.push('- O produto deve ter ao menos uma imagem');
        if (!nome) novosErros.push('- O produto deve ter um nome');
        if (isNaN(Number(preco.replace(',', '.'))) || Number(preco.replace(',', '.')) === 0) novosErros.push('- O produto deve ter um preço válido');
        if (!marca) novosErros.push('- O produto deve ter uma marca');
        if (!categoria) novosErros.push('- O produto deve ter uma categoria');
        if (!subcategoria) novosErros.push('- O produto deve ter uma subcategoria');

        if (novosErros.length > 0) {
            setErros(novosErros);
            return;
        }

        const produto = {
            nome,
            "preco": Number(preco.replace(',', '.')),
            marca,
            "categoria": [categoria, subcategoria],
            "imagem": imagens,
            descricao
        }


        fetch("http://localhost:4000/admin/adicionar", {
            method: "POST",
            body: JSON.stringify(produto),
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
            .then(async res => {
                const data = await res.json();
                if (data.sucesso) {
                    setID(data.idProduto);

                    // Redirecionando o usuário
                    // setTimeout(() => { window.location.href = `/admin/produtos/produto/${id}`; }, 1500);
                } else {
                    setErro(data.mensagem)
                }
            })
            .catch(err => alert("Erro na requisição: " + err.message));
    }



    return <>
        <h2 className="titulo fs-2 text-center mb-4">Registrar produto</h2>

        <div className="container py-4">

            <div className="container d-flex flex-wrap row-gap-3">
                {/* Imagens do produto*/}
                <div className="col-12 col-lg-6 pe-0 pe-lg-2">
                    <div className="galeria flex-column flex-md-row rounded shadow">
                        {/* Imagem Principal */}
                        <div className='img-galeria col-12 col-md-10'>
                            <img
                                src={imagemPrincipal}
                                className="img-completa"
                                alt="Produto"
                            />

                            <button type='button' className="imgExcluir btn" onClick={() => excluirImagem()}>-</button>
                        </div>

                        {/* Miniaturas  VERTICAL*/}
                        <div className=" col-2 d-none d-md-flex justify-content-end">
                            <div className="container-miniaturas cm-vertical col-10">
                                {
                                    imagens.map((imagem, index) => {
                                        return <div onClick={() => setImagemPrincipal(imagem)} key={index}>
                                            <img src={imagem} className="img-thumbnail miniatura img-completa" />
                                        </div>
                                    })
                                }

                                <div onClick={abrirModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" fill="currentColor" className="bi bi-plus img-thumbnail miniatura img-completa" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Miniaturas  HORIZONTAL*/}
                        <div className="container-miniaturas cm-horizontal d-md-none mt-2">
                            {
                                imagens.map((imagem, index) => {
                                    return <div onClick={() => setImagemPrincipal(imagem)} key={index} className='col-2'>
                                        <img src={imagem} className="img-thumbnail miniatura img-completa" />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>

                {/* Informações do produto */}
                <div className="col-12 col-lg-6 ps-0 ps-lg-2 d-flex flex-column justify-content-around row-gap-3">
                    <div className="d-flex flex-column gap-3 p-3 rounded shadow bg-light bordaCompleta bordaCinza">
                        <div className="fs-4 fw-medium mb-2">Dados do Produto</div>

                        <div>
                            <label htmlFor="nome" className="form-label fw-medium">Nome <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="Nome" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="preco" className="form-label">Preço <span className="text-body-secondary">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text">R$</span>{" "}
                                <input type="text" className="form-control" id="preco" placeholder="0,00" value={preco} onChange={(e) => setPreco(e.target.value)} required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="marca" className="form-label">Marca <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="marca" placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="cat1" className="form-label">Categoria Geral <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="cat1" placeholder="Categoria Geral" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="cat2" className="form-label">Subcategoria <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="cat2" placeholder="Subcategoria" value={subcategoria} onChange={(e) => setSubcategoria(e.target.value)} required />
                        </div>
                    </div>
                </div>

                {/* Descrição */}
                <div className='col-12 p-3 rounded shadow bg-light bordaCompleta bordaCinza descricao'>
                    <div className='fs-4 fw-medium mb-2'>Descrição</div>

                    <div className='d-flex flex-wrap'>
                        <div className='col-12 col-lg-6 pe-0 pe-md-2'>
                            <div className='fs-5 fw-medium my-2'>Definição</div>
                            <textarea
                                className="form-control "
                                placeholder="Descrição do Produto"
                                id="descricao"
                                style={{ minHeight: 500, maxHeight: 500 }}
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </div>

                        <div className='col-12 col-lg-6 ps-0 ps-md-2'>
                            <div className='fs-5 fw-medium my-2'>Pré visualisação</div>
                            <div className='descricao rounded p-2 bordaCompleta bordaCinza' style={{ minHeight: 500, maxHeight: 500, overflow: 'scroll' }} dangerouslySetInnerHTML={{ __html: descricao }}></div>
                        </div>
                    </div>
                </div>

                {/* Botoes */}
                <div className='col-12 d-flex flex-wrap flex-row-reverse gap-3 p-3 justify-content-center rounded shadow bg-light bordaCompleta bordaCinza descricao'>
                    <div><button type="submit" className="btn btn-1" onClick={cadastrarProduto}>Registrar Produto</button></div>
                    <div className='legenda_erro flex-grow-1'>
                        {erros && erros.map((erro, index) => { return <div key={index}>{erro}</div> })}
                    </div>
                </div>
            </div>
        </div>

        {/* MODAL */}
        <div className="modal fade" id="modalImagem" tabIndex="-1" aria-labelledby="modalImagemLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id="modalImagemLabel">Adicionar Imagem</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>

                    {/* INPUT */}
                    <div className="modal-body">
                        <label htmlFor="linkImagem" className="form-label">URL da imagem</label>
                        <input type="text" id="linkImagem" className="form-control" placeholder="URL da imagem" value={novaImagem} onChange={(e) => setNovaImagem(e.target.value)} />
                    </div>

                    {novaImagem && (
                        <img src={novaImagem} alt="Preview" className="img-fluid mt-3" />
                    )}
                    {/* BOTÕES */}
                    <div className="modal-footer">
                        <a type="button" className="btn btn-2" data-bs-dismiss="modal" >Cancelar</a>
                        <button type="button" className="btn btn-1" onClick={adicionarImagem} >Adicionar</button>
                    </div>
                </div>
            </div>
        </div>

        {/* Toast - Mensagem de sucesso */}
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 2000 }}>
            {id && (
                <div className="toast show align-items-center text-bg-success border-0" role="alert">
                    <div className="d-flex">
                        <div className="toast-body" id='corpo-toast'>
                            <strong>Produto registrado com sucesso com o ID {id}!</strong>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
}

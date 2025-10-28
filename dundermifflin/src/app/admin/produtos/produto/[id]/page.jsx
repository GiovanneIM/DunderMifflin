"use client"

/*
    Página para o gerente visualisar as informações
        • Ver as informações do produto
        • Opção para atualizar as informações do produto
        • Opção para estocar unidades do produto
*/

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import '../../produtos.css'
import '../produto.css'

export default function Produto() {
    const { id } = useParams();   // Obtendo o ID do produto
    const [produto, setProduto] = useState(null);
    const [imagemPrincipal, setImagemPrincipal] = useState(null);
    const [quantidade, setQuantidade] = useState(0);
    const [descricao, setDescricao] = useState(null);
    const [contagem, setContagem] = useState(1);

    const [excluir, setExcluir] = useState(null);


    // Recebendo o produto
    useEffect(() => {
        async function carregarProduto() {
            try {
                const res = await fetch(`http://localhost:4000/produtos/${id}`);
                const data = await res.json();
                const prod = await data.produto;

                setDescricao(data.descricao);
                setProduto(prod);
                setQuantidade(prod.quantidade);
                setImagemPrincipal(prod.imagem[0]);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
            }
        }

        if (id) carregarProduto();
    }, [id]);

    // Função para abrir o modal para estocar
    function abrirEstocar() {
        const modal = new bootstrap.Modal(document.getElementById(`modalEstocar-${produto.id}`));
        modal.show();
    }

    // Função para abrir o modal para excluir
    function abrirExcluir() {
        const modal = new bootstrap.Modal(document.getElementById(`modalExcluir-${produto.id}`));
        modal.show();
    }

    // Função para adicionar a quantidade ao estoque
    function adicionarQuantidade() {
        const modal = bootstrap.Modal.getInstance(document.getElementById(`modalEstocar-${produto.id}`));

        const container = document.getElementById("toastContainer");

        // Toast para confirmação
        const toast = document.createElement("div");
        toast.className = "toast align-items-center text-bg-light show mb-2";
        toast.role = "alert";
        toast.ariaLive = "assertive";
        toast.ariaAtomic = "true";
        toast.style.minWidth = "250px";

        toast.innerHTML = `
            <div class="toast-header fundoPreto">
                <strong class="me-auto">Adicionado ao estoque</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body d-flex align-items-center gap-2">
                <img src=${produto.imagem[0]} alt="${produto.id}" class="toast-img" style="width:40px;height:40px;object-fit:cover;border-radius:5px;" />
                <div>
                <div>
                    <strong>Quantidade adicionada!</strong> <br /> 
                    Produto <strong>${produto.id}</strong> - ${contagem} unidade(s) adicionadas.
                </div>
                </div>
            </div>
        `;

        fetch(`http://localhost:4000/admin/${produto.id}/quantidade`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantidade: contagem })
        }).then(async res => {
            const data = await res.json();
            if (data.sucesso) {
                setQuantidade(prev => prev + contagem)
                modal.hide();
                container.appendChild(toast);
            } else {
                console.log(data.mensagem);
            }
        })
    }

    function excluirProduto() {
        const modal = bootstrap.Modal.getInstance(document.getElementById(`modalExcluir-${produto.id}`));

        fetch(`http://localhost:4000/admin/produto/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        }).then(async res => {
            const data = await res.json();

            if (data.sucesso) {
                modal.hide();
                setExcluir(true)

                // Redirecionando o usuário
                setTimeout(() => { window.location.href = `/admin/produtos`; }, 1500);
            } else {
                console.log(data.mensagem);
            }
        })
    }

    return <>
        {produto && <>
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
                                                    className="img-thumbnail miniatura img-completa"
                                                />
                                            </div>
                                        })
                                    }
                                </div>
                            </div>

                            {/* Miniaturas  HORIZONTAL*/}
                            <div className="container-miniaturas cm-horizontal d-md-none mt-2">
                                {
                                    produto.imagem.map((imagem, index) => {
                                        return <div
                                            onClick={() => setImagemPrincipal(imagem)}
                                            key={index}
                                            className='col-2'
                                        >
                                            <img
                                                src={imagem}
                                                className="img-thumbnail miniatura img-completa"
                                            />
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    {/* Informações do produto */}
                    <div className="col-12 col-lg-6 ps-0 ps-lg-2 d-flex flex-column justify-content-around row-gap-3">
                        <div className="d-flex flex-column gap-3 p-3 rounded shadow fundoBranco bordaCompleta bordaCinza">
                            <div className="info-linha"><strong>ID</strong> {produto.id}</div>
                            <div className="info-linha"><strong>Produto</strong> {produto.nome}</div>
                            <div className="info-linha"><strong>Marca</strong> {produto.marca}</div>
                            <div className="info-linha"><strong>Preço</strong> R$ {produto.preco.toFixed(2).replace('.', ',')}</div>
                            <div className="info-linha"><strong>Categoria</strong> {produto.categoria[0]} → {produto.categoria[1]}</div>
                            {/* Botão atualizar */}
                            <div className='ms-auto'><button className='btn btn-1' onClick={() => { window.location.href = `/admin/produtos/atualizar/${produto.id}` }}>Atualizar informações</button></div>
                        </div>

                        <div className="d-flex flex-column gap-3 p-3 rounded shadow fundoBranco bordaCompleta bordaCinza">
                            <div className="info-linha"><strong>Estoque</strong> {quantidade}</div>
                            {/* Botão adicionar ao estoque */}
                            <div className='ms-auto'><button className='btn btn-2 fundoBranco' onClick={abrirEstocar}>Adicionar ao estoque</button></div>
                        </div>
                    </div>

                    {/* Descrição */}
                    <div className='col-12 p-3 rounded shadow fundoBranco bordaCompleta bordaCinza descricao'>
                        <div className='fs-3 mb-3'><strong>Descrição</strong></div>
                        <div className='descricao' dangerouslySetInnerHTML={{ __html: descricao }}></div>
                    </div>

                    {/* Excluir produto */}
                    <div className='d-flex col-12 p-3 rounded shadow fundoBranco bordaCompleta bordaCinza descricao'>
                        <div className='fs-3'><strong>Excluir</strong></div>
                        <div className='ms-auto'><button className='btn btn-3' onClick={abrirExcluir}>Excluir produto</button></div>
                    </div>
                </div>
            </div>

            {/* MODAL - Estoque*/}
            <div className="modal fade" id={`modalEstocar-${produto.id}`} tabIndex="-1" aria-labelledby="modalEstocarLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        {/* CABEÇALHO */}
                        <div className="modal-header fundoPreto">
                            <h5 className="modal-title" id="modalImagemLabel">Adicionar ao estoque</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                        </div>

                        {/* CORPO */}
                        <div className="modal-body">
                            <div className='col-12 p-3 d-flex flex-wrap justify-content-center align-items-center row-gap-2 mb-3 fundoCinza rounded'>
                                {/* IMAGEM */}
                                <div className="ca-img col-7 ratio-1 border rounded p-1 fundoBranco">
                                    <img src={produto.imagem[0]} className='img-completa' />
                                </div>

                                {/* INFORMAÇÕES GERAIS */}
                                <div className='col-12 col-sm-5 ps-sm-3 d-flex flex-wrap row-gap-2'>
                                    <div className='col-6 col-sm-12 pe-1 p-sm-0'>
                                        <div className="fw-semibold">Marca:</div>
                                        <div className='ps-2'>{produto.marca}</div>
                                    </div>
                                    <div className='col-6 col-sm-12 ps-1 p-sm-0'>
                                        <div className="fw-semibold">Preço:</div>
                                        <div className='ps-2'>R$ {produto.preco.toFixed(2).replace('.', ',')}</div>
                                    </div>
                                    <div className='col-6 col-sm-12'>
                                        <div className="fw-semibold">Estoque:</div>
                                        <div className='ps-2'>{quantidade}</div>
                                    </div>

                                    <div className='col-12'>
                                        <div className="fw-semibold">Categoria:</div>
                                        <div className='ps-2 ca-cat'>{produto.categoria[0] + ' > ' + produto.categoria[1]}</div>
                                    </div>
                                </div>

                                {/* NOME */}
                                <div className='col-12'>
                                    <div className="fw-semibold">Produto:</div>
                                    <div className='ca-nome'>{produto.nome}</div>
                                </div>
                            </div>

                            {/* CONTADOR - Quantidade a adicionar */}
                            <div className="d-flex flex-wrap column-gap-3 row-gap-2">
                                <label htmlFor="quantidadeAdd" className="form-label fw-semibold m-0 d-flex justify-text-center align-items-center">Quantidades a adicionar:</label>
                                <div className="div_contador rounded bordaCinza">
                                    <button type="button" className="btn-contador" id='btnAdicionar' onClick={() => setContagem(prev => Math.max(prev - 1, 1))}>-</button>
                                    <input
                                        type="number" className="form-control bordaCinza contador text-center" id="quantidadeAdd" value={contagem} min={1}
                                        onChange={(e) => setContagem(Number(e.target.value))}
                                        required
                                    />
                                    <button type="button" className="btn-contador" onClick={() => setContagem(prev => Math.min(prev + 1, 100))}>+</button>
                                </div>
                            </div>
                        </div>

                        {/* BOTÕES */}
                        <div className="modal-footer">
                            <div><button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Cancelar</button></div>
                            <div><button type="button" className="btn btn-primary" onClick={adicionarQuantidade}>Adicionar</button></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL - Excluir*/}
            <div className="modal fade" id={`modalExcluir-${produto.id}`} tabIndex="-1" aria-labelledby="modalExcluirLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        {/* CABEÇALHO */}
                        <div className="modal-header fundoPreto">
                            <h5 className="modal-title" id="modalExcluirLabel">Excluir produto</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                        </div>

                        {/* CORPO */}
                        <div className="modal-body">
                            <div className='col-12 p-3 d-flex flex-wrap justify-content-center align-items-center row-gap-2 mb-3 fundoCinza rounded'>
                                {/* IMAGEM */}
                                <div className="ca-img col-7 ratio-1 border rounded p-1 fundoBranco">
                                    <img src={produto.imagem[0]} className='img-completa' />
                                </div>

                                {/* INFORMAÇÕES GERAIS */}
                                <div className='col-12 col-sm-5 ps-sm-3 d-flex flex-wrap row-gap-2'>
                                    <div className='col-6 col-sm-12 pe-1 p-sm-0'>
                                        <div className="fw-semibold">Marca:</div>
                                        <div className='ps-2'>{produto.marca}</div>
                                    </div>
                                    <div className='col-6 col-sm-12 ps-1 p-sm-0'>
                                        <div className="fw-semibold">Preço:</div>
                                        <div className='ps-2'>R$ {produto.preco.toFixed(2).replace('.', ',')}</div>
                                    </div>
                                    <div className='col-6 col-sm-12'>
                                        <div className="fw-semibold">Estoque:</div>
                                        <div className='ps-2'>{quantidade}</div>
                                    </div>

                                    <div className='col-12'>
                                        <div className="fw-semibold">Categoria:</div>
                                        <div className='ps-2 ca-cat'>{produto.categoria[0] + ' > ' + produto.categoria[1]}</div>
                                    </div>
                                </div>

                                {/* NOME */}
                                <div className='col-12'>
                                    <div className="fw-semibold">Produto:</div>
                                    <div className='ca-nome'>{produto.nome}</div>
                                </div>
                            </div>
                        </div>

                        {/* BOTÕES */}
                        <div className="modal-footer">
                            <div className='col-12 fw-medium'>Tem certeza que deseja excluir o produto?</div>
                            <div><button type="button" className="btn btn-2" data-bs-dismiss="modal" >Cancelar</button></div>
                            <div><button type="button" className="btn btn-3" onClick={excluirProduto}>Confirmar</button></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TOAST - Excluir - Mensagem de sucesso */}
            <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 2000 }}>
                {excluir && (
                    <div className="toast show align-items-center text-bg-success border-0" role="alert">
                        <div className="d-flex">
                            <div className="toast-body" id='corpo-toast'>
                                <strong>Produto excluído com sucesso!</strong>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
        }
    </>
}
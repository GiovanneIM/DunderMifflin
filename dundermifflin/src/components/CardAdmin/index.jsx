'use client'

import { useState, useEffect } from "react";
import './card.css'

export default function CardAdmin({ produto }) {
    const [contagem, setContagem] = useState(1);
    const [quantidade, setQuantidade] = useState(produto.quantidade);

    // Função para abrir o modal para estocar
    function abrirModal() {
        const modal = new bootstrap.Modal(document.getElementById(`modalEstocar-${produto.id}`));
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


    return <>
        {/* CARD */}
        <div className='ca rounded fundoBranco shadow-sm border rounded'>
            {/* Titulo - ID */}
            <div className='ca-ID fundoPreto'>ID {produto.id}</div>

            {/* Corpo */}
            <div className='col-12 p-3 d-flex flex-wrap justify-content-between gap-2'>
                <div className="ca-img col-7 ratio-1 border rounded p-1">
                    <img src={produto.imagem[0]} className='img-completa' />
                    {/* <img src='https://static.vecteezy.com/system/resources/previews/000/272/740/original/vector-colorful-circle-banner-template-horizontal-advertising-business-banner.jpg' className='img-completa' /> */}
                </div>

                <div className='col-4'>
                    <div className='col-12'>
                        <div className="fw-semibold">Marca:</div>
                        <div>{produto.marca}</div>
                    </div>
                    <div className='col-12'>
                        <div className="fw-semibold">Preço:</div>
                        <div>{produto.preco.toFixed(2).replace('.', ',')}</div>
                    </div>
                    <div className='col-12'>
                        <div className="fw-semibold">Estoque:</div>
                        <div>{quantidade}</div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className="fw-semibold">Produto:</div>
                    <div className='ca-nome'>{produto.nome}</div>
                </div>

                <div className='col-12'>
                    <div className="fw-semibold">Categoria:</div>
                    <div className='ca-cat'>{produto.categoria[0] + ' > ' + produto.categoria[1]}</div>
                </div>
            </div>


            {/* Botoes */}
            <div className="ca-botoes col-12 d-flex gap-3 justify-content-center pb-3">
                <a href={`/admin/produtos/produto/${produto.id}`}><button className='btn btn-1'>Ver Produto</button></a>
                <button className='btn btn-2' onClick={abrirModal}>Estocar</button>
            </div>
        </div>

        {/* MODAL */}
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
    </>
}
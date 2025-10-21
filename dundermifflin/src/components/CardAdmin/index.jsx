'use client'

import './card.css'

export default function CardAdmin({ produto }) {

    // Modal
    function abrirModal() {
        const modal = new bootstrap.Modal(document.getElementById('modalEstocar'))
        modal.show()
    }

    return <>
        <div className='ca rounded fundoBranco'>
            <div className='ca-ID fundoPreto rounded-bottom-0'>ID {produto.id}</div>

            <div className='ca-img'>
                <img src={produto.imagem[0]} />
            </div>

            <div className='ca-infos col-10 rounded-top-0'>
                <div>{produto.nome}</div>
                <div>{produto.marca}</div>

                <div>Em estoque: <span>{produto.quantidade}</span></div>

                <div>{produto.preco.toFixed(2).replace('.', ',')}</div>
            </div>

            <div className="ca-botoes">
                <a href={`/admin/produtos/produto/${produto.id}`}><button className='btn btn-1'>Ver Produto</button></a>
                <button className='btn btn-2' onClick={abrirModal}>Estocar</button>
            </div>
        </div>

        {/* MODAL */}
        <div className="modal fade" id="modalEstocar" tabIndex="-1" aria-labelledby="modalImagemLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id="modalImagemLabel">Adicionar Imagem</h5>
                        <button type="button" className="btn-close btn-fechar" data-bs-dismiss="modal" aria-label="Fechar"></button>
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
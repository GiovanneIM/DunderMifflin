'use client'

import './card.css'

export default function CardAdmin({ produto }) {

    // Modal
    function abrirModal() {
        const modal = new bootstrap.Modal(document.getElementById('modalEstocar'))
        modal.show()
    }

    return <>
        {/* <div className='ca rounded fundoBranco shadow-sm border rounded'>
            <div className='ca-ID fundoPreto'>ID {produto.id}</div>

            <div className='col-12 d-flex align-items-center justify-content-center'>
                <div className="ca-img">
                    <img src={produto.imagem[0]} className='img-completa' />
                </div>
            </div>

            <div className='col-10 p-3 d-flex flex-wrap'>
                <div className='col-12'>
                    <div className="ca-titulo">Produto:</div>
                    <div className='ca-nome'>{produto.nome}</div>
                </div>
                <div className='col-12'>
                    <div className="ca-titulo">Marca:</div>
                    <div>{produto.marca}</div>
                </div>
                <div className='col-6'>
                    <div className="ca-titulo">Em estoque:</div>
                    <div>{produto.quantidade}</div>
                </div>
                <div className='col-6'>
                    <div className="ca-titulo">Preço:</div>
                    <div>{produto.preco.toFixed(2).replace('.', ',')}</div>
                </div>
            </div>

            <div className="ca-botoes col-12 d-flex gap-3 justify-content-center pb-3">
                <a href={`/admin/produtos/produto/${produto.id}`}><button className='btn btn-1'>Ver Produto</button></a>
                <button className='btn btn-2' onClick={abrirModal}>Estocar</button>
            </div>
        </div> */}

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
                        <div className="ca-titulo">Marca:</div>
                        <div className='border rounded ps-2'>{produto.marca}</div>
                    </div>
                    <div className='col-12'>
                        <div className="ca-titulo">Preço:</div>
                        <div className='border rounded ps-2'>{produto.preco.toFixed(2).replace('.', ',')}</div>
                    </div>
                    <div className='col-12'>
                        <div className="ca-titulo">Estoque:</div>
                        <div className='border rounded ps-2'>{produto.quantidade}</div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className="ca-titulo">Produto:</div>
                    <div className='ca-nome'>{produto.nome}</div>
                </div>

                <div className='col-12'>
                    <div className="ca-titulo">Categoria:</div>
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
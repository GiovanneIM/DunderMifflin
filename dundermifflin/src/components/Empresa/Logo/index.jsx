"use client"

/* Componente para exibir e atualizar a logo da empresa */

import { useState } from 'react'

export default function Logo({ logo, idEmpresa }) {
    const [novaLogo, setNovaLogo] = useState('')

    function abrirModal() {
        const modal = new bootstrap.Modal(document.getElementById('modalLogo'));
        modal.show();
    }

    function atualizarLogo() {
        fetch(`http://localhost:4000/empresas/${idEmpresa}/logo`, {
            method: "PATCH",
            body: JSON.stringify({ logo: novaLogo }),
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
            .then(async res => {
                const data = await res.json();
                if (data.sucesso) {
                    const modal = new bootstrap.Modal(document.getElementById('modalLogo'));
                    modal.hide();
                } else {
                    console.log(data.mensagem);
                }
            })
            .catch(err => alert("Erro na requisição: " + err.message));
    }


    return <>
        {/* Quadro da logo */}
        <div className='col-12 col-sm-8 col-lg-6 overflow-hidden pe-lg-2 position-relative fundoBranco'>
            <div className='p-3 bordaCompleta bordaCinza rounded p-3'>
                {/* Botão para atualizar a logo */}
                {/* <div className="text-end mb-3"><button type='button' className="btn btn-1" onClick={abrirModal}>Alterar logo</button></div> */}
                <div className="d-flex flex-wrap align-items-center border-bottom mb-3 pb-2 row-gap-2">
                    <h5 className="m-0">
                        <strong>Gerentes de Compras</strong>
                    </h5>

                    <div className="d-flex ms-auto column-gap-3">
                        <button type='button' className="btn btn-1" onClick={abrirModal}>Alterar logo</button>
                    </div>
                </div>

                {/* Logo */}
                <div className='col-12 bordaCompleta bordaCinza rounded' style={{ aspectRatio: '1' }}><img src={logo} className='img-completa' /></div>
            </div>
        </div>

        {/* MODAL para abrir atualizar a logo */}
        <div className="modal fade" id='modalLogo' tabIndex="-1" aria-labelledby='modalLogoLabel' aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id='modalLogoLabel'>Alterar logo</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>

                    {/* INPUT */}
                    <div className="modal-body">
                        <label htmlFor="linkImagem" className="form-label">URL da imagem</label>
                        <input type="text" id="linkImagem" className="form-control" placeholder="URL da imagem" value={novaLogo} onChange={(e) => setNovaLogo(e.target.value)} />
                    </div>

                    {novaLogo && (
                        <img src={novaLogo} alt="Preview" className="img-fluid mt-3" />
                    )}

                    {/* BOTÕES */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-2" onClick={atualizarLogo}>Atualizar</button>
                        <button type="button" className="btn btn-1" data-bs-dismiss="modal" >Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

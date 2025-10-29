'use client'

import { useState, useEffect } from "react";

import './filialitem.css'

export default function FilialItem({ idEmpresa, filial }) {
    const [mostrarInfo, setMostrarInfo] = useState(false);
    const [endereco, setEndereco] = useState([]);

    // Buscando o endereço pelo CEP
    useEffect(() => {
        async function CEP() {
            const res = await fetch(`https://viacep.com.br/ws/${filial.cep.replace('-', '')}/json`);
            const data = await res.json();
            setEndereco(data);
        }

        if (filial) CEP();
    }, []);

    function abrirInfo() {
        const modal = new bootstrap.Modal(document.getElementById(`modalFilialInfo-${filial.id}`));
        modal.show();
    }

    function fecharInfo() {
        const modal = new bootstrap.Modal(document.getElementById(`modalFilialInfo-${filial.id}`));
        modal.hide();
    }

    function abrirAtualizar() {
        fecharInfo();
        const modal = new bootstrap.Modal(document.getElementById(`modalFilialAtualizar-${filial.id}`));
        modal.show();
    }

    function fecharAtualizar() {
        const modal = new bootstrap.Modal(document.getElementById(`modalFilialAtualizar-${filial.id}`));
        modal.hide();
        abrirInfo();
    }

    function atualizarFilial() {
        
        fetch(`http://localhost:4000/empresas/${idEmpresa}/filial/${filial.id}`)
        .then(async res => {})
    }


    if (filial) return <>
        {/* FILIAL ITEM - Nome e Cep + botão para abrir as infos */}
        <div className="col-12 border-bottom py-2 d-flex justify-content-between align-items-center">
            <div>
                <strong>{filial.nome}</strong>
                <small className="text-muted d-block">{filial.cep}</small>
            </div>

            <div className="d-flex gap-2">
                <button className="btn btn-sm btn-2" onClick={abrirInfo}>Ver filial</button>
            </div>
        </div>


        {/* MODAL EXIBIÇÃO - Exibir informações da filial + botão para abrir atualizar */}
        <div className="modal fade" id={`modalFilialInfo-${filial.id}`} tabIndex="-1" aria-labelledby={`modalFilialInfo-${filial.id}-Label`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id={`modalfilial-${filial.id}-Label`}>Filial - {filial.nome}</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>

                    {/* INPUT */}
                    <div className="modal-body">
                        <div className="col-12 d-flex flex-column overflow-auto gap-3">

                            {/* Informações da empresa */}
                            <h4 className="col-12 m-0"><strong>Informações da filial</strong></h4>

                            <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                                <div className="info-linha"><strong>Nome</strong> {filial.nome}</div>
                                <div className="info-linha"><strong>ID</strong> {filial.id}</div>
                            </div>

                            {/* Endereço da empresa*/}
                            <h4 className="col-12 m-0"><strong>Endereço</strong></h4>

                            <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                                <div className="info-linha"><strong>CEP</strong> {filial.cep}</div>
                                <div className="info-linha"><strong>Estado</strong> {endereco.uf}</div>
                                <div className="info-linha"><strong>Cidade</strong> {endereco.localidade}</div>
                                <div className="info-linha"><strong>Bairro</strong> {endereco.bairro}</div>
                                <div className="info-linha"><strong>Rua</strong> {endereco.logradouro}</div>
                                <div className="info-linha"><strong>Número e complemento</strong> {filial.numero + ' - ' + filial.complemento}</div>
                            </div>
                        </div>
                    </div>

                    {/* BOTÕES */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-2" onClick={abrirAtualizar}>Atualizar</button>
                        <button type="button" className="btn btn-1" data-bs-dismiss="modal" >Fechar</button>
                    </div>
                </div>
            </div>
        </div>


        {/* MODAL ATUALIZAÇÃO - Atualizar as informações da filial */}
        <div className="modal fade" id={`modalFilialAtualizar-${filial.id}`} tabIndex="-1" aria-labelledby={`modalFilialAtualizar-${filial.id}Label`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id={`modalAtualizarFilial-${filial.id}Label`}>Atualizar Filial</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>

                    {/* INPUT */}
                    <div className="modal-body">
                        <div className="col-12 d-flex flex-column overflow-auto gap-3">

                            {/* Informações da empresa */}
                            <h4 className="col-12 m-0"><strong>Informações da filial</strong></h4>

                            <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                                <div className="info-linha"><strong>Nome</strong> {filial.nome}</div>
                                <div className="info-linha"><strong>ID</strong> {filial.id}</div>
                            </div>

                            {/* Endereço da empresa*/}
                            <h4 className="col-12 m-0"><strong>Endereço</strong></h4>

                            <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                                <div className="info-linha"><strong>CEP</strong> {filial.cep}</div>
                                <div className="info-linha"><strong>Estado</strong> {endereco.uf}</div>
                                <div className="info-linha"><strong>Cidade</strong> {endereco.localidade}</div>
                                <div className="info-linha"><strong>Bairro</strong> {endereco.bairro}</div>
                                <div className="info-linha"><strong>Rua</strong> {endereco.logradouro}</div>
                                <div className="info-linha"><strong>Número e complemento</strong> {filial.numero + ' - ' + filial.complemento}</div>
                            </div>
                        </div>
                    </div>

                    {/* BOTÕES */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-2" onClick={atualizarFilial}>Atualizar</button>
                        <button type="button" className="btn btn-1" data-bs-dismiss="modal" >Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
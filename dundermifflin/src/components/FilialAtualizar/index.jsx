'use client'

import { useState, useEffect } from 'react'

export default function FilialAtualizar ({ nome, id, cep, numero, complemento }) {

    const [endereco, setEndereco] = useState([]);

    // Buscando o endereço pelo CEP
    useEffect(() => {
        async function CEP() {
            const res = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json`);
            const data = await res.json();
            setEndereco(data);
        }

        if (cep) CEP();
    }, []);

    return <>
        {/* MODAL ATUALIZAÇÃO - Atualizar as informações da filial */}
        <div className="modal fade" id={`modalAtualizarFilial-${id}`} tabIndex="-1" aria-labelledby={`modalAtualizarFilial-${id}Label`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id={`modalAtualizarFilial-${id}Label`}>Atualizar Filial</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>

                    {/* INPUT */}
                    <div className="modal-body">
                        <div className="col-12 d-flex flex-column overflow-auto gap-3">

                            {/* Informações da empresa */}
                            <h4 className="col-12 m-0"><strong>Informações da filial</strong></h4>

                            <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                                <div className="info-linha"><strong>Nome</strong> {nome}</div>
                                <div className="info-linha"><strong>ID</strong> {id}</div>
                            </div>

                            {/* Endereço da empresa*/}
                            <h4 className="col-12 m-0"><strong>Endereço</strong></h4>

                            <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                                <div className="info-linha"><strong>CEP</strong> {cep}</div>
                                <div className="info-linha"><strong>Estado</strong> {endereco.uf}</div>
                                <div className="info-linha"><strong>Cidade</strong> {endereco.localidade}</div>
                                <div className="info-linha"><strong>Bairro</strong> {endereco.bairro}</div>
                                <div className="info-linha"><strong>Rua</strong> {endereco.logradouro}</div>
                                <div className="info-linha"><strong>Número e complemento</strong> {numero + ' - ' + complemento}</div>
                            </div>
                        </div>
                    </div>

                    {/* BOTÕES */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-2">Atualizar</button>
                        <button type="button" className="btn btn-1" data-bs-dismiss="modal" >Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
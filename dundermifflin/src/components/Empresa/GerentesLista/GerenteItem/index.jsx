'use client'

import { useState, useEffect } from "react";

export default function GerenteItem({ gerente, idEmpresa }) {
    /* Dados para exibir o gerente */
    const [nomeComp, setNomeComp] = useState(gerente.nomeCompleto);
    const [nomeUser, setNomeUser] = useState(gerente.nomeUsuario);
    const [email, setEmail] = useState(gerente.email);
    const [telefone, setTel] = useState(gerente.telefone);

    /* Para atualizar o gerente */
    const [nvNC, setNvNC] = useState(gerente.nomeCompleto);
    const [nvNU, setNvNU] = useState(gerente.nomeUsuario);
    const [nvEmail, setNvEmail] = useState(gerente.email);
    const [nvTel, setNvTel] = useState(gerente.telefone);
    const [nvSenha, setNvSenha] = useState(gerente.senha);


    /* Função para formatar o telefone */
    async function Telefone(e) {
        let tel = e.target.value.replace(/\D/g, '');  // Remove todos os digitos que não forem números

        if (tel.length > 11) tel = tel.slice(0, 11);  // Limita o tamanho a 11 caracteres

        // Formatação do Telefone
        if (tel.length > 7) {
            tel = tel.replace(/^(\d{2})(\d{5})(\d{1,4})$/, '($1) $2-$3');
        } else if (tel.length > 2) {
            tel = tel.replace(/^(\d{2})(\d{1,5})$/, '($1) $2');
        }

        setNvTel(tel); // Atualiza o texto no input
    }

    /*  FUNÇÕES DOS MODAIS */
    function abrirInfo() {
        const modal = new bootstrap.Modal(document.getElementById(`modalGerenteInfo-${gerente.id}`));
        modal.show();
    }
    function fecharInfo() {
        const modalElement = document.getElementById(`modalGerenteInfo-${gerente.id}`);
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    }

    function abrirAtualizar() {
        fecharInfo();
        const modal = new bootstrap.Modal(document.getElementById(`modalGerenteAtualizar-${gerente.id}`));
        modal.show();
    }
    function fecharAtualizar() {
        const modalElement = document.getElementById(`modalGerenteAtualizar-${gerente.id}`);
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        abrirInfo();
    }

    /* Função para atualizar o gerente */
    function atualizarGerente() {
        const infoGerente = {
            nomeCompleto: nvNC,
            nomeUsuario: nvNC,
            telefone: nvTel,
            email: nvEmail,
            senha: nvSenha
        }


        fetch(`http://localhost:4000/empresas/gerente/${gerente.id}`, {
            method: "PATCH",
            body: JSON.stringify(infoGerente),
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
            .then(async res => {
                const data = await res.json();

                if (data.sucesso) {
                    fecharAtualizar()

                    setNomeComp(nvNC);
                    setNomeUser(nvNU);
                    setTel(nvTel);
                    setEmail(nvEmail);
                }
                else {
                    console.log(data.mensagem);
                }
            })
            .catch(err => alert("Erro na requisição: " + err.message));
    }

    return <>
        {/* ENDEREÇO ITEM - Nome e Cep + botão para abrir as infos */}
        <div className="col-12 border-bottom py-2 d-flex justify-content-between align-items-center">
            <div>
                <strong>{gerente.id} - {nomeComp}</strong>
                <small className="text-muted d-block">{email} - {telefone}</small>
            </div>

            <div className="d-flex gap-2">
                <button className="btn btn-sm btn-2" onClick={abrirInfo}>Ver</button>
            </div>
        </div>

        {/* MODAL EXIBIÇÃO - Exibir informações do endereco + botão para abrir atualizar */}
        <div className="modal fade" id={`modalGerenteInfo-${gerente.id}`} tabIndex="-1" aria-labelledby={`modalGerenteInfo-${gerente.id}-Label`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id={`modalGerenteInfo-${gerente.id}-Label`}>Gerente - {nomeComp}</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>

                    {/* INPUT */}
                    <div className="modal-body">
                        <div className="col-12 d-flex flex-column overflow-auto gap-3">

                            {/* Informações da empresa */}
                            <h4 className="col-12 m-0"><strong>Informações do gerente</strong></h4>

                            <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                                <div className="info-linha"><strong>ID</strong> {gerente.id}</div>
                                <div className="info-linha"><strong>Nome completo</strong> {nomeComp}</div>
                                <div className="info-linha"><strong>Nome de usuário</strong> {nomeUser}</div>
                                <div className="info-linha"><strong>Telefone</strong> {telefone}</div>
                                <div className="info-linha"><strong>E-mail</strong> {email}</div>
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


        {/* MODAL ATUALIZAÇÃO - Atualizar as informações do endereço */}
        <div className="modal fade" id={`modalGerenteAtualizar-${gerente.id}`} tabIndex="-1" aria-labelledby={`modalGerenteAtualizar-${gerente.id}Label`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id={`modalGerenteAtualizar-${gerente.id}Label`}>Atualizar Endereço</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>

                    {/* INPUT */}
                    <div className="modal-body">
                        <div className="col-12 d-flex flex-column overflow-auto gap-3">

                            {/* Informaçõ */}
                            <h4 className="col-12 m-0"><strong>Atualizar Gerente - ID {gerente.id}</strong></h4>

                            <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                                <h4 className="mb-3 bordaCompleta bordaCinza border-end-0 border-top-0 border-start-0">Identificação</h4>

                                <div className="info-linha mb-3"><strong>ID</strong> {gerente.id}</div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="nomeComp" className="form-label">Nome Completo <span className="text-body-secondary">*</span></label>
                                    <input value={nvNC} onChange={(e) => setNvNC(e.target.value)} className="form-control bordaCinza" type="text" id="nomeComp" placeholder="Nome" required />
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="nomeUser" className="form-label">Nome de usuário <span className="text-body-secondary">*</span></label>
                                    <input value={nvNU} onChange={(e) => setNvNU(e.target.value)} className="form-control bordaCinza" type="text" id="nomeUser" placeholder="Nome de Usuário" required />
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="telefone" className="form-label">
                                        Telefone <span className="text-body-secondary">*</span>
                                    </label>
                                    <input value={nvTel} onChange={Telefone} className="form-control bordaCinza" type="text" id="telefone" placeholder="Telefone" required />
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="email" className="form-label">E-mail <span className="text-body-secondary">*</span></label>
                                    <input value={nvEmail} onChange={(e) => setNvEmail(e.target.value)} className="form-control bordaCinza" type="text" id="email" placeholder="E-mail" required />
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="senha" className="form-label">Senha <span className="text-body-secondary">*</span></label>
                                    <input value={nvSenha} onChange={(e) => setNvSenha(e.target.value)} className="form-control bordaCinza" type="text" id="senha" placeholder="E-mail" required />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTÕES */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-2" onClick={atualizarGerente}>Confirmar</button>
                        <button type="button" className="btn btn-1" data-bs-dismiss="modal" >Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
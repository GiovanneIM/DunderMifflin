"use client"

/* Componente para exibir e atualizar as informações do gerente */

import { useState, useEffect } from 'react'

export default function InformacoesGerente({ gerente }) {
    const [nC, setNC] = useState(gerente.nomeCompleto);
    const [nU, setNU] = useState(gerente.nomeUsuario);
    const [email, setEmail] = useState(gerente.email);
    const [telefone, setTelefone] = useState(gerente.telefone);

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

        e.target.value = tel; // Atualiza o texto no input
        setNvTel(tel)
    }

    /* Função para abrir o modal de atualização dos dados*/
    function abrirModalDados() {
        const modal = new bootstrap.Modal(document.getElementById('modalAtualizarDados'));
        modal.show();
    }

    /* Função para atualizar os dados */
    function AtualizarDados() {
        // Obtendo os dados do formulário
        const dados = {
            nomeCompleto: nvNC,
            nomeUsuario: nvNU,
            email: nvEmail,
            telefone: nvTel
        };

        fetch(`http://localhost:4000/gerentes/${gerente.id}/dados`, {
            method: "PATCH",
            body: JSON.stringify(dados),
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
            .then(async res => {
                const data = await res.json();
                if (data.sucesso) {
                    const modalElement = document.getElementById('modalAtualizarDados');
                    const modal = bootstrap.Modal.getInstance(modalElement);
                    modal.hide();

                    setNC(nvNC)
                    setNU(nvNU)
                    setEmail(nvEmail)
                    setTelefone(nvTel)
                } else {
                    console.log(data.mensagem);
                }
            })
            .catch(err => alert("Erro na requisição: " + err.message));
    }

    return <>
        <div className="col-12 d-flex flex-column justify-content-around row-gap-3">
            <div className="col-12 d-flex flex-column overflow-auto gap-3 p-3 rounded fundoBranco bordaCompleta bordaCinza">

                {/* Informações do Gerente */}

                <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                    <div className="info-linha"><strong>Nome Completo</strong> {nC}</div>
                    <div className="info-linha"><strong>Nome de Usuário</strong> {nU}</div>
                    <div className="info-linha"><strong>E-mail</strong> {email}</div>
                    <div className="info-linha"><strong>Telefone</strong> {telefone}</div>

                    <div className='mt-3 d-flex justify-content-end'>
                        <button className="btn btn-1" onClick={abrirModalDados}>Alterar dados</button>
                    </div>
                </div>
            </div>
        </div>

        {/* MODAL para abrir atualizar os dados */}
        <div className="modal fade" id='modalAtualizarDados' tabIndex="-1" aria-labelledby='modalAtualizarDadosLabel' aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id='modalAtualizarDadosLabel'>Alterar dados</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>

                    {/* INPUT */}
                    <div className="modal-body">
                        <div className="col-12 p-4 rounded bordaCompleta bordaCinza mb-3">

                            <div className="row col-12 g-3">
                                {/* Nome Completo */}
                                <div className="col-12">
                                    <label htmlFor="razaoSocial" className="form-label">Nome Completo <span className="text-body-secondary">*</span></label>
                                    <input type="text" className="form-control bordaCinza" id="razaoSocial" name="razaoSocial" placeholder="Razão Social" value={nvNC} onChange={(e) => setNvNC(e.target.value)} required />
                                </div>

                                {/* Nome de usuários */}
                                <div className="col-md-6">
                                    <label htmlFor="nomeFantasia" className="form-label">Nome de usuário</label>
                                    <input type="text" className="form-control bordaCinza" id="nomeFantasia" name="nomeFantasia" placeholder="Nome Fantasia" value={nvNU} onChange={(e) => setNvNU(e.target.value)} required/>
                                </div>

                                {/* Telefone */}
                                <div className="col-md-6">
                                    <label htmlFor="telefone" className="form-label">Telefone</label>
                                    <input type="tel" className="form-control bordaCinza" id="telefone" name="telefone" placeholder="(00) 0000-0000" value={nvTel} onChange={Telefone} />
                                </div>

                                {/* E-mail */}
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">E-mail <span className="text-body-secondary">*</span></label>
                                    <input type="email" className="form-control bordaCinza" id="email" name="email" placeholder="00.000.000/0000-00" value={nvEmail} onChange={(e) => setNvEmail(e.target.value)} required />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTÕES */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-2" onClick={AtualizarDados}>Atualizar</button>
                        <button type="button" className="btn btn-1" data-bs-dismiss="modal" >Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
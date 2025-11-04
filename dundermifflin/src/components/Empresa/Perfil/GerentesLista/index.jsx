'use client'

import { useEffect, useState } from "react";
import GerenteItem from "./GerenteItem";

export default function GerentesLista({ empresa }) {
    const [gerentes, setGerentes] = useState([]);

    /* Dados para um novo gerente */
    const [nvNC, setNvNC] = useState('');
    const [nvNU, setNvNU] = useState('');
    const [nvEmail, setNvEmail] = useState('');
    const [nvTel, setNvTel] = useState('');

    /* Para guardar o gerente a ser excluído */
    const [gerExcluir, setGerExcluir] = useState('');


    /* Buscando os gerentes */
    useEffect(() => {
        async function carregarGerentes() {
            try {
                const res = await fetch(`http://localhost:4000/empresas/${empresa.id}/gerentes`);
                const data = await res.json();

                if (data.sucesso) {
                    setGerentes(data.gerentes);
                    setGerExcluir(data.gerentes[0]?.id)
                    console.log("Gerentes carregados:", data.gerentes);
                } else {
                    console.log("Falha ao carregar gerentes:", data.erro);
                }
            } catch (error) {
                console.error("Erro ao buscar gerentes:", error);
            }
        }

        if (!isNaN(empresa.id)) carregarGerentes();
    }, [empresa]);

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

    /* Abrir modal para registrar novo endereço */
    function abrirRegistrar() {
        const modal = new bootstrap.Modal(document.getElementById('modalRegistrarGerente'));
        modal.show();
    }

    /* Abrir modal para excluir um endereço */
    function abrirExcluir() {
        const modal = new bootstrap.Modal(document.getElementById('modalExcluirGerente'));
        modal.show();
    }

    /* Registrar novo gerente */
    function registrarGerente() {
        const novoGerente = {
            idEmpresa: empresa.id,
            nomeCompleto: nvNC,
            nomeUsuario: nvNU,
            email: nvEmail,
            telefone: nvTel
        }

        fetch(`http://localhost:4000/empresas/gerente`, {
            method: "POST",
            body: JSON.stringify(novoGerente),
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
            .then(async res => {
                const data = await res.json();

                if (data.sucesso) {
                    const modalElement = document.getElementById('modalRegistrarGerente');
                    const modal = bootstrap.Modal.getInstance(modalElement);
                    modal.hide();

                    setGerentes([...gerentes, data.novoGerente]);

                    // Limpa os campos
                    setNvNC('');
                    setNvNU('');
                    setNvEmail('');
                    setNvTel('');
                } else {
                    console.log(data.mensagem);
                }
            })
            .catch(err => alert("Erro na requisição: " + err.message));
    }

    /* Excluir um gerente */
    function excluirGerente() {
        // console.log(gerExcluir);

        fetch(`http://localhost:4000/empresas/gerente/${gerExcluir}`, {
            method: "DELETE",
            credentials: 'include'
        })
            .then(async res => {
                const data = await res.json();

                if (data.sucesso) {
                    const modalElement = document.getElementById('modalExcluirGerente');
                    const modal = bootstrap.Modal.getInstance(modalElement);
                    modal.hide();

                    const gerentesRestantes = gerentes.filter((g) => g.id !== Number(gerExcluir))
                    setGerentes(gerentesRestantes);
                } else {
                    console.log(data.mensagem);
                }
            })
            .catch(err => alert("Erro na requisição: " + err.message));
    }

    return <>
        {/* Quadro com a lista de Gerentes */}
        <div className="col-12 p-0 col-lg-6 ps-lg-2 d-flex flex-wrap">
            <div className="col-12 p-3 rounded bordaCompleta bordaCinza">
                <div className="d-flex flex-wrap align-items-center border-bottom mb-3 pb-2 row-gap-2">
                    <h5 className="m-0">
                        <strong>Gerentes de Compras</strong>
                    </h5>

                    <div className="d-flex ms-auto column-gap-3">
                        {gerentes.length > 0 &&
                            <button className="btn btn-danger" onClick={abrirExcluir}>
                                Remover
                            </button>
                        }

                        <button className="btn btn-1" onClick={abrirRegistrar}>
                            Adicionar
                        </button>
                    </div>
                </div>

                <div
                    className="col-12 bordaCompleta bordaCinza rounded d-flex flex-wrap"
                    style={{ height: '250px', overflowY: 'scroll' }}
                >
                    <div className="col-12 p-3">
                        {gerentes?.length > 0 ? (
                            gerentes.map(gerente =>
                                <GerenteItem key={gerente.id} gerente={gerente} idEmpresa={empresa.id} />
                            )
                        ) : (
                            <div className="text-muted fst-italic">
                                Nenhum gerente cadastrado
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>


        {/* MODAL REGISTRAR */}
        <div
            className="modal fade"
            id="modalRegistrarGerente"
            tabIndex="-1"
            aria-labelledby="modalRegistrarGerenteLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id="modalRegistrarGerenteLabel">
                            Registrar gerente
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                            aria-label="Fechar"
                        ></button>
                    </div>

                    {/* INPUTS */}
                    <div className="modal-body">
                        <div className="col-12 d-flex flex-column overflow-auto gap-3">
                            <div className="col-12 p-3 rounded bordaCompleta bordaCinza">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label htmlFor="nomeComp" className="form-label">Nome Completo <span className="text-body-secondary">*</span></label>
                                        <input value={nvNC} onChange={(e) => setNvNC(e.target.value)} className="form-control bordaCinza" type="text" id="nomeComp" placeholder="Nome" required />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="nomeUser" className="form-label">Nome de usuário <span className="text-body-secondary">*</span></label>
                                        <input value={nvNU} onChange={(e) => setNvNU(e.target.value)} className="form-control bordaCinza" type="text" id="nomeUser" placeholder="Nome de Usuário" required />
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="telefone" className="form-label">
                                            Telefone <span className="text-body-secondary">*</span>
                                        </label>
                                        <input value={nvTel} onChange={Telefone} className="form-control bordaCinza" type="text" id="telefone" placeholder="Telefone" required />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="estado" className="form-label">E-mail <span className="text-body-secondary">*</span></label>
                                        <input value={nvEmail} onChange={(e) => setNvEmail(e.target.value)} className="form-control bordaCinza" type="text" id="email" placeholder="E-mail" required />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTÕES */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-2" onClick={registrarGerente}>
                            Registrar
                        </button>
                        <button type="button" className="btn btn-1" data-bs-dismiss="modal">
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>


        {/* MODAL EXCLUIR */}
        <div
            className="modal fade"
            id="modalExcluirGerente"
            tabIndex="-1"
            aria-labelledby="modalExcluirGerenteLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id="modalExcluirGerenteLabel">
                            Excluir Gerente
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                            aria-label="Fechar"
                        ></button>
                    </div>

                    {/* INPUTS */}
                    <div className="modal-body">
                        <div className="col-12 d-flex flex-column overflow-auto gap-3">
                            <div className="col-12 p-3 rounded bordaCompleta bordaCinza">
                                <div className="row g-3">
                                    <div><strong>Selecione o ID do gerente a ser excluído</strong></div>

                                    <div className="col-12">
                                        <div className="col-md-4">
                                            <label htmlFor="idExcluir" className="form-label">ID <span className="text-body-secondary">*</span></label>
                                            <select id="idExcluir" className="form-select bordaCinza" onChange={(e) => setGerExcluir(e.target.value)}>
                                                {gerentes && gerentes.map(gerente => <option key={gerente.id}>{gerente.id}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTÕES */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={excluirGerente}>
                            Excluir
                        </button>
                        <button type="button" className="btn btn-1" data-bs-dismiss="modal">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
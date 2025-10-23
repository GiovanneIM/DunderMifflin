'use client'

import { useState, useEffect } from 'react'

export default function RegistrarGerente() {
    let id;

    const [idEmpresa, setIDEmpresa] = useState(null)
    const [empresa, setEmpresa] = useState(null)

    // Obtendo o ID da empresa do LocalStorage
    useEffect(() => {
        const empresaLogada = JSON.parse(localStorage.getItem('usuario'))
        setIDEmpresa(empresaLogada.id)
    }, [])

    // Obtendo as informações da empresa
    useEffect(() => {
        if (isNaN(idEmpresa) || idEmpresa === null) return

        async function buscarEmpresa() {
            try {
                const res = await fetch(`http://localhost:4000/empresa/${idEmpresa}`)
                const data = await res.json()

                if (data.sucesso) {
                    setEmpresa(data.empresa)
                } else {
                    console.log(data.erro);
                }
            } catch (erro) {
                console.error('Erro ao carregar empresa:', erro)
            }
        }

        buscarEmpresa()
    }, [idEmpresa])

    // Função para a formatação do telefone
    async function Telefone(e) {
        let tel = e.target.value.replace(/\D/g, '');  // Remove todos os digitos que não forem números

        if (tel.length > 14) tel = tel.slice(0, 11);  // Limita o tamanho a 11 caracteres

        // Formatação do Telefone
        if (tel.length > 7) {
            tel = tel.replace(/^(\d{2})(\d{5})(\d{1,4})$/, '($1) $2-$3');
        } else if (tel.length > 2) {
            tel = tel.replace(/^(\d{2})(\d{1,5})$/, '($1) $2');
        }

        e.target.value = tel; // Atualiza o texto no input
    }

    // Função para registar o gerente
    function registrarGerente(e) {
        e.preventDefault();

        // Obtendo os dados do formulário
        const formData = new FormData(e.target);
        const infosGerente = Object.fromEntries(formData.entries());

        // Criando o corpo da requisição
        const gerente = {
            ...infosGerente,
            idFilial: Number(infosGerente.idFilial),
            idEmpresa
        }

        // Fazendo a requisição
        fetch('http://localhost:4000/empresa/gerente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gerente })
        })
        .then(res => res.json())
        .then(data => {
            const novoGerente = data.gerente
            document.getElementById('ger-id').value = novoGerente.id;
            id = novoGerente.id;
            document.getElementById('ger-senha').value = novoGerente.senha;
            document.getElementById('ger-nome').innerHTML = gerente.nomeUsuario;

            const modal = new bootstrap.Modal(document.getElementById('modalEmpRegistrada'))
            modal.show()
        })
    }

    function redirecionar(e) {
        window.location.href = `/empresa/gerentes/gerente/${id}`;
    }

    return <>
        {/* Registro */}
        <div className="container corpo py-4">
            <h2 className="titulo fs-2 text-center mb-4">Registrar gerente de compras</h2>

            <form className="d-flex flex-column align-items-center gap-4" onSubmit={registrarGerente}>

                {/* Dados da Empresa */}
                <div className="col-12 col-lg-10 p-4 rounded fundoCinza border bordaCinza">
                    <h4 className="mb-3">Dados do Gerente</h4>

                    <div className="row col-12 g-3">
                        <div className="col-md-6">
                            <label htmlFor="nomeCompleto" className="form-label">Nome completo <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="nomeCompleto" name="nomeCompleto" placeholder="Nome completo" required />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="nomeUsuario" className="form-label">Nome de usuário <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="nomeUsuario" name="nomeUsuario" placeholder="Nome de usuário" required />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">E-mail <span className="text-body-secondary">*</span></label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="E-mail" required />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="telefone" className="form-label">Telefone</label>
                            <input type="tel" className="form-control" id="telefone" name="telefone" onChange={Telefone} placeholder="(00) 0000-0000" />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="idFilial" className="form-label">Filial <span className="text-body-secondary">*</span></label>
                            <select className="form-select" id="idFilial" name="idFilial" required="">
                                {empresa && empresa.filiais.map((filial) => (
                                    <option key={filial.id} value={filial.id}>{filial.nome}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Botão Registrar */}
                <div className="col-12 col-lg-10 d-flex justify-content-end">
                    <button type="submit" className="btn btn-1">Registrar Empresa</button>
                </div>
            </form>
        </div>

        {/* MODAL */}
        <div className="modal fade" id="modalEmpRegistrada" tabIndex="-1" aria-labelledby="modalEmpRegistradaLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id="modalEmpRegistradaLabel">Gerente registrado</h5>
                    </div>

                    {/* INPUT */}
                    <div className="modal-body">
                        <div className="pb-3">O gerente <b id="ger-nome"></b> foi registrado com as informações abaixo:</div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">ID:</label>
                            <input type="text" className="form-control" id="ger-id" readOnly />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Senha:</label>
                            <input type="text" className="form-control" id="ger-senha" readOnly />
                        </div>

                        <div>Passe essas informações para que o gerente possa realizar login.</div>
                    </div>

                    {/* BOTÕES */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-1" data-bs-dismiss="modal" onClick={redirecionar}>Concluir</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
"use client"

/* Componente para exibir e atualizar as informações da empresa */

import { useState, useEffect } from 'react'

export default function InformacoesEmpresa({ empresa }) {
    const [rs, setRS] = useState(empresa.razaoSocial)
    const [nf, setNF] = useState(empresa.nomeFantasia)
    const [cnpj, setCNPJ] = useState(empresa.cnpj)
    const [telefone, setTel] = useState(empresa.telefone)
    
    const [endereco, setEndereco] = useState([]);
    const [cep, setCEP] = useState(empresa.enderecos[0].cep)

    const [nvRazaoSocial, setNvRS] = useState(empresa.razaoSocial)
    const [nvNomeFantasia, setNvNF] = useState(empresa.nomeFantasia)
    const [nvTelefone, setNvTEL] = useState(empresa.telefone)
    const [nvCNPJ, setNvCNPJ] = useState(empresa.cnpj)


    const [nvCEP, setNvCEP] = useState(empresa.enderecos[0].cep)
    const [nvEndereco, setNvEndereco] = useState([]);
    const [nvNumero, setNvNUM] = useState(empresa.enderecos[0].numero)
    const [nvComplemento, setNvCOMP] = useState(empresa.enderecos[0].complemento)

    /* Buscando o endereço pelo CEP */
    useEffect(() => {
        async function CEP() {
            const res = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json`);
            const data = await res.json();
            setEndereco(data);
            setNvEndereco(data);
        }

        if (cep) CEP();
    }, [cep]);

    /* Função para abrir o modal de atualização dos dados*/
    function abrirModalDados() {
        const modal = new bootstrap.Modal(document.getElementById('modalAtualizarDados'));
        modal.show();
    }

    /* Função para abrir o modal de atualização do endereço */
    function abrirModalEndereco() {
        const modal = new bootstrap.Modal(document.getElementById('modalAtualizarEndereco'));
        modal.show();
    }

    /* Função para formater o CNPJ */
    async function CNPJ(e) {
        let cnpj = e.target.value.replace(/\D/g, '');  // Remove todos os digitos que não forem números

        if (cnpj.length > 14) cnpj = cnpj.slice(0, 14);  // Limita o tamanho a 14 caracteres

        // Formatação do CNPJ
        if (cnpj.length > 12) {
            cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})$/, '$1.$2.$3/$4-$5');
        } else if (cnpj.length > 8) {
            cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{1,4})$/, '$1.$2.$3/$4');
        } else if (cnpj.length > 5) {
            cnpj = cnpj.replace(/^(\d{2})(\d{3})(\d{1,3})$/, '$1.$2.$3');
        } else if (cnpj.length > 2) {
            cnpj = cnpj.replace(/^(\d{2})(\d{1,3})$/, '$1.$2');
        }

        e.target.value = cnpj; // Atualiza o texto no input
        setNvCNPJ(cnpj);
    }

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
        setNvTEL(tel)
    }

    /* Função para completar o endereço pelo CEP */
    async function CEP(e) {
        let cepInput = e.target.value.replace(/\D/g, '');  // Remove todos os digitos que não forem números

        if (cepInput.length > 8) cepInput = cepInput.slice(0, 8);  // Limita o tamanho a 8 caracteres

        cepInput = cepInput.replace(/(\d{5})(\d)/, '$1-$2');  // Formatação do CEP

        setNvCEP(cepInput);
        e.target.value = cepInput; // Atualiza o texto no input

        // Se o usuário terminou de inserir o CEP, consulta a API dos correios
        // e preenche os outros campos de endereço
        if (cepInput.length === 9) {
            const res = await fetch(`https://viacep.com.br/ws/${cepInput.replace('-', '')}/json`);
            const data = await res.json();

            if (data.erro == true) {
                alert('CEP ínvalido');
            }
            else {
                // Preenche os dados que dependem do CEP
                setNvEndereco(data)
            }
        }
    }

    /* Função para atualizar os dados */
    function AtualizarDados(e) {
        e.preventDefault();

        // Obtendo os dados do formulário
        const dados = {
            razaoSocial: nvRazaoSocial,
            nomeFantasia: nvNomeFantasia,
            cnpj: nvCNPJ,
            telefone: nvTelefone
        };

        fetch(`http://localhost:4000/empresas/${empresa.id}/dados`, {
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

                    setRS(nvRazaoSocial)
                    setNF(nvNomeFantasia)
                    setCNPJ(nvCNPJ)
                    setTel(nvTelefone)
                } else {
                    console.log(data.mensagem);
                }
            })
            .catch(err => alert("Erro na requisição: " + err.message));
    }

    /* Função para atualizar o endereço */
    function AtualizarEndereco(e) {
        e.preventDefault();

        // Obtendo os dados do formulário
        const novo_endereco = {
            cep: nvCEP,
            numero: nvNumero,
            complemento: nvComplemento,
            estado: nvEndereco.uf,
            cidade: nvEndereco.localidade
        };

        fetch(`http://localhost:4000/empresas/${empresa.id}/endereco`, {
            method: "PATCH",
            body: JSON.stringify(novo_endereco),
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
            .then(async res => {
                const data = await res.json();
                if (data.sucesso) {
                    const modalElement = document.getElementById('modalAtualizarEndereco');
                    const modal = bootstrap.Modal.getInstance(modalElement);
                    modal.hide();

                    setCEP(nvCEP)
                    empresa.enderecos[0].numero = nvNumero
                    empresa.enderecos[0].complemento = nvComplemento
                } else {
                    console.log(data.mensagem);
                }
            })
            .catch(err => alert("Erro na requisição: " + err.message));
    }


    return <>
        <div className="col-12 col-lg-6 ps-lg-2 d-flex flex-column justify-content-around row-gap-3">
            <div className="col-12 d-flex flex-column overflow-auto gap-3 p-3 rounded fundoBranco bordaCompleta bordaCinza">

                {/* Informações da empresa */}
                <div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-2">
                    <h4 className=""><strong>Dados da empresa</strong></h4>
                    <button className="btn btn-1" onClick={abrirModalDados}>Alterar dados</button>
                </div>

                <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                    <div className="info-linha"><strong>Razão Social</strong> {rs}</div>
                    <div className="info-linha"><strong>Nome Fantasia</strong> {nf}</div>
                    <div className="info-linha"><strong>CNPJ</strong> {cnpj}</div>
                    <div className="info-linha"><strong>Telefone</strong> {telefone}</div>
                </div>

                {/* Endereço da empresa*/}
                <div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-2">
                    <h4 className=""><strong>Endereço Principal</strong></h4>
                    <button className="btn btn-1" onClick={abrirModalEndereco}>Alterar endereço</button>
                </div>


                <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                    <div className="info-linha"><strong>CEP</strong> {endereco.cep}</div>
                    <div className="info-linha"><strong>Estado</strong> {endereco.uf}</div>
                    <div className="info-linha"><strong>Cidade</strong> {endereco.localidade}</div>
                    <div className="info-linha"><strong>Bairro</strong> {endereco.bairro}</div>
                    <div className="info-linha"><strong>Rua</strong> {endereco.logradouro}</div>
                    <div className="info-linha"><strong>Número e complemento</strong> {empresa.enderecos[0].numero + ' - ' + empresa.enderecos[0].complemento}</div>
                </div>
            </div>
        </div>

        {/* MODAL para abrir atualizar os dados */}
        <div className="modal fade" id='modalAtualizarDados' tabIndex="-1" aria-labelledby='modalAtualizarDadosLabel' aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id='modalAtualizarDadosLabel'>Alterar logo</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>

                    {/* INPUT */}
                    <div className="modal-body">
                        <div className="col-12 p-4 rounded bordaCompleta bordaCinza mb-3">
                            <h4 className="mb-3 bordaCompleta bordaCinza border-end-0 border-top-0 border-start-0">Dados da Empresa</h4>

                            <div className="row col-12 g-3">
                                {/* Razao social */}
                                <div className="col-md-6">
                                    <label htmlFor="razaoSocial" className="form-label">Razão Social <span className="text-body-secondary">*</span></label>
                                    <input type="text" className="form-control bordaCinza" id="razaoSocial" name="razaoSocial" placeholder="Razão Social" value={nvRazaoSocial} onChange={(e) => setNvRS(e.target.value)} required />
                                </div>

                                {/* Nome fantasia */}
                                <div className="col-md-6">
                                    <label htmlFor="nomeFantasia" className="form-label">Nome Fantasia <span className="text-body-secondary">*</span></label>
                                    <input type="text" className="form-control bordaCinza" id="nomeFantasia" name="nomeFantasia" placeholder="Nome Fantasia" value={nvNomeFantasia} onChange={(e) => setNvNF(e.target.value)} required />
                                </div>

                                {/* CNPJ */}
                                <div className="col-md-6">
                                    <label htmlFor="cnpj" className="form-label">CNPJ <span className="text-body-secondary">*</span></label>
                                    <input type="text" className="form-control bordaCinza" id="cnpj" name="cnpj" placeholder="00.000.000/0000-00" value={nvCNPJ} onChange={CNPJ} required />
                                </div>

                                {/* Telefone */}
                                <div className="col-md-6">
                                    <label htmlFor="telefone" className="form-label">Telefone Comercial</label>
                                    <input type="tel" className="form-control bordaCinza" id="telefone" name="telefone" placeholder="(00) 0000-0000" value={nvTelefone} onChange={Telefone} />
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

        {/* MODAL para abrir atualizar o endereço */}
        <div className="modal fade" id='modalAtualizarEndereco' tabIndex="-1" aria-labelledby='modalAtualizarEnderecoLabel' aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id='modalAtualizarEnderecoLabel'>Alterar logo</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>

                    {/* INPUT */}
                    <div className="modal-body">
                        <div className="col-12 p-4 rounded bordaCompleta bordaCinza">
                            <h4 className="mb-3 bordaCompleta bordaCinza border-end-0 border-top-0 border-start-0">Endereço</h4>

                            <div className="row g-3">
                                {/* CEP */}
                                <div className="col-md-6">
                                    <label htmlFor="cep" className="form-label">CEP <span className="text-body-secondary">*</span></label>
                                    <input type="text" className="form-control bordaCinza" id="cep" name="cep" placeholder="00000-000" value={nvCEP ?? ""} onChange={CEP} required />
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="pais" className="form-label">País</label>
                                    <input type="text" className="form-control fundoCinza" id="pais" placeholder="País" value='Brasil' disabled />
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="estado" className="form-label">Estado</label>
                                    <input type="text" className="form-control fundoCinza" value={nvEndereco.estado ?? ""} id="estado" placeholder="Estado" disabled />
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="cidade" className="form-label">Cidade</label>
                                    <input type="text" className="form-control fundoCinza" value={nvEndereco.localidade ?? ""} id="cidade" placeholder="Cidade" disabled />
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="bairro" className="form-label">Bairro</label>
                                    <input type="text" className="form-control fundoCinza" value={nvEndereco.bairro ?? ""} id="bairro" placeholder="Bairro" disabled />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="rua" className="form-label">Rua</label>
                                    <input type="text" className="form-control fundoCinza" id="rua" placeholder="Rua" value={nvEndereco.logradouro ?? ""} disabled />
                                </div>

                                {/* Número */}
                                <div className="col-sm-6">
                                    <label htmlFor="numero" className="form-label">Número <span className="text-body-secondary">*</span></label>
                                    <input type="text" className="form-control bordaCinza" id="numero" name="numero" placeholder="Número" value={nvNumero} onChange={(e) => setNvNUM(e.currentTarget.value)} required />
                                </div>

                                {/* Complemento */}
                                <div className="col-sm-6">
                                    <label htmlFor="complemento" className="form-label">Complemento</label>
                                    <input type="text" className="form-control bordaCinza" id="complemento" name="complemento" value={nvComplemento} onChange={(e) => setNvCOMP(e.currentTarget.value)} placeholder="Complemento" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTÕES */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-2" onClick={AtualizarEndereco}>Atualizar</button>
                        <button type="button" className="btn btn-1" data-bs-dismiss="modal" >Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
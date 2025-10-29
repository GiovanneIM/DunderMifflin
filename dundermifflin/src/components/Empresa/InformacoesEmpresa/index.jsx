"use client"

/* Componente para exibir e atualizar as informações da empresa */

import { useState, useEffect } from 'react'

export default function InformacoesEmpresa({ empresa }) {
    const [endereco, setEndereco] = useState([]);
    const [cep, setCEP] = useState(empresa.cep)

    const [nvCEP, setNvCEP] = useState(empresa.cep)
    const [nvRazaoSocial, setNvRS] = useState(empresa.cep)
    const [nvNomeFantasia, setNvNF] = useState(empresa.cep)
    const [nvCNPJ, setNvCNPJ] = useState(empresa.cep)
    const [nvTelefone, setNvTEL] = useState(empresa.cep)
    const [nvNumero, setNvNUM] = useState(empresa.cep)
    const [nvComplemento, setNvCOMP] = useState(empresa.cep)

    /* Buscando o endereço pelo CEP */
    useEffect(() => {
        async function CEP() {
            const res = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json`);
            const data = await res.json();
            setEndereco(data);
        }

        if (cep) CEP();
    }, []);

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
    }

    /* Função para completar o endereço pelo CEP */
    async function CEP(e) {
        let cep = e.target.value.replace(/\D/g, '');  // Remove todos os digitos que não forem números

        if (cep.length > 8) cep = cep.slice(0, 8);  // Limita o tamanho a 8 caracteres

        cep = cep.replace(/(\d{5})(\d)/, '$1-$2');  // Formatação do CEP

        e.target.value = cep; // Atualiza o texto no input

        // Se o usuário terminou de inserir o CEP, consulta a API dos correios
        // e preenche os outros campos de endereço
        if (cep.length === 9) {
            const res = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json`);
            const data = await res.json();

            if (data.erro == true) {
                alert('CEP ínvalido');
            }
            else {
                // Preenche os dados que dependem do CEP
                document.getElementById('pais').value = 'Brasil';
                document.getElementById('estado').value = data.uf;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('rua').value = data.logradouro;
            }
        }
    }

    function AtualizarInfos(e) {
        e.preventDefault();

        // Obtendo os dados do formulário
        const infos = {
            cep: nvCEP,
            numero: nvNUM,
            complemento: nvCOMP
        };

        fetch(`http://localhost:4000/empresas/${empresa.id}/infos`, {
            method: "PATCH",
            body: JSON.stringify(infos),
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
            .then(async res => {
                const data = await res.json();
                if (data.sucesso) {
                    const modal = new bootstrap.Modal(document.getElementById('modalAtualizarInfos'));
                    modal.hide();
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
                {/* <h4 className="col-12 m-0"><strong>Informações da empresa</strong></h4> */}
                <div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-2">
                    <h4 className=""><strong>Dados da empresa</strong></h4>
                    <button className="btn btn-1" onClick={abrirModalDados}>Alterar dados</button>
                </div>

                <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                    <div className="info-linha"><strong>Razão Social</strong> {empresa.razaoSocial}</div>
                    <div className="info-linha"><strong>Nome Fantasia</strong> {empresa.nomeFantasia}</div>
                    <div className="info-linha"><strong>CNPJ</strong> {empresa.cnpj}</div>
                    <div className="info-linha"><strong>Telefone</strong> {empresa.telefone}</div>
                </div>
                {/* Endereço da empresa*/}
                <div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-2">
                    <h4 className=""><strong>Endereço</strong></h4>
                    <button className="btn btn-1" onClick={abrirModalEndereco}>Alterar endereço</button>
                </div>


                <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                    <div className="info-linha"><strong>CEP</strong> {empresa.cep}</div>
                    <div className="info-linha"><strong>Estado</strong> {endereco.uf}</div>
                    <div className="info-linha"><strong>Cidade</strong> {endereco.localidade}</div>
                    <div className="info-linha"><strong>Bairro</strong> {endereco.bairro}</div>
                    <div className="info-linha"><strong>Rua</strong> {endereco.logradouro}</div>
                    <div className="info-linha"><strong>Número e complemento</strong> {empresa.numero + ' - ' + empresa.complemento}</div>
                </div>

            </div>
        </div>

        {/* MODAL para abrir atualizar a logo */}
        <div className="modal fade" id='modalAtualizarInfos' tabIndex="-1" aria-labelledby='modalAtualizarInfosLabel' aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id='modalAtualizarInfosLabel'>Alterar logo</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>

                    {/* INPUT */}
                    <div className="modal-body">
                        {/* Dados da Empresa */}
                        <div className="col-12 p-4 rounded bordaCompleta bordaCinza mb-3">
                            <h4 className="mb-3 bordaCompleta bordaCinza border-end-0 border-top-0 border-start-0">Dados da Empresa</h4>

                            <div className="row col-12 g-3">
                                <div className="col-md-6">
                                    <label htmlFor="razaoSocial" className="form-label">Razão Social <span className="text-body-secondary">*</span></label>
                                    <input type="text" className="form-control bordaCinza" id="razaoSocial" name="razaoSocial" placeholder="Razão Social" required />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="nomeFantasia" className="form-label">Nome Fantasia <span className="text-body-secondary">*</span></label>
                                    <input type="text" className="form-control bordaCinza" id="nomeFantasia" name="nomeFantasia" placeholder="Nome Fantasia" required />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="cnpj" className="form-label">CNPJ <span className="text-body-secondary">*</span></label>
                                    <input type="text" className="form-control bordaCinza" id="cnpj" name="cnpj" placeholder="00.000.000/0000-00" onChange={CNPJ} required />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="telefone" className="form-label">Telefone Comercial</label>
                                    <input type="tel" className="form-control bordaCinza" id="telefone" name="telefone" placeholder="(00) 0000-0000" onChange={Telefone} />
                                </div>
                            </div>
                        </div>

                        {/* Endereço */}
                        <div className="col-12 p-4 rounded bordaCompleta bordaCinza">
                            <h4 className="mb-3 bordaCompleta bordaCinza border-end-0 border-top-0 border-start-0">Endereço</h4>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="cep" className="form-label">CEP <span className="text-body-secondary">*</span></label>
                                    <input type="text" className="form-control bordaCinza" id="cep" name="cep" placeholder="00000-000" onChange={CEP} required />
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="pais" className="form-label">País</label>
                                    <input type="text" className="form-control fundoCinza" id="pais" placeholder="País" disabled />
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="estado" className="form-label">Estado</label>
                                    <input type="text" className="form-control fundoCinza" id="estado" placeholder="Estado" disabled />
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="cidade" className="form-label">Cidade</label>
                                    <input type="text" className="form-control fundoCinza" id="cidade" placeholder="Cidade" disabled />
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="bairro" className="form-label">Bairro</label>
                                    <input type="text" className="form-control fundoCinza" id="bairro" placeholder="Bairro" disabled />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="rua" className="form-label">Rua</label>
                                    <input type="text" className="form-control fundoCinza" id="rua" placeholder="Rua" disabled />
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="numero" className="form-label">Número <span className="text-body-secondary">*</span></label>
                                    <input type="text" className="form-control bordaCinza" id="numero" name="numero" placeholder="Número" onChange={(e) => setNvNUM(e.currentTarget.value)} required />
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="complemento" className="form-label">Complemento</label>
                                    <input type="text" className="form-control bordaCinza" id="complemento" name="complemento" onChange={(e) => setNvCOMP(e.currentTarget.value)} placeholder="Complemento" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTÕES */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-2" onClick={AtualizarInfos}>Atualizar</button>
                        <button type="button" className="btn btn-1" data-bs-dismiss="modal" >Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
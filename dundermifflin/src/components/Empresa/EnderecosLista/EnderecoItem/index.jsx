'use client'

import { useState, useEffect } from "react";

export default function EnderecoItem({ idEmpresa, endereco }) {
    const [nome, setNome] = useState(endereco.nome)
    const [cep, setCEP] = useState(endereco.cep)
    const [numero, setNum] = useState(endereco.numero)
    const [complemento, setComp] = useState(endereco.complemento)
    const [enderecoConsulta, setConsulta] = useState([]);

    const [nvNome, setNvNome] = useState(endereco.nome)
    const [nvCEP, setNvCEP] = useState(endereco.cep)
    const [nvNumero, setNvNUM] = useState(endereco.numero)
    const [nvComplemento, setNvCOMP] = useState(endereco.complemento)
    const [nvEndereco, setNvEndereco] = useState([]);

    /* Buscando o endereço pelo CEP */
    useEffect(() => {
        async function CEP() {
            const res = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json`);
            const data = await res.json();
            setConsulta(data);
        }

        if (cep) CEP();
    }, []);

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

    /*  FUNÇÕES DOS MODAIS */
    function abrirInfo() {
        const modal = new bootstrap.Modal(document.getElementById(`modalEnderecoInfo-${endereco.id}`));
        modal.show();
    }

    function fecharInfo() {
        const modalElement = document.getElementById(`modalEnderecoInfo-${endereco.id}`);
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    }

    function abrirAtualizar() {
        fecharInfo();
        const modal = new bootstrap.Modal(document.getElementById(`modalEnderecoAtualizar-${endereco.id}`));
        modal.show();
    }

    function fecharAtualizar() {
        const modalElement = document.getElementById(`modalEnderecoAtualizar-${endereco.id}`);
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        abrirInfo();
    }

    /* Função para atualizar o endereço */
    function atualizarEndereco() {
        const infoEndereco = {
            nome: nvNome,
            cep: nvCEP,
            numero: nvNumero,
            complemento: nvComplemento
        }


        fetch(`http://localhost:4000/empresas/${idEmpresa}/endereco/${endereco.id}`, {
            method: "PATCH",
            body: JSON.stringify(infoEndereco),
            headers: { "Content-Type": "application/json" },
            credentials: 'include'
        })
            .then(async res => {
                const data = await res.json();

                if (data.sucesso) {
                    fecharAtualizar()

                    setNome(nvNome);
                    setCEP(nvCEP);
                    setNum(nvNumero);
                    setComp(nvComplemento);
                }
                else {
                    console.log(data.mensagem);
                }
            })
            .catch(err => alert("Erro na requisição: " + err.message));
    }


    if (endereco) return <>
        {/* ENDEREÇO ITEM - Nome e Cep + botão para abrir as infos */}
        <div className="col-12 border-bottom py-2 d-flex justify-content-between align-items-center">
            <div>
                <strong>{endereco.id} - {nome}</strong>
                <small className="text-muted d-block">{cep}</small>
            </div>

            <div className="d-flex gap-2">
                <button className="btn btn-sm btn-2" onClick={abrirInfo}>Ver</button>
            </div>
        </div>


        {/* MODAL EXIBIÇÃO - Exibir informações do endereco + botão para abrir atualizar */}
        <div className="modal fade" id={`modalEnderecoInfo-${endereco.id}`} tabIndex="-1" aria-labelledby={`modalEnderecoInfo-${endereco.id}-Label`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id={`modalEnderecoInfo-${endereco.id}-Label`}>Endereço - {endereco.nome}</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>

                    {/* INPUT */}
                    <div className="modal-body">
                        <div className="col-12 d-flex flex-column overflow-auto gap-3">

                            {/* Informações da empresa */}
                            <h4 className="col-12 m-0"><strong>Informações do endereço</strong></h4>

                            <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                                <div className="info-linha"><strong>ID</strong> {endereco.id}</div>
                                <div className="info-linha"><strong>Nome</strong> {nome}</div>
                            </div>

                            {/* Endereço da empresa*/}
                            <h4 className="col-12 m-0"><strong>Endereço</strong></h4>

                            <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                                <div className="info-linha"><strong>CEP</strong> {cep}</div>
                                <div className="info-linha"><strong>Estado</strong> {enderecoConsulta.uf}</div>
                                <div className="info-linha"><strong>Cidade</strong> {enderecoConsulta.localidade}</div>
                                <div className="info-linha"><strong>Bairro</strong> {enderecoConsulta.bairro}</div>
                                <div className="info-linha"><strong>Rua</strong> {enderecoConsulta.logradouro}</div>
                                <div className="info-linha"><strong>Número</strong> {numero}</div>
                                <div className="info-linha"><strong>Complemento</strong> {complemento ?? null}</div>
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
        <div className="modal fade" id={`modalEnderecoAtualizar-${endereco.id}`} tabIndex="-1" aria-labelledby={`modalEnderecoAtualizar-${endereco.id}Label`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id={`modalAtualizarEndereco-${endereco.id}Label`}>Atualizar Endereço</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>

                    {/* INPUT */}
                    <div className="modal-body">
                        <div className="col-12 d-flex flex-column overflow-auto gap-3">

                            {/* Informaçõ */}
                            <h4 className="col-12 m-0"><strong>Informações do Endereço - ID { }</strong></h4>

                            <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                                <h4 className="mb-3 bordaCompleta bordaCinza border-end-0 border-top-0 border-start-0">Identificação</h4>

                                <div className="info-linha mb-3"><strong>ID</strong> {endereco.id}</div>

                                <div className="col-12">
                                    <label htmlFor="nome" className="form-label">Nome do endereço <span className="text-body-secondary">*</span></label>
                                    <input value={nvNome} onChange={(e) => setNvNome(e.target.value)} className="form-control bordaCinza" id="nome" placeholder="Nome" type="text" aria-label="Nome" name="nome" />
                                </div>
                            </div>

                            {/* Endereço*/}
                            <div className="col-12 p-4 rounded bordaCompleta bordaCinza">
                                <h4 className="mb-3 bordaCompleta bordaCinza border-end-0 border-top-0 border-start-0">Endereço</h4>

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="cep" className="form-label">CEP <span className="text-body-secondary">*</span></label>
                                        <input value={nvCEP} onChange={CEP} className="form-control bordaCinza" id="cep" placeholder="00000-000" required="" type="text" name="cep" />
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="pais" className="form-label">País</label>
                                        <input value='Brasil' type="text" className="form-control fundoCinza" id="pais" placeholder="País" disabled />
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="estado" className="form-label">Estado</label>
                                        <input value={nvEndereco.uf ?? ""} type="text" className="form-control fundoCinza" id="estado" placeholder="Estado" disabled />
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="cidade" className="form-label">Cidade</label>
                                        <input value={nvEndereco.localidade ?? ""} type="text" className="form-control fundoCinza" id="cidade" placeholder="Cidade" disabled />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="bairro" className="form-label">Bairro</label>
                                        <input value={nvEndereco.bairro ?? ""} type="text" className="form-control fundoCinza" id="bairro" placeholder="Bairro" disabled />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="rua" className="form-label">Rua</label>
                                        <input value={nvEndereco.logradouro ?? ""} type="text" className="form-control fundoCinza" id="rua" placeholder="Rua" disabled />
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="numero" className="form-label">Número <span className="text-body-secondary">*</span></label>
                                        <input value={nvNumero ?? ""} onChange={(e) => setNvNUM(e.target.value)} type="text" className="form-control bordaCinza" id="numero" name="numero" placeholder="Número" required />
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="complemento" className="form-label">Complemento</label>
                                        <input value={nvComplemento ?? ""} onChange={(e) => setNvCOMP(e.target.value)} className="form-control bordaCinza" id="complemento" placeholder="Complemento" type="text" name="complemento" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTÕES */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-2" onClick={atualizarEndereco}>Confirmar</button>
                        <button type="button" className="btn btn-1" data-bs-dismiss="modal" >Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
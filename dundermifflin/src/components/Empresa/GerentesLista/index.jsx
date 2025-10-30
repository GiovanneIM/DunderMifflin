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
                    const modalElement = document.getElementById('modalRegistrarEndereco');
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
        console.log(gerExcluir);
        
        // fetch(`http://localhost:4000/empresas/${empresa.id}/gerente/${enderecoExcluir}`, {
        //     method: "DELETE",
        //     credentials: 'include'
        // })
        //     .then(async res => {
        //         const data = await res.json();

        //         if (data.sucesso) {
        //             const modalElement = document.getElementById('modalExcluirEndereco');
        //             const modal = bootstrap.Modal.getInstance(modalElement);
        //             modal.hide();

        //             setEnderecos(data.enderecos);
        //         } else {
        //             console.log(data.mensagem);
        //         }
        //     })
        //     .catch(err => alert("Erro na requisição: " + err.message));
    }

    return <>
        {/* Quadro com a lista de Gerentes */}
        <div className="col-12 p-0 col-lg-6 pe-lg-2 d-flex flex-wrap">
            <div className="col-12 p-3 rounded bordaCompleta bordaCinza">
                <div className="d-flex flex-wrap align-items-center border-bottom mb-3 pb-2 row-gap-2">
                    <h5 className="col-12 col-sm-4 m-0">
                        <strong>Gerentes de Compras</strong>
                    </h5>

                    <div className="d-flex ms-auto column-gap-3">
                        <button className="btn btn-danger" onClick={abrirExcluir}>
                            Remover
                        </button>

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
                                        <label htmlFor="nome" className="form-label">
                                            Nome do Gerente <span className="text-body-secondary">*</span>
                                        </label>
                                        <input
                                            value={nvNome}
                                            onChange={(e) => setNvNome(e.target.value)}
                                            className="form-control bordaCinza"
                                            id="nome"
                                            placeholder="Nome"
                                            type="text"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="cep" className="form-label">
                                            CEP <span className="text-body-secondary">*</span>
                                        </label>
                                        <input
                                            value={nvCEP}
                                            onChange={CEP}
                                            className="form-control bordaCinza"
                                            id="cep"
                                            placeholder="00000-000"
                                            type="text"
                                            required
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="pais" className="form-label">País</label>
                                        <input
                                            value="Brasil"
                                            type="text"
                                            className="form-control fundoCinza"
                                            id="pais"
                                            placeholder="País"
                                            disabled
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="estado" className="form-label">Estado</label>
                                        <input
                                            value={nvEndereco.uf}
                                            type="text"
                                            className="form-control fundoCinza"
                                            id="estado"
                                            placeholder="Estado"
                                            disabled
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="cidade" className="form-label">Cidade</label>
                                        <input
                                            value={nvEndereco.localidade}
                                            type="text"
                                            className="form-control fundoCinza"
                                            id="cidade"
                                            placeholder="Cidade"
                                            disabled
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="bairro" className="form-label">Bairro</label>
                                        <input
                                            value={nvEndereco.bairro}
                                            type="text"
                                            className="form-control fundoCinza"
                                            id="bairro"
                                            placeholder="Bairro"
                                            disabled
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="rua" className="form-label">Rua</label>
                                        <input
                                            value={nvEndereco.logradouro}
                                            type="text"
                                            className="form-control fundoCinza"
                                            id="rua"
                                            placeholder="Rua"
                                            disabled
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="numero" className="form-label">
                                            Número <span className="text-body-secondary">*</span>
                                        </label>
                                        <input
                                            value={nvNumero}
                                            onChange={(e) => setNvNumero(e.target.value)}
                                            type="text"
                                            className="form-control bordaCinza"
                                            id="numero"
                                            placeholder="Número"
                                            required
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="complemento" className="form-label">Complemento</label>
                                        <input
                                            value={nvComplemento}
                                            onChange={(e) => setNvComplemento(e.target.value)}
                                            className="form-control bordaCinza"
                                            id="complemento"
                                            placeholder="Complemento"
                                            type="text"
                                        />
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


export default function RegistrarEmpresa() {
    return <>
        {/* <div className="corpo d-flex">
            <div className="container p-md-0">
                <div className="titulo fs-2 col-12 text-center">Registrar empresa</div>
                <form className="mt-3 d-flex flex-column gap-3">
                    <div className="d-flex flex-column col-12 gap-3 justify-content-center align-items-center">
                        <div className="container-form col-12 col-lg-10 p-4 rounded justify-content-center fundoCinza border bordaCinza">

                            <div className="col-12 fs-4 mb-3"><b>Dados da Empresa</b></div>

                            <div className="row col-12 g-3">
                                <div className="col-md-6">
                                    <label htmlFor="razaoSocial" className="form-label">Razão Social <span class="text-body-secondary">*</span></label>
                                    <input type="text" className="form-control" id="razaoSocial" placeholder="Razão Social" required="True" />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="nomeFantasia" className="form-label">Nome Fantasia <span class="text-body-secondary">*</span></label>
                                    <input type="text" className="form-control" id="nomeFantasia" placeholder="Nome Fantasia" required="True" />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="cnpj" className="form-label">CNPJ <span class="text-body-secondary">*</span></label>
                                    <input type="text" className="form-control" id="cnpj" placeholder="00.000.000/0000-00" required="True" />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="telefone" className="form-label">Telefone Comercial</label>
                                    <input type="tel" className="form-control" id="telefone" placeholder="(00) 0000-0000" />
                                </div>
                            </div>

                            <div className="col-12 fs-4 mt-4 mb-3"><b>Endereço</b></div>

                            <div className="row col-12 g-3">
                                <div className="col-md-6">
                                    <label htmlFor="cep" className="form-label">CEP <span class="text-body-secondary">*</span></label>
                                    <input type="text" className="form-control" id="cep" placeholder="00000-000" required="True" />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="pais" className="form-label">País</label>
                                    <input type="text" className="form-control" id="pais" placeholder="País" readOnly="True" />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="estado" className="form-label">Estado</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="estado"
                                        placeholder="Estado"
                                        readOnly="True"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="cidade" className="form-label">Cidade</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cidade"
                                        placeholder="Cidade"
                                        readOnly="True"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="bairro" className="form-label">Bairro</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="bairro"
                                        placeholder="Bairro"
                                        readOnly="True"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="rua" className="form-label">Rua</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="rua"
                                        placeholder="Rua"
                                        readOnly="True"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="numero" className="form-label">Número</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="numero"
                                        placeholder="Número"
                                        readOnly="True"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="complemento" className="form-label">Complemento</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="complemento"
                                        placeholder="Complemento"
                                        readOnly="True"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex col-12 col-lg-10 justify-content-end"><button className="btn btn-1">Registrar Empresa</button></div>
                    </div>
                </form>
            </div>
        </div> */}



        <div className="container corpo py-4">
            <h2 className="titulo fs-2 text-center mb-4">Registrar empresa</h2>

            <form className="d-flex flex-column align-items-center gap-4">

                {/* ===== Dados da Empresa ===== */}
                <div className="col-12 col-lg-10 p-4 rounded fundoCinza border bordaCinza">
                    <h4 className="mb-3">Dados da Empresa</h4>

                    <div className="row col-12 g-3">
                        <div className="col-md-6">
                            <label htmlFor="razaoSocial" className="form-label">
                                Razão Social <span className="text-body-secondary">*</span>
                            </label>
                            <input type="text" className="form-control" id="razaoSocial" placeholder="Razão Social" required />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="nomeFantasia" className="form-label">
                                Nome Fantasia <span className="text-body-secondary">*</span>
                            </label>
                            <input type="text" className="form-control" id="nomeFantasia" placeholder="Nome Fantasia" required />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="cnpj" className="form-label">
                                CNPJ <span className="text-body-secondary">*</span>
                            </label>
                            <input type="text" className="form-control" id="cnpj" placeholder="00.000.000/0000-00" required />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="telefone" className="form-label">Telefone Comercial</label>
                            <input type="tel" className="form-control" id="telefone" placeholder="(00) 0000-0000" />
                        </div>
                    </div>
                </div>

                {/* ===== Endereço ===== */}
                <div className="col-12 col-lg-10 p-4 rounded fundoCinza border bordaCinza">
                    <h4 className="mb-3">Endereço</h4>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="cep" className="form-label">
                                CEP <span className="text-body-secondary">*</span>
                            </label>
                            <input type="text" className="form-control" id="cep" placeholder="00000-000" required />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="pais" className="form-label">País</label>
                            <input type="text" className="form-control" id="pais" placeholder="País" readOnly />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="estado" className="form-label">Estado</label>
                            <input type="text" className="form-control" id="estado" placeholder="Estado" readOnly />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="cidade" className="form-label">Cidade</label>
                            <input type="text" className="form-control" id="cidade" placeholder="Cidade" readOnly />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="bairro" className="form-label">Bairro</label>
                            <input type="text" className="form-control" id="bairro" placeholder="Bairro" readOnly />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="rua" className="form-label">Rua</label>
                            <input type="text" className="form-control" id="rua" placeholder="Rua" readOnly />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="numero" className="form-label">Número</label>
                            <input type="text" className="form-control" id="numero" placeholder="Número" readOnly />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="complemento" className="form-label">Complemento</label>
                            <input type="text" className="form-control" id="complemento" placeholder="Complemento" readOnly />
                        </div>
                    </div>
                </div>

                {/* ===== Botão ===== */}
                <div className="col-12 col-lg-10 d-flex justify-content-end">
                    <button type="submit" className="btn btn-1">Registrar Empresa</button>
                </div>
            </form>
        </div>

    </>
}
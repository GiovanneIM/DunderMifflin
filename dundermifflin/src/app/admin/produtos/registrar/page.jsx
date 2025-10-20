import '../produtos.css'

export default function RegistrarEmpresa() {
    return <>
        <div className="container corpo py-4">
            <h2 className="titulo fs-2 text-center mb-4">Registrar produto</h2>

            <form className="d-flex flex-column align-items-center gap-4">

                {/* ===== Dados da Empresa ===== */}
                <div className="col-12 col-lg-10 p-4 rounded fundoCinza border bordaCinza">
                    <h4 className="mb-3">Dados do Produto</h4>

                    <div className="row col-12 g-3">
                        <div className="col-md-6">
                            <label htmlFor="razaoSocial" className="form-label">Nome <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="Nome" placeholder="Nome" required />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="preco" className="form-label">Preço <span className="text-body-secondary">*</span></label>                            

                            <div className="input-group">
                                <span className="input-group-text">R$</span>{" "}
                                <input type="text" className="form-control" id="preco" placeholder="0,00" required/>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="marca" className="form-label">Marca <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="marca" placeholder="Marca" required />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="marca" className="form-label">Categoria 1 <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="marca" placeholder="Marca" required />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="marca" className="form-label">Categoria 2 <span className="text-body-secondary">*</span></label>
                            <input type="text" className="form-control" id="marca" placeholder="Marca" required />
                        </div>
                    </div>

                    <h4 className="mb-3 mt-4">Imagens</h4>

                    <div className="row col-12 g-3 p-2">
                        <div className="adicionarImagem col-12">
                            <button className="botaoAdicionar btn col-12">
                                <div>Adicionar imagem</div>
                                <div>+</div>
                            </button>
                            <div className="imgDiv">
                                <button className="imgExcluir btn">-</button>
                                <div className='imgLink'>http:dsadsaddassssssssssssssssssssssssssssssssssssssss</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== Botão ===== */}
                <div className="col-12 col-lg-10 d-flex justify-content-end">
                    <button type="submit" className="btn btn-1">Registrar Produto</button>
                </div>
            </form>
        </div>
    </>
}
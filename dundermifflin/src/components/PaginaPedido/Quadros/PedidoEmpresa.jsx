export default function PedidoEmpresa({ empresa, lista }) {
    return <>
        <div className="col-12 col-md-10 col-lg-8 p-4 bg-white rounded-3 bordaCompleta bordaCinza shadow-sm">
            <h4 className="fw-bold pretoDM border-bottom pb-2 mb-3">
                <i className="bi bi-building me-2"></i> Empresa
            </h4>

            {/* Nomes da empresa */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <strong>Razão social</strong>
                    <div>{empresa?.razaoSocial || "Carregando..."}</div>
                </div>
                <div className="col-md-6">
                    <strong>Nome fantasia</strong>
                    <div>{empresa?.nomeFantasia || "Carregando..."}</div>
                </div>
            </div>

            {/* CNPJ e Telefone */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <strong>CNPJ</strong>
                    <div>{empresa?.cnpj || "Carregando..."}</div>
                </div>
                <div className="col-md-6">
                    <strong>Telefone</strong>
                    <div>{empresa?.telefone || "-"}</div>
                </div>
            </div>

            {/* Comentário */}
            <div>
                <strong>Comentário</strong>
                <textarea className="form-control bg-light mb-3" value={lista?.mensagem.mensagemEmpresa || ""} readOnly />
            </div>
        </div>
    </>
}
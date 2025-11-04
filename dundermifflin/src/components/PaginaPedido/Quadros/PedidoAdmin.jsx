export default function PedidoAdmin({ admin, lista }) {
    return <>
        <div className="col-12 col-md-10 col-lg-8 p-4 bg-white rounded-3 bordaCompleta bordaCinza shadow-sm">
            <h4 className="fw-bold pretoDM border-bottom pb-2 mb-3">
                <i className="bi bi-person-check me-2"></i> Dunder Mifflin
            </h4>
            <div className="row mb-3">
                <div className="col-md-6">
                    <strong>Lista analisada por</strong>
                    <div>{admin?.nomeCompleto || "-"}</div>
                </div>
            </div>
            <div>
                <strong>Comentário</strong>
                <textarea className="form-control bg-light mb-3" value={lista?.mensagem.mensagemAdmin || ""} readOnly />
            </div>
        </div>
    </>
}
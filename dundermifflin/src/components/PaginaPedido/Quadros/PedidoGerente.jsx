export default function PedidoGerente({ gerente, lista }) {
    return <>
        <div className="col-12 col-md-10 col-lg-8 p-4 bg-white rounded-3 bordaCompleta bordaCinza shadow-sm">
            <h4 className="fw-bold pretoDM border-bottom pb-2 mb-3">
                <i className="bi bi-person-badge me-2"></i> Gerente
            </h4>

            {/* Nome */}
            <div className="row mb-3">
                <div className="col-12">
                    <strong>Nome</strong>
                    <div>{gerente?.nomeCompleto || "Carregando..."}</div>
                </div>

            </div>

            {/* Telefone e E-mail */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <strong>Telefone</strong>
                    <div>{gerente?.telefone || "-"}</div>
                </div>
                <div className="col-md-6">
                    <strong>E-mail</strong>
                    <div>{gerente?.email || "-"}</div>
                </div>
            </div>

            {/* Comentário */}
            <div>
                <strong>Comentário</strong>
                <textarea className="form-control bg-light mb-3" value={lista?.mensagem.mensagemGerente || ""} readOnly />
            </div>
        </div>
    </>
}
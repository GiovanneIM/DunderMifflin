export default function Cancelado({ lista }) {
    return <>
        <div className="col-12 col-md-10 col-lg-8 p-4 bg-white rounded-3 bordaCompleta bordaCinza shadow-sm">
            {/* Cancelamento */}
            <div className="mb-2 badge bg-danger fs-6 d-flex justify-content-center"><strong>PEDIDO CANCELADO</strong></div>

            <div className="row mb-3 row-gap-2">
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <strong>Data</strong>
                    <div>{lista.cancelamento.data || "-"}</div>
                </div>

                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <strong>Cancelado por</strong>
                    <div>{lista.cancelamento.responsavel || "-"}</div>
                </div>

                <div>
                    <strong>Comentário cancelamento</strong>
                    <textarea className="form-control bg-light mb-3" value={lista.cancelamento.mensagemCancelamento} readOnly />
                </div>
            </div>
        </div>
    </>
}
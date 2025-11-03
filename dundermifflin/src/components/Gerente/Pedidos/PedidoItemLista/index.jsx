export default function PedidoItemLista({ pedido }) {
    const status = {
        Aprovado: "bg-success",
        Pendente: "bg-warning text-dark",
        Cancelado: "bg-danger",
        Enviado: "bg-info text-dark",
        Entregue: "bg-primary",
    }[pedido.status] || "bg-secondary";

    return <>
        <div className="border-bottom mt-3 pb-3 px-3">
            <div className="gap-3">

                {/* Informações principais */}
                <div className="col-12 d-flex gap-2 flex-column">
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                        <h6 className="fw-bold mb-0">Pedido #{pedido.id}</h6>
                        <span className={`badge ${status}`}>{pedido.status}</span>
                    </div>

                    <div className="d-flex flex-wrap small text-secondary">
                        <div className="col-12 col-sm-6 col-lg-4">
                            <strong>Pedido:</strong> {pedido?.datas.pedido || "-"}
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4">
                            <strong>Aprovação:</strong> {pedido?.datas.aprovacao || "-"}
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4">
                            <strong>Envio:</strong> {pedido?.datas.envio || "-"}
                        </div>
                    </div>

                    {pedido.status === "recebido" &&
                        <div className="d-flex flex-wrap small text-success">
                            <div className="col-12">
                                <strong>Recebimento:</strong> {pedido?.datas.recebimento || "-"}
                            </div>
                        </div>
                    }

                    {pedido.status === "cancelado" &&
                        <div className="d-flex flex-wrap small text-danger">
                            <div className="col-12">
                                <strong>Cancelamento:</strong> {pedido?.cancelamento?.data || "-"}
                            </div>
                        </div>
                    }
                </div>

                {/* Botão */}
                <div className="col-12 text-end">
                    <a className="btn btn-1 btn-sm" href={`/gerente/pedidos/${pedido.id}`}>
                        Ver Lista
                    </a>
                </div>
            </div>
        </div>
    </>
}
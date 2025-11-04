import StatusBadge from "@/components/StatusBadge";

export default function PedidoItemLista({ pedido }) {

    return <>
        <div className="border-bottom mt-3 pb-3 px-3">
            <div className="gap-3">

                {/* Informações principais */}
                <div className="col-12 d-flex gap-2 flex-column">
                    {/* ID e status */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                        {/* ID */}
                        <h6 className="fw-bold mb-0">Pedido #{pedido.id}</h6>
                        {/* Status */}
                        <StatusBadge status={pedido.status}/>
                    </div>

                    {/* Datas */}
                    <div className="d-flex flex-wrap small text-secondary">
                        <div className="col-12 col-sm-6 col-lg-4">
                            <strong>Pedido:</strong> {pedido?.datas?.pedido || "-"}
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4">
                            <strong>Aprovação:</strong> {pedido?.datas?.aprovacao || "-"}
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4">
                            <strong>Envio:</strong> {pedido?.datas?.envio || "-"}
                        </div>
                    </div>

                    {/* Pedido recebido */}
                    {pedido.status === "Recebido" &&
                        <div className="d-flex flex-wrap small text-success">
                            <div className="col-12">
                                <strong>Recebimento:</strong> {pedido?.datas.recebido || "-"}
                            </div>
                        </div>
                    }

                    {/* Pedido cancelado */}
                    {pedido.status === "Cancelado" &&
                        <div className="d-flex flex-wrap small text-danger">
                            <div className="col-12">
                                <strong>Cancelamento:</strong> {pedido?.cancelamento?.data || "-"}
                            </div>
                        </div>
                    }
                </div>

                {/* Botão para a página da lista*/}
                <div className="col-12 text-end">
                    <a className="btn btn-1 btn-sm" href={`/gerente/pedidos/${pedido.id}`}>
                        Ver Lista
                    </a>
                </div>
            </div>
        </div>
    </>
}
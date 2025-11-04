import StatusBadge from "@/components/StatusBadge";

export default function QuadroPedido({ lista }) {

    /* Função para formatar o preço */
    const formatarPreco = (valor) => valor?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) || "-";
    
    return <>
        <div className="col-12 col-md-10 col-lg-8 p-4 bg-white rounded-3 bordaCompleta bordaCinza shadow-sm">
            <h4 className="fw-bold pretoDM border-bottom pb-2 mb-3 d-flex justify-content-between">
                <div><i className="bi bi-bag-check me-2"></i> Pedido</div>

                <StatusBadge status={lista?.status} />
            </h4>

            {/* Datas */}
            <div className="row mb-4 row-gap-2">
                <div><strong>DATAS</strong></div>
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <strong>Pedido</strong>
                    <div>{lista?.datas.pedido || "-"}</div>
                </div>

                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <strong>Aprovação</strong>
                    <div>{lista?.datas.aprovacao || "-"}</div>
                </div>

                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <strong>Envio</strong>
                    <div>{lista?.datas.envio || "-"}</div>
                </div>

                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <strong>Recebimento</strong>
                    <div>{lista?.datas.recebimento || "-"}</div>
                </div>
            </div>

            {/* Cancelamento */}
            {lista?.cancelamento && <>
                <div className="mb-2"><strong>CANCELAMENTO</strong></div>
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
            </>
            }

            {/* Itens do pedido */}
            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Preço Unitário</th>
                            <th>Preço Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista?.produtos.map((p) => (
                            <tr key={p.id}>
                                <td>{p.nome}</td>
                                <td>{p.qtd}</td>
                                <td>R$ {p.preco.toFixed(2).replace('.', ',')}</td>
                                <td>R$ {(p.qtd * p.preco).toFixed(2).replace('.', ',')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <hr className="mt-3" />

            {/* Total */}
            <div className="text-end fw-bold">
                Total de itens: {lista?.total.unidades} <br />
                Total preço: {formatarPreco(lista?.total.preco)}
            </div>
        </div>
    </>
}
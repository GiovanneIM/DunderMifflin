'use client'

import StatusBadge from "@/components/StatusBadge";
import { useState, useEffect } from "react"

export default function ListasEmpresa({ empresa }) {
    const [listas, setListas] = useState(null)

    // Função para buscar dados na API
    async function carregarDados(url, setState) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            const chave = Object.keys(data).find(k => k !== 'sucesso' && k !== 'mensagem');
            if (data[chave]) setState(data[chave]);
        } catch (error) {
            console.error(`Erro ao buscar ${url}:`, error);
        }
    }

    /* Buscando as listas da empresa*/
    useEffect(() => {
        if (!isNaN(empresa.id)) {
            carregarDados(`http://localhost:4000/empresas/${empresa.id}/listas`, setListas);
        }
    }, [empresa]);


    return <>
        <div className="col-12  p-3 bordaCompleta bordaCinza rounded d-flex flex-wrap">
            <div className="col-12 d-flex flex-wrap align-items-center border-bottom mb-3 pb-2 px-3 row-gap-2">
                <h4 className="col-12 col-sm-4 m-0">
                    <strong>Pedidos</strong>
                </h4>
            </div>
            <div className='col-12 p-3 bordaCompleta bordaCinza rounded d-flex flex-wrap'>
                {
                    listas?.length > 0 ? (
                        listas.map(l => (
                            <div key={l.id} className="col-12 d-flex flex-column gap-2 border-bottom px-3 py-2">
                                <div className="d-flex justify-content-between">
                                    <StatusBadge status={l.status} />

                                    <div><strong>Local de entrega:</strong> {l.entrega}</div>
                                </div>

                                <div className="col-12 d-flex flex-wrap flex-wrap gap-3">
                                    <div><strong>ID gerente:</strong> {l.idGerente}</div>
                                    <div><strong>ID Empresa:</strong> {l.idEmpresa}</div>
                                    <div><strong>ID Admin:</strong> {l.idAdmin}</div>
                                </div>

                                {/* Datas */}
                                <div className="d-flex flex-wrap justify-content-between small text-secondary">
                                    <div>
                                        <strong>Pedido:</strong> {l?.datas?.pedido || "-"}
                                    </div>
                                    <div>
                                        <strong>Aprovação:</strong> {l?.datas?.aprovacao || "-"}
                                    </div>
                                    <div>
                                        <strong>Envio:</strong> {l?.datas?.envio || "-"}
                                    </div>
                                    <div>
                                        <strong>Entrega:</strong> {l?.datas?.entregue || "-"}
                                    </div>
                                    <div>
                                        <strong>Recebimento:</strong> {l?.datas?.recebido || "-"}
                                    </div>
                                </div>

                                {/* Pedido recebido */}
                                {l.status === "Recebido" &&
                                    <div className="d-flex flex-wrap small text-success">
                                        <div className="col-12">
                                            <strong>Recebimento:</strong> {l?.datas.recebido || "-"}
                                        </div>
                                    </div>
                                }

                                {/* Pedido cancelado */}
                                {l.status === "Cancelado" &&
                                    <div className="d-flex flex-wrap small text-danger">
                                        <div className="col-12">
                                            <strong>Cancelamento:</strong> {l?.cancelamento?.data || "-"}
                                        </div>
                                    </div>
                                }
                            </div>
                        ))
                    ) : (
                        <div className="text-muted">Nenhum pedido encontrado.</div>
                    )
                }
            </div>
        </div>
    </>
}
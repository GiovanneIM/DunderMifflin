'use client'

import { useEffect, useState } from "react"

import './pedidos.css'
import PedidoItemLista from "@/components/Gerente/Pedidos/PedidoItemLista"

export default function Pedidos() {
    const [usuario, setUsuario] = useState({})

    const [listas, setListas] = useState(null)

    // Obtendo o usuario
    useEffect(() => {
        setUsuario(JSON.parse(localStorage.getItem('usuario')))
    }, [])

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

    /* Buscando as listas do gerente*/
    useEffect(() => {
        if (!isNaN(usuario.id)) {
            carregarDados(`http://localhost:4000/gerentes/${usuario.id}/listas`, setListas);
        }
    }, [usuario]);


    return <>
        <div className="container">
            <div className="text-center titulo fs-2">Meus pedidos</div>

            <div className="d-flex flex-column justify-content-center align-items-center gap-3">

                <div className="col-12 col-lg-8 p-4 bg-white rounded-3 bordaCompleta bordaCinza shadow-sm">
                    <h4 className="fw-bold pretoDM border-bottom pb-2 mb-3">
                        <i className="bi bi-three-dots me-2"></i> Em andamento
                    </h4>

                    <div className="container_pedidos d-flex flex-column-reverse justify-content-end rounded bordaCompleta bordaCinza">
                        {listas
                            ?.filter(l => l.status !== "Concluída" && l.status !== "Cancelada")
                            .map(l => <PedidoItemLista key={l.id} pedido={l} />)
                        }
                    </div>
                </div>

                <div className="col-12 col-lg-8 p-4 bg-white rounded-3 bordaCompleta bordaCinza shadow-sm">
                    <h4 className="fw-bold pretoDM border-bottom pb-2 mb-3">
                        <i className="bi bi-check-lg me-2"></i> Concluídas
                    </h4>

                    <div className="container_pedidos d-flex flex-column-reverse justify-content-end  rounded bordaCompleta bordaCinza">
                        {listas
                            ?.filter(l => l.status === "Concluída")
                            .map(l => <PedidoItemLista key={l.id} pedido={l} />)
                        }
                    </div>
                </div>

                <div className="col-12 col-lg-8 p-4 bg-white rounded-3 bordaCompleta bordaCinza shadow-sm">
                    <h4 className="fw-bold pretoDM border-bottom pb-2 mb-3">
                        <i className="bi bi-x-lg me-2"></i> Canceladas
                    </h4>

                    <div className="container_pedidos d-flex flex-column-reverse justify-content-end  rounded bordaCompleta bordaCinza">
                        {listas
                            ?.filter(l => l.status === "Cancelado" || l.status === "Cancelada")
                            .map(l => <PedidoItemLista key={l.id} pedido={l} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
}
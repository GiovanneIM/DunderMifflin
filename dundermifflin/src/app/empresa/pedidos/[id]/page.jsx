'use client'

import Cancelado from "@/components/PaginaPedido/Quadros/Cancelado";
/*
    Página para que a empresa veja as informações de uma lista.
        • Exibir as informações da lista
        • Cancelar caso o status da lista seja "Aguardando aprovação"
        • Confirmar recebimento caso o status da lista seja "Entregue"
*/

import QuadroPedido from "@/components/PaginaPedido/Quadros/Pedido";
import PedidoAdmin from "@/components/PaginaPedido/Quadros/PedidoAdmin";
import PedidoEmpresa from "@/components/PaginaPedido/Quadros/PedidoEmpresa";
import PedidoGerente from "@/components/PaginaPedido/Quadros/PedidoGerente";

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Pedido() {
    const { id } = useParams();

    const [lista, setLista] = useState(null)
    const [gerente, setGerente] = useState(null)
    const [empresa, setEmpresa] = useState(null)
    const [admin, setAdmin] = useState(null)


    const [mensagemEmpresa, setMsgEmpresa] = useState("")
    const [mensagemCancelamento, setCancelamento] = useState("")


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

    /* Buscando lista */
    useEffect(() => {
        if (!isNaN(id)) {
            carregarDados(`http://localhost:4000/listas/${id}`, setLista);
        }
    }, [id]);

    /* Buscando gerente, empresa e admin */
    useEffect(() => {
        if (lista) {
            if (!isNaN(lista.idGerente)) {
                carregarDados(`http://localhost:4000/gerentes/${lista.idGerente}`, setGerente);
            }

            if (!isNaN(lista.idEmpresa)) {
                carregarDados(`http://localhost:4000/empresas/${lista.idEmpresa}`, setEmpresa);
            }

            if (!isNaN(lista.idAdmin)) {
                carregarDados(`http://localhost:4000/admin/${lista.idAdmin}`, setAdmin);
            }
        }
    }, [lista]);

    /* Função para abrir o modal de atualização dos dados*/
    function abrirModalCancelar() {
        const modal = new bootstrap.Modal(document.getElementById('modalCancelarPedido'));
        modal.show();
    }

    /* Função para cancelar o pedido */
    function CancelarPedido() {
        const cancelar = {
            mensagemCancelamento,
            tipoUsuario: "Empresa"
        }

        fetch(`http://localhost:4000/listas/cancelar/${lista.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cancelar)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.sucesso) {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('modalCancelarPedido'));
                    modal.hide();

                    setLista(data.lista)
                }
                else {
                    console.log(data.erro);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    /* Função para confirmar que o pedido foi recebido */
    function AprovarPedido() {
        fetch(`http://localhost:4000/empresas/aprovar/${lista.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({mensagemEmpresa})
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.sucesso) {

                    setLista(data.lista)
                }
                else {
                    console.log(data.erro);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }




    return <>
        {/* PEDIDO */}
        <div className="container">
            <div className="text-center titulo fs-2">Pedido #{id}</div>

            <div className="container d-flex flex-column align-items-center vstack gap-4">
                {/* Gerente */}
                <PedidoGerente gerente={gerente} lista={lista} />

                {/* Empresa */}
                <PedidoEmpresa empresa={empresa} lista={lista} />

                {/* Dunder Mifflin */}
                <PedidoAdmin admin={admin} lista={lista} />

                {/* Pedido */}
                <QuadroPedido lista={lista} />

                {/* Caso a lista tenha sido cancelada */}
                {lista?.status === "Cancelado" && <Cancelado lista={lista} />}


                {/* Botões cancelar ou aprovar pedido */}
                {
                    lista?.status === "Aguardando aprovação" && <>
                        <div className="col-12 col-md-10 col-lg-8 p-4 bg-white rounded-3 bordaCompleta bordaCinza shadow-sm">
                            <div><strong>Mensagem de aprovação</strong></div>
                            <textarea
                                placeholder="Adicione uma mensagem de aprovação (Opcional)"
                                className="form-control mb-3"
                                value={mensagemEmpresa}
                                onChange={(e) => setMsgEmpresa(e.target.value)} />

                            <div className="d-flex justify-content-end gap-3">
                                <button className="btn btn-danger" onClick={abrirModalCancelar}>Cancelar pedido</button>
                                <button className="btn btn-1" onClick={AprovarPedido}>Aprovar pedido</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>



        {/* MODAL para cancelar o pedido */}
        <div className="modal fade" id='modalCancelarPedido' tabIndex="-1" aria-labelledby='modalCancelarPedidoLabel' aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    {/* CABEÇALHO */}
                    <div className="modal-header fundoPreto">
                        <h5 className="modal-title" id='modalCancelarPedidoLabel'>Cancelar pedido</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>

                    {/* CORPO */}
                    <div className="modal-body">
                        {/* Comentário de cancelamento */}
                        <div><strong>Comentário de cancelamento</strong></div>
                        <textarea className="form-control mb-3" value={mensagemCancelamento} onChange={(e) => setCancelamento(e.target.value)} />
                    </div>

                    {/* BOTÕES */}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={CancelarPedido}>Cancelar</button>
                        <button type="button" className="btn btn-1" data-bs-dismiss="modal" >Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
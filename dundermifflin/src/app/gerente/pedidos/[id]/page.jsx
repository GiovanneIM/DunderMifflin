'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Pedido() {
    const { id } = useParams();
    const [lista, setLista] = useState(null)
    const [gerente, setGerente] = useState(null)
    const [empresa, setEmpresa] = useState(null)
    const [admin, setAdmin] = useState(null)


    const [comentarioCancelamento, setCancelamento] = useState("")

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

    /* Buscando gerente e empresa */
    useEffect(() => {
        if (lista) {
            if (!isNaN(lista.idGerente)) {
                carregarDados(`http://localhost:4000/gerentes/${lista.idGerente}`, setGerente);
            }

            if (!isNaN(lista.idEmpresa)) {
                carregarDados(`http://localhost:4000/empresas/${lista.idEmpresa}`, setEmpresa);
            }

            if (!isNaN(lista.idAdmin)) {
                carregarDados(`http://localhost:4000/admin/${lista.idAdmin}`, setEmpresa);
            }
        }
    }, [lista]);

    /* Função para formatar o preço */
    const formatarPreco = (valor) => valor?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) || "-";

    /* Função para abrir o modal de atualização dos dados*/
    function abrirModalCancelar() {
        const modal = new bootstrap.Modal(document.getElementById('modalCancelarPedido'));
        modal.show();
    }

    function CancelarPedido(params) {

    }

    return <>
        {/* PEDIDO */}
        <div className="container">
            <div className="text-center titulo fs-2">Pedido #{id}</div>

            <div className="container d-flex flex-column align-items-center vstack gap-4">
                {/* Gerente */}
                <div className="col-12 col-md-10 col-md-8 p-4 bg-white rounded-3 bordaCompleta bordaCinza shadow-sm">
                    <h4 className="fw-bold pretoDM border-bottom pb-2 mb-3">
                        <i className="bi bi-person-badge me-2"></i> Gerente
                    </h4>
                    <div className="row mb-3">
                        <div className="col-12">
                            <strong>Nome</strong>
                            <div>{gerente?.nomeCompleto || "Carregando..."}</div>
                        </div>

                    </div>
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
                    <div>
                        <strong>Comentário</strong>
                        <textarea className="form-control bg-light mb-3" value={lista?.mensagem.mensagemGerente || ""} readOnly />
                    </div>
                </div>

                {/* Empresa */}
                <div className="col-12 col-md-10 col-md-8 p-4 bg-white rounded-3 bordaCompleta bordaCinza shadow-sm">
                    <h4 className="fw-bold pretoDM border-bottom pb-2 mb-3">
                        <i className="bi bi-building me-2"></i> Empresa
                    </h4>
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
                    <div>
                        <strong>Comentário</strong>
                        <textarea className="form-control bg-light mb-3" value={lista?.mensagem.mensagemEmpresa || ""} readOnly />
                    </div>
                </div>

                {/* Dunder Mifflin */}
                <div className="col-12 col-md-10 col-md-8 p-4 bg-white rounded-3 bordaCompleta bordaCinza shadow-sm">
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
                        <textarea className="form-control bg-light mb-3" value={empresa?.mensagem?.mensagemAdmin || ""} readOnly />
                    </div>
                </div>

                {/* Pedido */}
                <div className="col-12 col-md-10 col-md-8 p-4 bg-white rounded-3 bordaCompleta bordaCinza shadow-sm">
                    <h4 className="fw-bold pretoDM border-bottom pb-2 mb-3">
                        <i className="bi bi-bag-check me-2"></i> Pedidos
                    </h4>

                    {/* Status */}
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <strong>STATUS</strong>
                            <div>{lista?.status || "-"}</div>
                        </div>
                    </div>

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
                                <textarea className="form-control bg-light mb-3" value={admin?.cancelamento.mensagem} readOnly />
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

                {/* Botões */}
                <div className="col-12 col-md-10 col-md-8 p-4 bg-white rounded-3 bordaCompleta bordaCinza shadow-sm d-flex justify-content-end">
                    <button className="btn btn-danger" onClick={abrirModalCancelar}>Cancelar pedido</button>
                </div>
            </div>
        </div>



        {/* MODAL para abrir atualizar os dados */}
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
                        <textarea className="form-control mb-3" value={comentarioCancelamento} onChange={(e) => setCancelamento(e.target.value)} />
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
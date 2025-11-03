'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Produto() {
    const { id } = useParams();
    const [lista, setLista] = useState(null)
    const [gerente, setGerente] = useState(null)
    const [empresa, setEmpresa] = useState(null)

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
        }
    }, [lista]);

    return <>
        <div className="container">
            <div className="text-center titulo fs-2">Pedido  {id}</div>
            <div className="col-12 p-3 rounded fundoBranco bordaCompleta ">
                <div className="titulo fs-4 ">Gerente</div>
                <div className="border-top border-bottom p-3">
                    <div className="info-linha">{gerente?.nomeCompleto || "Carregando..."}</div>
                </div>

                <div className="titulo fs-4">Empresa</div>
                <div className="border-top border-bottom p-3">
                    <div className="info-linha">{empresa?.nome || "Carregando..."}</div>
                </div>

                <div className="titulo fs-4">Dunder Mifflin</div>
                <div className="border-top border-bottom p-3"></div>

                <div className="titulo fs-4">Itens pedidos</div>
                <div className="border-top border-bottom p-3">
                    {lista ? (
                        <>
                            {lista.produtos.map((p) => (
                                <div key={p.id} className="d-flex flex-wrap align-items-center border-top py-2 px-3 row-gap-2">
                                        <div className="col-12"><strong>{p.nome}</strong></div>
                                        <div className="col-12 col-sm-6 col-lg-4">Quantidade: {p.qtd}</div>
                                        <div className="col-12 col-sm-6 col-lg-4">Preço Unit: R$ {p.preco.toFixed(2).replace('.', ',')}</div>
                                        <div className="col-12 col-sm-6 col-lg-4">Preço total: R$ {(p.qtd * p.preco).toFixed(2).replace('.', ',')}</div>
                                </div>
                            ))}

                            <div className="d-flex flex-wrap align-items-center bordaCompleta border-bottom-0 border-end-0 border-start-0 bordaPreta p-2 px-3 justify-content-between">
                                <div className="col-12 col-md-6"><strong>Total de itens: {lista.total.unidades}</strong></div>
                                <div className="col-12 col-md-6"><strong>Total preço: R$ {lista.total.preco.toFixed(2).replace('.', ',')}</strong></div>
                            </div>
                        </>
                    ) : (
                        "Carregando lista..."
                    )}
                </div>
            </div>
        </div>
    </>
}
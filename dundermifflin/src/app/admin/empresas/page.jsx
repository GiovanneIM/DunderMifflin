'use client'

/*
    Página para exibição das empresas clientes para o admin
        • Exibir as empresas
        • Acessar a página específica de uma empresa
        • Filtrar empresas específicas (Por ID, razão social ou nome fantasia)
        • Registrar nova empresa
*/

import { useEffect, useState } from "react";
import CardEmpAdmin from "@/components/Cards/CardEmpAdmin";

export default function Empresas() {
    const [empresas, setEmpresas] = useState([]);
    const [filtroTipo, setFiltroTipo] = useState("RazaoSocial");
    const [filtroTexto, setFiltroTexto] = useState("");
    const [empresasFiltradas, setEmpresasFiltradas] = useState([]);

    // Recebendo as empresas
    useEffect(() => {
        async function buscarEmpresas() {
            try {
                const res = await fetch("http://localhost:4000/empresas");
                const data = await res.json();

                setEmpresas(data);
                setEmpresasFiltradas(data);
            } catch (error) {
                console.error("Erro ao carregar empresas:", error);
            }
        };

        buscarEmpresas();
    }, []);

    // Função para filtrar as empresas
    const filtrarEmpresas = () => {
        // Se o campo para digitar estiver vazio
        if (!filtroTexto.trim()) {
            setEmpresasFiltradas(empresas);
            return;
        }

        const texto = filtroTexto.toLowerCase();

        const filtradas = empresas.filter((empresa) => {
            // Filtrando pela razão social
            if (filtroTipo === "RazaoSocial") return empresa.razaoSocial.toLowerCase().includes(texto);

            // Filtrando pelo nome fantasia
            if (filtroTipo === "NomeFantasia") return empresa.nomeFantasia.toLowerCase().includes(texto);

            // Filtrando pelo ID
            if (filtroTipo === "ID") return String(empresa.id) === texto;

            // Filtrando pelo CNPJ
            if (filtroTipo === "CNPJ") return empresa.cnpj.replace(/\D/g, '').includes(texto);

            // Filtrando pelo nome fantasia
            if (filtroTipo === "Estado") return empresa.estado.toLowerCase().includes(texto);

            // Filtrando pelo nome fantasia
            if (filtroTipo === "Cidade") return empresa.cidade.toLowerCase().includes(texto);
        });



        setEmpresasFiltradas(filtradas);
    };

    return <>
        <div className="container corpo py-4">
            <h2 className="titulo fs-2 text-center mb-4">Empresas Clientes</h2>

            {/* Div de opções */}
            <div className="p-4 rounded shadow-sm fundoBranco bordaCompleta bordaCinza mb-3">
                <h5 className="fw-bold mb-3">Procurar empresa</h5>

                {/* Filtro */}
                <div className="d-flex flex-wrap align-items-end mb-4 col-12">
                    <div className="flex-grow-1 pe-2">
                        <label htmlFor="infoFiltro" className="form-label small fw-semibold text-secondary">Filtrar por</label>
                        <div className="input-group d-block d-sm-flex">
                            {/* Categoria de busca */}
                            <div className="mb-2 mb-sm-0 pe-sm-2" style={{ minWidth: '200px' }}>
                                <select className="form-select" id="infoFiltro" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} >
                                    <option value="RazaoSocial">Razão Social</option>
                                    <option value="NomeFantasia">Nome Fantasia</option>
                                    <option value="ID">ID</option>
                                    <option value="CNPJ">CNPJ</option>
                                    <option value="CNPJ">CNPJ</option>
                                    <option value="Estado">Estado</option>
                                    <option value="Cidade">Cidade</option>
                                </select>
                            </div>

                            {/* Campo de busca */}
                            <div className="flex-grow-1 ps-sm-2">
                                <input type="text" className="form-control" id="filtro" placeholder="Digite para buscar..." value={filtroTexto} onChange={(e) => setFiltroTexto(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Botão de busca */}
                    <div className="d-flex pt-3 ps-0 ps-sm-2 ps-sm-0">
                        <button className="btn btn-1 px-4" onClick={filtrarEmpresas}>
                            <i className="bi bi-search"></i> Buscar
                        </button>
                    </div>
                </div>

                <hr className="my-3 text-muted opacity-25" />

                {/* Registrar Empresa */}
                <div className="text-end">
                    <a className="btn btn-1 px-4 py-2" href="/admin/empresas/registrar">
                        <i className="bi bi-plus-circle me-2"></i>
                        Registrar Empresa
                    </a>
                </div>
            </div>



            <div className="d-flex flex-wrap p-3 row-gap-3 rounded shadow fundoBranco bordaCompleta bordaCinza justify-content-start gap-3">
                {empresasFiltradas.length > 0 ?
                    (
                        empresasFiltradas.map((empresa, index) => (
                            <CardEmpAdmin empresa={empresa} key={index}/>
                        ))
                    ) :
                    (
                        <div className="col-12 text-center fs-5 text-secondary">Nenhuma empresa encontrada</div>
                    )
                }
            </div>
        </div>
    </>
}
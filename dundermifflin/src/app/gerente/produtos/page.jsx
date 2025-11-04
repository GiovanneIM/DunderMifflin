'use client'

import { useEffect, useState } from "react";

import Card from "@/components/Cards/Card";

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [filtroTipo, setFiltroTipo] = useState("Nome");
    const [filtroTexto, setFiltroTexto] = useState("");
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);


    // Recebendo os produtos
    useEffect(() => {
        async function buscarProdutos() {
            try {
                const res = await fetch("http://localhost:4000/produtos");
                const data = await res.json();

                setProdutos(data);
                setProdutosFiltrados(data);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            }
        };

        buscarProdutos();
    }, []);

    // Função para filtrar os produtos
    const filtrarProdutos = () => {
        // Se o campo para digitar estiver vazio
        if (!filtroTexto.trim()) {
            setProdutosFiltrados(produtos);
            return;
        }

        const texto = filtroTexto.toLowerCase();

        const filtrados = produtos.filter((produto) => {
            // Filtrando pelo nome
            if (filtroTipo === "Nome") return produto.nome.toLowerCase().includes(texto);

            // Filtrando pelo ID
            if (filtroTipo === "ID") return String(produto.id) === texto;

            // Filtrando pela marca
            if (filtroTipo === "Marca") return produto.marca.toLowerCase().includes(texto);

            // Filtrando pela categoria
            if (filtroTipo === "Categoria") return produto.categoria[0].toLowerCase().includes(texto) || produto.categoria[1].toLowerCase().includes(texto);
        });



        setProdutosFiltrados(filtrados);
    };


    return <>
        <div className="container gap-4 d-flex flex-column justify-content-center">
            <div className="titulo">Produtos</div>

            {/* filtro */}
            <div className="p-4 rounded shadow-sm fundoBranco bordaCompleta bordaCinza mb-3">
                <h5 className="fw-bold mb-3">Procurar produto</h5>

                {/* Filtro */}
                <div className="d-flex flex-wrap align-items-end mb-4 col-12">
                    <div className="flex-grow-1 pe-2">
                        <label htmlFor="infoFiltro" className="form-label small fw-semibold text-secondary">Filtrar por</label>
                        <div className="input-group d-block d-sm-flex">
                            {/* Categoria de busca */}
                            <div className="mb-2 mb-sm-0 pe-sm-2" style={{ minWidth: '200px' }}>
                                <select className="form-select" id="infoFiltro" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} >
                                    <option value="Nome">Nome</option>
                                    <option value="ID">ID</option>
                                    <option value="Marca">Marca</option>
                                    <option value="Categoria">Categoria</option>
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
                        <button className="btn btn-1 px-4" onClick={filtrarProdutos}>
                            <i className="bi bi-search"></i> Buscar
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-12 d-flex flex-wrap justify-content-evenly row-gap-3">
                {
                    produtosFiltrados.length > 0 ?
                        (
                            produtosFiltrados.map((produto) => (
                                <Card
                                    key={produto.id}
                                    id={produto.id}
                                    nome={produto.nome}
                                    imagem={produto.imagem[0]}
                                    preco={produto.preco}
                                />
                            ))
                        ) :
                        (
                            <div className="col-12 text-center fs-5 text-secondary">Nenhum produto encontrado</div>
                        )
                }
            </div>
        </div >
    </>
}
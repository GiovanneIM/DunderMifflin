"use client"

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Empresa() {
    const { id } = useParams();   // Obtendo o ID do produto
    const [empresa, setEmpresa] = useState(null);

    // Recebendo o produto
    useEffect(() => {
        async function carregarEmpresa() {
            try {
                const res = await fetch(`http://localhost:4000/empresa/${id}`);
                const data = await res.json();
                if (data.empresa) setEmpresa(data.empresa);
            } catch (error) {
                console.error("Erro ao buscar empresa:", error);
            }
        }

        if (id) carregarEmpresa();
    }, [id]);

    if (!empresa) return <p className="text-center mt-5">Carregando...</p>;

    return (
        <div className="container corpo py-4">
            <h2 className="titulo fs-2 text-center mb-4">
                Empresa {empresa.id}
            </h2>

            <div className="col-12 col-lg-10 mx-auto p-4 rounded fundoCinza border bordaCinza">
                <h4 className="mb-3">Dados da Empresa</h4>

                <div className="row g-3">
                    <div className="col-md-6">
                        <strong>Razão Social:</strong> {empresa.razaoSocial}
                    </div>
                    <div className="col-md-6">
                        <strong>Nome Fantasia:</strong> {empresa.nomeFantasia}
                    </div>
                    <div className="col-md-6">
                        <strong>CNPJ:</strong> {empresa.cnpj}
                    </div>
                    <div className="col-md-6">
                        <strong>Telefone:</strong> {empresa.telefone}
                    </div>
                </div>
            </div>
        </div>
    );
}
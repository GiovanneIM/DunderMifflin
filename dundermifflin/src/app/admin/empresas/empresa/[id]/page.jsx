"use client"

/*
    Página para exbir as informações de uma empresa
        • Exbir as informações
        • Opção para atualizar as informações
        • Exbir os funcionários da empresa
        • Exibir as filiais da empresa
*/

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'


import Logo from '@/components/Empresa/Perfil/Logo';
import InformacoesEmpresa from '@/components/Empresa/Perfil/InformacoesEmpresa';
import EnderecosLista from '@/components/Empresa/Perfil/EnderecosLista';
import GerentesLista from '@/components/Empresa/Perfil/GerentesLista';
import ListasEmpresa from '@/components/Empresa/Perfil/PedidosEmpresa';

export default function Empresa() {
    const { id } = useParams();   // Obtendo o ID do produto
    const [empresa, setEmpresa] = useState();
    // const [endereco, setEndereco] = useState([]);

    /* Buscando a empresa */
    useEffect(() => {
        async function carregarEmpresa() {
            try {
                const res = await fetch(`http://localhost:4000/empresas/${id}`);
                const data = await res.json();
                if (data.empresa) setEmpresa(data.empresa);
            } catch (error) {
                console.error("Erro ao buscar empresa:", error);
            }
        }

        if (id) carregarEmpresa();
    }, [id]);

    if (empresa) return (
        <div className="container corpo py-4">
            <h2 className="titulo fs-2 text-center mb-4">
                Empresa {empresa.id}
            </h2>

            <div className="p-4 rounded shadow-sm fundoBranco bordaCompleta bordaCinza mb-3 row-gap-4 d-flex flex-column flex-lg-row flex-wrap justify-content-center align-items-center">
                {/* Logo da empresa */}
                <Logo logo={empresa.logo} idEmpresa={id} />

                {/* Quadro com as informações da empresa */}
                <InformacoesEmpresa empresa={empresa} />

                {/* Endereços da empresa */}
                <EnderecosLista empresa={empresa} />
                
                {/* Gerentes da empresa */}
                <GerentesLista empresa={empresa} />

                {/* Listas da empresa */}
                <ListasEmpresa empresa={empresa}/>
            </div>
        </div>
    );
}
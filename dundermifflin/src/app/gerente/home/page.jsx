"use client"

/*
    Página Home para exbir as informações de um gerente
        • Exbir as informações do funcionário
        • Exbir as informações da empresa
        • listas do gerente

*/

import { useState, useEffect } from 'react'

import InformacoesGerente from '@/components/Gerente/InformacoesGerente';
import InformacoesEmpresa from '@/components/Gerente/informacoesEmpresa';

export default function Home() {
    const [usuario, setUsuario] = useState(null);
    const [empresa, setEmpresa] = useState(null);
    const [gerente, setGerente] = useState(null);


    /* Pegando as infos do usuario logado */
    useEffect(() => {
        const dados = localStorage.getItem('usuario');
        if (dados) {
            setUsuario(JSON.parse(dados));
        }
    }, []);

    /* Buscando o Gerente */
    useEffect(() => {
        async function carregarGerente() {
            try {
                const res = await fetch(`http://localhost:4000/gerentes/${usuario.id}`);
                const data = await res.json();
                if (data.gerente) setGerente(data.gerente);
            } catch (error) {
                console.error("Erro ao buscar gerente:", error);
            }
        }

        if (usuario && !isNaN(usuario.id)) {
            carregarGerente();
        }
    }, [usuario])

    /* Buscando a empresa */
    useEffect(() => {
        async function carregarEmpresa() {
            try {
                const res = await fetch(`http://localhost:4000/empresas/${gerente.idEmpresa}`);
                const data = await res.json();
                if (data.empresa) setEmpresa(data.empresa);
            } catch (error) {
                console.error("Erro ao buscar empresa:", error);
            }
        }

        if (gerente && !isNaN(gerente.idEmpresa)) {
            carregarEmpresa();
        }
    }, [gerente])



    return <>
        {gerente && empresa &&
            <div className='container py-5'>
                <h2 className="titulo fs-2 text-center mb-4">
                    Gerente {gerente.id}
                </h2>

                <div className="p-4 rounded shadow-sm fundoBranco bordaCompleta bordaCinza mb-3 row-gap-4 
            d-flex flex-column flex-lg-row flex-wrap justify-content-center align-items-center">

                    <div className='col-12 d-flex flex-column justify-content-around row-gap-3'>
                        {/* Informações da empresa */}
                        <div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-2">
                            <h4 className=""><strong>Suas informações</strong></h4>
                        </div>

                        <InformacoesGerente gerente={gerente} />
                    </div>

                    <div className='col-12 d-flex flex-column justify-content-around row-gap-3'>
                        {/* Informações da empresa */}
                        <div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-2">
                            <h4 className=""><strong>Sua empresa</strong></h4>
                        </div>

                        <InformacoesEmpresa empresa={empresa} />
                    </div>
                </div>
            </div>
        }
    </>
}
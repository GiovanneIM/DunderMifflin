"use client"

/*
    Página Home para exbir as informações de um gerente
        • Exbir as informações do funcionário
        • Exbir as informações da empresa
        • listas do gerente

*/

import { useState, useEffect } from 'react'

export default function Home() {
    const [usuario, setUsuario] = useState(null);
    const [empresa, setEmpresa] = useState();
    const [gerente, setGerente] = useState();

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
                const res = await fetch(`http://localhost:4000/empresas/${usuario.id}`);
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



    return (gerente &&
        <>
            <div className='container py-5'>
                <div className="titulo">Gerente {gerente.id}</div>

                <div className='col-12 col-lg-6 ps-lg-2 d-flex flex-column justify-content-around row-gap-3'>
                    {/* Informações da empresa */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-2">
                        <h4 className=""><strong>Dados da empresa</strong></h4>
                        <button className="btn btn-1" onClick={abrirModalDados}>Alterar dados</button>
                    </div>
                </div>
            </div>
        </>
    )
}
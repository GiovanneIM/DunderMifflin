"use client"

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Gerente() {
    const { id } = useParams();   // Obtendo o ID do gerente
    const [gerente, setGerente] = useState(null);

    // Obtendo o gerente
    useEffect(() => {
        const idnum = Number(id)
        
        if (isNaN(idnum)) return

        async function buscarGerente() {
            try {
                const res = await fetch(`http://localhost:4000/gerente/${idnum}`)
                const data = await res.json()
                
                if (data.sucesso) {
                    setGerente(data.gerente)
                } else {
                    console.log(data.erro);
                }
            } catch (erro) {
                console.error('Erro ao carregar gerente:', erro)
            }
        }

        buscarGerente()
    }, [id])


    return <>
        { gerente && <div className="container corpo py-4">
            <h2 className="titulo fs-2 text-center mb-4">
                Gerente {gerente.id}
            </h2>

            <div className="col-12 col-lg-10 mx-auto p-4 rounded fundoCinza border bordaCinza">
                <h4 className="mb-3">Dados do Gerente</h4>

                <div className="row g-3">
                    <div className="col-md-6">
                        <strong>Nome Completo</strong> {gerente.nomeCompleto}
                    </div>
                    <div className="col-md-6">
                        <strong>Nome de Usuário:</strong> {gerente.nomeUsuario}
                    </div>
                    <div className="col-md-6">
                        <strong>Email:</strong> {gerente.email}
                    </div>
                    <div className="col-md-6">
                        <strong>Telefone:</strong> {gerente.telefone}
                    </div>
                    <div className="col-md-6">
                        <strong>ID da Filial:</strong> {gerente.idFilial}
                    </div>
                </div>
            </div>

            <div className="col-12 col-lg-10 mx-auto p-4 rounded fundoCinza border bordaCinza mt-3">
                <h4 className="mb-3">Listas do Gerente</h4>

                <div className="row g-3">
                    <div className="col-md-6">
                        <strong>Nome Completo</strong> {gerente.nomeCompleto}
                    </div>
                    <div className="col-md-6">
                        <strong>Nome de Usuário:</strong> {gerente.nomeUsuario}
                    </div>
                    <div className="col-md-6">
                        <strong>Email:</strong> {gerente.email}
                    </div>
                    <div className="col-md-6">
                        <strong>Telefone:</strong> {gerente.telefone}
                    </div>
                    <div className="col-md-6">
                        <strong>ID da Filial:</strong> {gerente.idFilial}
                    </div>
                </div>
            </div>
        </div>}
    </>;
}
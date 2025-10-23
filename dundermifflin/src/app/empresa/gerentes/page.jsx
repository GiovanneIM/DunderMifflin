'use client'

import { useState, useEffect } from 'react'

export default function Gerentes() {
    let id;

    const [idEmpresa, setIDEmpresa] = useState(null)
    const [gerentes, setGerentes] = useState(null)

    // Obtendo o ID da empresa do LocalStorage
    useEffect(() => {
        const empresaLogada = JSON.parse(localStorage.getItem('usuario'))
        setIDEmpresa(empresaLogada.id)
    }, [])

    // Obtendo os gerentes da empresa
    useEffect(() => {
        if (isNaN(idEmpresa) || idEmpresa === null) return

        async function buscarGerentes() {
            try {
                const res = await fetch(`http://localhost:4000/empresa/${idEmpresa}/gerentes`)
                const data = await res.json()

                if (data.sucesso) {
                    setGerentes(data.gerentes)
                } else {
                    console.log(data.erro);
                }
            } catch (erro) {
                console.error('Erro ao carregar gerentes:', erro)
            }
        }

        buscarGerentes()
    }, [idEmpresa])

    function novoGerente() {
        window.location.href = `/empresa/gerentes/registrar`
    }

    return <>
        <div className="container corpo py-4">
            <h2 className="titulo fs-2 text-center mb-4">Gerentes de compras</h2>

            <div className='d-flex flex-column p-3 gap-3 fundoBranco rounded border bordaCinza'>
                <div className='col-12 d-flex justify-content-end'><button className='btn btn-2' onClick={novoGerente}>Cadastrar novo gerente</button></div>

                {gerentes && gerentes.length > 0 ? (
                    gerentes.map((gerente) => (
                        <div
                            key={gerente.id}
                            className="col-12 d-md-flex rounded border bordaCinza overflow-hidden"
                        >
                            {/* ID */}
                            <div className="col-12 col-md-1 d-flex flex-md-column gap-2 justify-content-center align-items-center fundoPreto p-2 text-center">
                                <div>ID</div>
                                <div>{gerente.id}</div>
                            </div>

                            {/* Informações do gerente */}
                            <div className="col-12 col-md-9 d-flex flex-wrap fundoBranco p-2">
                                <div className="col-12 col-md-6 mb-2">
                                    <strong>Nome Completo:</strong>
                                    <div>{gerente.nomeCompleto || '-'}</div>
                                </div>
                                <div className="col-12 col-md-6 mb-2">
                                    <strong>Usuário:</strong>
                                    <div>{gerente.nomeUsuario || '-'}</div>
                                </div>
                                <div className="col-12 col-md-6 mb-2">
                                    <strong>E-mail:</strong>
                                    <div>{gerente.email || '-'}</div>
                                </div>
                                <div className="col-12 col-md-6 mb-2">
                                    <strong>Telefone:</strong>
                                    <div>{gerente.telefone || '-'}</div>
                                </div>
                                <div className="col-12 col-md-6 mb-2">
                                    <strong>ID da Filial:</strong>
                                    <div>{gerente.idFilial ?? '-'}</div>
                                </div>
                            </div>

                            {/* Botão */}
                            <div className="col-12 col-md-2 d-flex justify-content-center align-items-center fundoBranco border-top py-2 py-md-0 border-md-top-0 border-md-start bordaCinza">
                                <button className="btn btn-1" onClick={() => window.location.href = `/empresa/gerentes/gerente/${gerente.id}`}>
                                    Ver gerente
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 p-3 text-center text-muted">
                        Nenhum gerente cadastrado.
                    </div>
                )}

            </div>
        </div>
    </>
}


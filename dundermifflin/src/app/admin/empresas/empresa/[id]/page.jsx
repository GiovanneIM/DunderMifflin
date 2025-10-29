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
import ItemFilial from '@/components/Empresa/FilialItem';

import Logo from '@/components/Empresa/Logo';
import InformacoesEmpresa from '@/components/Empresa/InformacoesEmpresa';

export default function Empresa() {
    const { id } = useParams();   // Obtendo o ID do produto
    const [empresa, setEmpresa] = useState();
    const [endereco, setEndereco] = useState([]);

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
                <Logo logo={empresa.logo} idEmpresa={id}/>

                {/* Quadro com as informações da empresa */}
                <InformacoesEmpresa empresa={empresa}/>

                {/* Filiais da empresa */}
                <div className="col-12 p-0 col-lg-6 pe-lg-2 d-flex flex-wrap">
                    <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                        <div className="d-flex flex-wrap align-items-center border-bottom mb-3 pb-2">
                            <h5 className="col-12 col-sm-4 m-0"><strong>Filiais</strong></h5>
                            <button className="btn btn-1 ms-auto">Adicionar Filial</button>
                        </div>

                        <div className='col-12 bordaCompleta bordaCinza rounded d-flex flex-wrap' style={{ height: '250px', overflowY: 'scroll' }}>
                            {/* Listando as filiais */}
                            <div className='col-12 p-3'>
                                {
                                    empresa.filiais?.length ? (
                                        empresa.filiais.map(filial => (<ItemFilial key={filial.id} filial={filial} idEmpresa={id}/>))
                                    ) : (
                                        <div className="text-muted fst-italic">Nenhuma filial cadastrada</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gerentes da empresa */}
                <div className="col-12 p-0 col-lg-6 ps-lg-2 d-flex flex-wrap">
                    <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                        <div className="d-flex flex-wrap align-items-center border-bottom mb-3 pb-2">
                            <h5 className="col-12 col-sm-4 m-0"><strong>Gerentes</strong></h5>
                            <button className="btn btn-1 ms-auto">Adicionar gerente</button>
                        </div>

                        <div className='col-12 bordaCompleta bordaCinza rounded d-flex flex-wrap' style={{ height: '250px', overflowY: 'scroll' }}>
                            {/* Listando os gerentes */}
                            <div className='col-12 p-3'>
                                {
                                    empresa.filiais &&
                                    empresa.filiais.map((filial) => {
                                        return <ItemFilial key={filial.id} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Listas da empresa */}
                <div className="col-12  p-3 bordaCompleta bordaCinza rounded d-flex flex-wrap">
                    <div className='fs-4 mb-0 col-12'><strong>Listas</strong></div>
                    <div className='col-12 p-3 bordaCompleta bordaCinza rounded d-flex flex-wrap'></div>
                </div>
            </div>
        </div>
    );
}
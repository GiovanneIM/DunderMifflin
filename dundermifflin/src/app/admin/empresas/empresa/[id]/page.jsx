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
import ItemFilial from '@/components/FilialItem';

export default function Empresa() {
    const { id } = useParams();   // Obtendo o ID do produto
    // const [empresa, setEmpresa] = useState([]);
    const [empresa, setEmpresa] = useState({
        "razaoSocial": "teste teste teste",
        "nomeFantasia": "teste",
        "logo": "https://placehold.co/300x300?text=teste",
        "cnpj": "12.341.111/1111-11",
        "telefone": "(11) 11111-1111",
        "cep": "09110-140",
        "estado": "São Paulo",
        "cidade": "São Paulo",
        "filiais": [
            {
                "id": 0,
                "cep": "09110-140",
                "nome": "filial 1",
                "numero": "10",
                "complemento": "a"
            },
            {
                "id": 1,
                "cep": "09110-001",
                "nome": "filial 2",
                "numero": "11",
                "complemento": null
            }
        ],
        "numero": "111111",
        "complemento": "111111",
        "id": 0,
        "senha": "Empresa0"
    });
    const [endereco, setEndereco] = useState([]);

    /* Buscando a empresa */
    // useEffect(() => {
    //     async function carregarEmpresa() {
    //         try {
    //             const res = await fetch(`http://localhost:4000/empresas/${id}`);
    //             const data = await res.json();
    //             if (data.empresa) setEmpresa(data.empresa);
    //         } catch (error) {
    //             console.error("Erro ao buscar empresa:", error);
    //         }
    //     }

    //     if (id) carregarEmpresa();
    // }, [id]);

    /* Buscando o endereço pelo CEP */
    useEffect(() => {
        async function CEP() {
            const res = await fetch(`https://viacep.com.br/ws/${empresa.cep.replace('-', '')}/json`);
            const data = await res.json();
            setEndereco(data);
        }

        if (empresa.cep) CEP();
    }, [empresa.cep]);

    return (
        <div className="container corpo py-4">
            <h2 className="titulo fs-2 text-center mb-4">
                Empresa {empresa.id}
            </h2>

            <div className="p-4 rounded shadow-sm fundoBranco bordaCompleta bordaCinza mb-3 row-gap-4 d-flex flex-column flex-lg-row flex-wrap justify-content-center align-items-center">
                {/* Logo da empresa */}
                <div className='col-8 col-sm-4 col-lg-6 ratio-1x1 overflow-hidden pe-lg-2'><img src={empresa.logo} className='img-completa' /></div>

                {/* Quadro com as informações da empresa */}
                <div className="col-12 col-lg-6 ps-lg-2 d-flex flex-column justify-content-around row-gap-3">
                    <div className="col-12 d-flex flex-column overflow-auto gap-3 p-3 rounded fundoBranco bordaCompleta bordaCinza">

                        {/* Informações da empresa */}
                        <h4 className="col-12 m-0"><strong>Informações da empresa</strong></h4>

                        <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                            <div className="info-linha"><strong>Razão Social</strong> {empresa.razaoSocial}</div>
                            <div className="info-linha"><strong>Nome Fantasia</strong> {empresa.nomeFantasia}</div>
                            <div className="info-linha"><strong>CNPJ</strong> {empresa.cnpj}</div>
                            <div className="info-linha"><strong>Telefone</strong> {empresa.telefone}</div>
                        </div>
                        {/* Endereço da empresa*/}
                        <h4 className="col-12 m-0"><strong>Endereço</strong></h4>

                        <div className='col-12 p-3 rounded bordaCompleta bordaCinza'>
                            <div className="info-linha"><strong>CEP</strong> {empresa.cep}</div>
                            <div className="info-linha"><strong>Estado</strong> {endereco.uf}</div>
                            <div className="info-linha"><strong>Cidade</strong> {endereco.localidade}</div>
                            <div className="info-linha"><strong>Bairro</strong> {endereco.bairro}</div>
                            <div className="info-linha"><strong>Rua</strong> {endereco.logradouro}</div>
                            <div className="info-linha"><strong>Número e complemento</strong> {empresa.numero + ' - ' + empresa.complemento}</div>
                        </div>

                    </div>
                </div>

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
                                        empresa.filiais.map(filial => (<ItemFilial key={filial.id} nome={filial.nome} id={filial.id} cep={filial.cep} numero={filial.numero} complemento={filial.complemento}/>))
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
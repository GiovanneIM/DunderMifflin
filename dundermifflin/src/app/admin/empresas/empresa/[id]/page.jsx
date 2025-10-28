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

export default function Empresa() {
    const { id } = useParams();   // Obtendo o ID do produto
    const [empresa, setEmpresa] = useState([]);
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

    /* Buscando o endereço pelo CEP */
    useEffect(() => {
        async function CEP() {
            const res = await fetch(`https://viacep.com.br/ws/${empresa.cep.replace('-', '')}/json`);
            const data = await res.json();
            setEndereco(data);
            console.log(data);

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
                <div className='col-8 col-sm-4 col-lg-6 ratio-1x1 overflow-hidden pe-0 pe-lg-2'><img src={empresa.logo} className='img-completa' /></div>

                {/* Quadro com as informações da empresa */}
                <div className="col-12 col-lg-6 ps-0 ps-lg-2 d-flex flex-column justify-content-around row-gap-3">
                    <div className="d-flex flex-column gap-3 p-3 rounded  fundoBranco bordaCompleta bordaCinza">
                        {/* Informações da empresa */}
                        <div className='fs-4 mb-0 col-12'><strong>Informações da empresa</strong></div>
                        <div className="info-linha"><strong>Razão Social</strong> {empresa.razaoSocial}</div>
                        <div className="info-linha"><strong>Nome Fantasia</strong> {empresa.nomeFantasia}</div>
                        <div className="info-linha"><strong>CNPJ</strong> {empresa.cnpj}</div>
                        <div className="info-linha"><strong>Telefone</strong> {empresa.telefone}</div>

                        {/* Endereço da empresa*/}
                        <div className='fs-4 mb-0 col-12'><strong>Endereço</strong></div>
                        <div className="info-linha"><strong>CEP</strong> {empresa.cep}</div>
                        <div className="info-linha"><strong>Estado</strong> {endereco.uf}</div>
                        <div className="info-linha"><strong>Cidade</strong> {endereco.localidade}</div>
                        <div className="info-linha"><strong>Bairro</strong> {endereco.bairro}</div>
                        <div className="info-linha"><strong>Rua</strong> {endereco.logradouro}</div>
                        <div className="info-linha"><strong>Número e complemento</strong> {empresa.numero + ' - ' + empresa.complemento}</div>
                    </div>
                </div>

                {/* Filiais da empresa */}
                <div className="col-12 p-0 col-lg-6 pe-2   d-flex flex-wrap">
                    <div className='col-12 p-3 bordaCompleta bordaCinza rounded'>
                        <div className='fs-4 mb-0 col-12'><strong>Filiais</strong></div>
                        <div className='col-12 bordaCompleta bordaCinza rounded d-flex flex-wrap'>

                            {/* Listando as filiais */}
                            <div className='col-12 p-3'>
                                {empresa.filiais && empresa.filiais.map((filial) => {
                                    return <div key={filial.id}>
                                        {filial.nome}
                                        {filial.cep}
                                    </div>
                                })}
                            </div>
                            {/* Registrar filial */}
                            {/* <div className='bordaCompleta border-top-0 border-bottom-0 border-end-0 bordaCinza col-6 p-3'>
                            <div>
                                <label for="nome" class="form-label fw-medium">Nome <span class="text-body-secondary">*</span></label>
                                <input type="text" class="form-control" id="Nome" placeholder="Nome" required />
                            </div>
                            <div>
                                <label for="nome" class="form-label fw-medium">CEP <span class="text-body-secondary">*</span></label>
                                <input type="text" class="form-control" id="Nome" placeholder="Nome" required />
                            </div>
                            <div><button className='btn btn-1'>Adicionar Filial</button></div>
                        </div> */}
                        </div>
                    </div>
                </div>

                {/* Gerentes da empresa */}
                <div className="col-12 col-lg-6  p-3 bordaCompleta bordaCinza rounded d-flex flex-wrap">
                    <div className='fs-4 mb-0 col-12'><strong>Gerentes</strong></div>
                    <div className='col-12 p-3 bordaCompleta bordaCinza rounded d-flex flex-wrap'></div>
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
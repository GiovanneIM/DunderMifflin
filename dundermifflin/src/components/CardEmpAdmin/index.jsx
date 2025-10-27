'use client'

import { useState } from "react";
import './card.css'

export default function CardEmpAdmin({ empresa }) {

    return <>
        {/* CARD */}
        <div className='ca rounded fundoBranco shadow-sm border rounded'>
            {/* Titulo - ID */}
            <div className='ca-ID fundoPreto'>ID {empresa.id}</div>

            {/* Corpo */}
            <div className='col-12 p-3 d-flex flex-wrap justify-content-between row-gap-2'>
                <div className="ca-img col-7 ratio-1 border rounded p-1">
                    {/* <img src={empresa.logo} className='img-completa' /> */}
                    <img src='https://static.vecteezy.com/system/resources/previews/000/272/740/original/vector-colorful-circle-banner-template-horizontal-advertising-business-banner.jpg' className='img-completa' />
                </div>

                <div className="col-5 d-flex flex-column row-gap-2">
                    <div className='col-12 ps-2'>
                        <div className="fw-semibold">CEP:</div>
                        <div>{empresa.cep}</div>
                    </div>

                    <div className='col-12 ps-2'>
                        <div className="fw-semibold">Estado:</div>
                        <div>{empresa.estado}</div>
                    </div>

                    <div className='col-12 ps-2'>
                        <div className="fw-semibold">Cidade:</div>
                        <div>{empresa.cidade}</div>
                    </div>
                </div>

                <div className='col-12'>
                    <div className="fw-semibold">Razao Social:</div>
                    <div className='ca-nome'>{empresa.razaoSocial}</div>
                </div>

                <div className='col-12'>
                    <div className="fw-semibold">Nome Fantasia:</div>
                    <div className='ca-nome'>{empresa.nomeFantasia}</div>
                </div>

                <div className='col-12'>
                    <div className="fw-semibold">CNPJ:</div>
                    <div>{empresa.cnpj}</div>
                </div>
            </div>


            {/* Botoes */}
            <div className="ca-botoes col-12 d-flex gap-3 justify-content-center pb-3">
                <a href={`/admin/empresas/empresa/${empresa.id}`} className='btn btn-1'>Ver Empresa</a>
            </div>
        </div>
    </>
}
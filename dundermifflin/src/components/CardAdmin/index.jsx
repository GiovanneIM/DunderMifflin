"use client"

import { useState, useEffect } from "react";
import './card.css'

export default function CardAdmin ({ produto }) {



    return <>
        <div className="card" style={{ width: "15rem" }}>
            <div className="card-img">
                <img src={produto.imagem[0]} alt={produto.nome} />
            </div>

            <div className="card-corpo">
                <div className="card-nome">
                    {produto.nome}
                </div>

                <div className="card-preco">
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                </div>

                <div className='card-botoes'>
                    <a href={''} className="btn btn-1">
                        Atualizar Produto
                    </a>
                </div>
            </div>
        </div>
    </>
}
"use client"

import './card.css'

export default function CardMostruario ({nome, imagem, preco }) {

    return <>
        <div className="card" style={{ width: "15rem" }}>
            <div className="card-img">
                <img src={imagem} alt={nome} />
            </div>

            <div className="card-corpo">
                <div className="card-nome">{nome}</div>

                <div className="card-preco">
                    R$ {preco.toFixed(2).replace('.', ',')}
                </div>
            </div>
        </div>
    </>
}



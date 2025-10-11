"use client"

import { useState, useEffect } from "react"


import './card.css'

export default function Card({
    nome,
    imagem,
    preco
}) {
    const [contagem, setContagem] = useState(1);

    useEffect(() => {
        console.log(contagem);

        if (contagem < 1) {
            setContagem(1)
        }
    }, [contagem]);

    function adicionarCarrinho() {
        const toastEl = document.getElementById("liveToast");
        const toast = new window.bootstrap.Toast(toastEl);
        toast.show();
    }

    return <>
        <div className="card" style={{ width: "15rem" }}>
            <div className="card-img">
                <img src={imagem} alt={nome} />
            </div>

            <div className="card-corpo">
                <div className="card-nome">
                    {nome}
                </div>

                <div className="card-preco">
                    R$ {preco.toFixed(2).replace('.', ',')}
                </div>

                <div className='card-botoes'>
                    <a href="/prod?={id}" className="btn btn-1">
                        Ver Produto
                    </a>

                    <div className='d-flex'>
                        <div className="div_contador">
                            <button className='btn-contador' onClick={() => { setContagem(contagem - 1) }}>-</button>
                            <div className='contador'>{contagem}</div>
                            <button className='btn-contador' onClick={() => { setContagem(contagem + 1) }}>+</button>
                        </div>
                        <button className='btn-2 botao_carrinho' onClick={() => { adicionarCarrinho() }} type="button" id="liveToastBtn">
                            <svg
                                className="bi bi-bag d-block mx-auto mb-1"
                                width={'1.3rem'}
                                height={'1.3rem'}
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div
                id="liveToast"
                className="toast"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div className="toast-header">
                    <strong className="me-auto">Produto adicionado ao carrinho</strong>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    />
                </div>
                <div className="toast-body">
                    <img src={imagem} alt={nome} className="toast-img"/>
                    <div>
                        <div>{nome}</div>
                        <div>Quantidade: {contagem}</div>
                    </div>
                </div>
            </div>
        </div>

    </>
}
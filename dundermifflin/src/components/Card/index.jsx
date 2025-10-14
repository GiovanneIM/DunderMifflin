"use client"

import { useState, useEffect } from "react";
import './card.css'

export default function Card({ id, nome, imagem, preco }) {
    const [contagem, setContagem] = useState(1);
    const urlProduto = `/produtos/${id}`;

    /* Controlando o valor da contagem */
    useEffect(() => {
        console.log(contagem);

        if (contagem < 1) {
            setContagem(1)
        }
    }, [contagem]);

    /* Função para quando o usuário adiciona ao carrinho */
    function adicionarCarrinho() {
        const container = document.getElementById("toastContainer");

        if (!container) return;

        // Criando o toat
        const toast = document.createElement("div");
        toast.className = "toast align-items-center text-bg-light show mb-2";
        toast.role = "alert";
        toast.ariaLive = "assertive";
        toast.ariaAtomic = "true";
        toast.style.minWidth = "250px";

        toast.innerHTML = `
            <div class="toast-header">
                <strong class="me-auto">Produto adicionado</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body d-flex align-items-center gap-2">
                <img src="${imagem}" alt="${nome}" class="toast-img" style="width:40px;height:40px;object-fit:cover;border-radius:5px;" />
                <div>
                <div>${nome}</div>
                <div>Quantidade: ${contagem}</div>
                </div>
            </div>
        `;

        container.appendChild(toast);

        // Inicializa e exibe o toast
        const toastInstance = new window.bootstrap.Toast(toast, { delay: 2500 });
        toastInstance.show();

        // Remove o toast do DOM depois de sumir
        toast.addEventListener("hidden.bs.toast", () => {
            toast.remove();
        });

    }


    return <>
        <div className="card" style={{ width: "15rem" }}>
            <div className="card-img">
                <a href={urlProduto}>
                    <img src={imagem} alt={nome} />
                </a>
            </div>

            <div className="card-corpo">
                <div className="card-nome">
                    <a href={urlProduto}>
                        {nome}
                    </a>
                </div>

                <div className="card-preco">
                    R$ {preco.toFixed(2).replace('.', ',')}
                </div>

                <div className='card-botoes'>
                    <a href={urlProduto} className="btn btn-1">
                        Ver Produto
                    </a>

                    <div className='d-flex'>
                        <div className="div_contador">
                            <button className='btn-contador' onClick={() => { setContagem(contagem - 1) }}>-</button>
                            <div className='contador'>{contagem}</div>
                            <button className='btn-contador' onClick={() => { setContagem(contagem + 1) }}>+</button>
                        </div>
                        <button className='btn-2 botao_carrinho' onClick={() => { adicionarCarrinho() }} type="button">
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
    </>
}
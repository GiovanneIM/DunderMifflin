"use client"

import { useState } from "react";
import './card.css'

export default function Card({ id, nome, imagem, preco }) {
    const [contagem, setContagem] = useState(1);
    const urlProduto = `/gerente/produtos/${id}`;

    /* Função para quando o usuário adiciona ao carrinho */
    function adicionarCarrinho() {
        const lista = JSON.parse(localStorage.getItem('lista')) || [];

        const index = lista.findIndex(item => item.id === id);

        if (index !== -1) {
            lista[index].qtd += contagem;
        } else {
            lista.push({ id, qtd: contagem });
        }

        const container = document.getElementById("toastContainer");

        if (!container) return;

        // Criando um toat
        const toast = document.createElement("div");
        toast.className = "toast align-items-center text-bg-light show mb-2";
        toast.role = "alert";
        toast.ariaLive = "assertive";
        toast.ariaAtomic = "true";
        toast.style.minWidth = "250px";

        toast.innerHTML = `
            <div class="toast-header fundoPreto">
                <strong class="me-auto">Produto adicionado</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body d-flex align-items-center gap-2">
                <img src="${imagem}" alt="${nome}" class="toast-img" style="width:40px;height:40px;object-fit:cover;border-radius:5px;" />
                <div>
                <div><strong>${nome}</strong></div>
                <div>Quantidade: ${contagem}</div>
                </div>
            </div>
        `;

        container.appendChild(toast);
        localStorage.setItem('lista', JSON.stringify(lista));

        // Inicializa e exibe o toast
        const toastInstance = new window.bootstrap.Toast(toast, { delay: 2500 });
        toastInstance.show();

        // Remove o toast do DOM depois de sumir
        toast.addEventListener("hidden.bs.toast", () => {
            toast.remove();
        });

    }

    return <>
        {/* CARD */}
        <div className="card" style={{ width: "15rem" }}>

            {/* IMAGEM */}
            <div className="card-img">
                <a href={urlProduto}>
                    <img src={imagem} alt={nome} />
                </a>
            </div>

            {/* CORPO DO CARD */}
            <div className="card-corpo">
                {/* NOME DO PRODUTO */}
                <div className="card-nome">
                    <a href={urlProduto}>
                        {nome}
                    </a>
                </div>

                {/* PREÇO */}
                <div className="card-preco">
                    R$ {preco.toFixed(2).replace('.', ',')}
                </div>


                {/* BOTÕES */}
                <div className='card-botoes'>
                    {/* PÁGINA DO PRODUTO */}
                    <a href={urlProduto} className="btn btn-1">
                        Ver Produto
                    </a>

                    <div className='d-flex'>
                        {/* CONTAGEM */}
                        <div className="div_contador">
                            <button className='btn-contador btn' onClick={() => setContagem(prev => Math.max(prev - 1, 0))}>-</button>
                            <input type="number" className="form-control bordaCinza contador text-center" id="quantidadeAdd" value={contagem} min={0} onChange={(e) => setContagem(Number(e.target.value))} required />
                            <button className='btn-contador btn' onClick={() => setContagem(contagem + 1)}>+</button>
                        </div>

                        {/* ADICIONAR AO CARRINHO */}
                        <div>
                            <button className='btn-2 botao_carrinho' onClick={() => { adicionarCarrinho() }} type="button">
                                <svg className="bi bi-bag d-block mx-auto mb-1" width={'1.3rem'} height={'1.3rem'} aria-hidden="true" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
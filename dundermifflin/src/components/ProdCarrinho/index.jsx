"use client"

import { useEffect, useState } from "react";
import './prodCarrinho.css';

export default function ProdCarrinho({ id_prod, qtd }) {
    const [produto, setProduto] = useState(null);
    const [contagem, setContagem] = useState(qtd);

    useEffect(() => {
        async function carregarProduto() {
            try {
                const res = await fetch(`http://localhost:4000/produtos/${id_prod}`);
                const data = await res.json();
                setProduto(data.produto);
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
            }
        }

        console.log(id_prod);

        if (!isNaN(id_prod)) carregarProduto();
    }, [id_prod]);

    useEffect(() => {
        if (contagem < 1) {
            setContagem(1)
        }
    }, [contagem]);


    return <>
        {produto && (
            <div className='pc'>
                <div className='pc-imagem'><img src={produto.imagem?.[0]} /></div>

                <div>
                    <div className="pc-nome">{produto.nome}</div>
                    <div className="pc-legnda">{produto.marca}   {produto.id}</div>
                </div>

                <div className="pc-contador">
                    <div className='pc-btn-contador' onClick={() => { setContagem(contagem - 1) }}>-</div>
                    <div className='contador'>{contagem}</div>
                    <div className='pc-btn-contador' onClick={() => { setContagem(contagem + 1) }}>+</div>
                </div>

                <div className="pc-preco">{produto.preco}</div>

                <div className="pc-precoTotal"></div>
            </div>
        )}
    </>
}
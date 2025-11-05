"use client"
import { useEffect, useState } from "react";
import './prodCarrinho.css';

export default function ProdCarrinho({ id_prod, qtd, funcaoAlterar }) {
    const [produto, setProduto] = useState(null);
    const [contagem, setContagem] = useState(qtd);
    const [precoTotalProduto, setTP] = useState(0);

    useEffect(() => {
        async function carregarProduto() {
            try {
                const res = await fetch(`http://localhost:4000/produtos/${id_prod}`);
                const data = await res.json();
                setProduto(data.produto);
                funcaoAlterar(id_prod, contagem, data.produto.preco, data.produto.nome); // inicializa no carrinho
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
            }
        }
        if (!isNaN(id_prod)) carregarProduto();
    }, [id_prod]);

    useEffect(() => {
        if (produto) {
            if (contagem < 1) setContagem(1);
            const total = contagem * produto.preco;
            setTP(total.toFixed(2).replace('.', ','));
            funcaoAlterar(id_prod, contagem, produto.preco, produto.nome);
        }
    }, [contagem, produto]);

    return produto && (
        <div className='pc col-12'>
            <div className='col-12 col-sm-3 pc-imagem'>
                <img src={produto.imagem?.[0]} />
            </div>

            <div className="col-12 col-sm-9 d-flex flex-column justify-content-between p-3 gap-2">
                <div>
                    <div className="pc-nome">{produto.nome}</div>
                    <div className="pc-legenda">
                        <div>{produto.marca}</div>
                        <div>ID {produto.id}</div>
                    </div>
                </div>

                <div className="d-flex col-12 flex-wrap" style={{ rowGap: '0.5rem' }}>
                    <div className="col-12 col-sm-4">
                        <div><b>Quantidade</b></div>
                        <div className="pc-contador_div">
                            <div>
                                <button className='pc-btn-contador' onClick={() => setContagem(c => c - 1)}>-</button>
                                <div className='pc-contador'>{contagem}</div>
                                {/* <input type="number" className='pc-contador' value={contagem} onChange={(e) => setContagem(e.target.value)}/> */}
                                <button className='pc-btn-contador' onClick={() => setContagem(c => c + 1)}>+</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-sm-4">
                        <div><b>Preço unitário</b></div>
                        <div className="pc-preco">R$ {produto.preco.toFixed(2).replace('.', ',')}</div>
                    </div>

                    <div className="col-6 col-sm-4">
                        <div><b>Preço total</b></div>
                        <div className="pc-precoTotal">R$ {precoTotalProduto}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

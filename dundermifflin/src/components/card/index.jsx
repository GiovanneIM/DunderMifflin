import './card.css'

export default function Card({
    nome,
    imagem,
    preco
}) {
    return <>
        <a href='/page' className='link_card'>
            <div className="card" style={{ width: "15rem" }}>
                <div className="card-img">
                    <img src={imagem} alt="..." />
                </div>

                <div className="card-corpo">
                    <div className="card-nome">
                        {nome}
                    </div>

                    <div className="card-preco">
                        R$ {preco.toFixed(2).replace('.', ',')}
                    </div>

                    <div className='botoes d-flex gap-3'>
                        <a href="/prod?={id}" className="btn btn-1">
                            Ver Produto
                        </a>

                        <div className='btn-2 botao_carrinho'>
                            <svg
                                className="bi bi-bag d-block mx-auto mb-1"
                                width={24}
                                height={24}
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </>
}
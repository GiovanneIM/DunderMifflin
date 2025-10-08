export default function Card({
    nome,
    imagem,
    preco
}) {
    return <>
        <div className="card" style={{ width: "18rem" }}>
            <img src={imagem} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{nome}</h5>
                <p className="card-text">
                    {preco}
                </p>
                <a href="#" className="btn btn-primary">
                    Ver Produto
                </a>
            </div>
        </div>
    </>
}
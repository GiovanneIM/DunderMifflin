import Card from "@/components/Card";

export default async function Produtos() {
    const res = await fetch("http://localhost:4000/produtos");
    const produtos = await res.json();


    return <>
        <div className="container gap-4 d-flex flex-wrap justify-content-center">
            <div className="col-12 d-flex flex-shrink-0 p-3">
                <ul className="d-flex flex-wrap list-unstyled gap-3 ps-0 w-100">
                    <li className="mb-1 categoriaDiv">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 tituloCategoria" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                            A
                        </button>
                        <div className="collapse show" id="home-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>A</li>
                                <li>A</li>
                                <li>A</li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1 categoriaDiv">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 tituloCategoria" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="true">
                            B
                        </button>
                        <div className="collapse show" id="dashboard-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>B</li>
                                <li>B</li>
                                <li>B</li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1 categoriaDiv">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 tituloCategoria" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="true">
                            C
                        </button>
                        <div className="collapse show" id="orders-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>C</li>
                                <li>C</li>
                                <li>C</li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1 categoriaDiv">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 tituloCategoria" data-bs-toggle="collapse" data-bs-target="#test-collapse" aria-expanded="true">
                            D
                        </button>
                        <div className="collapse show" id="test-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>D</li>
                                <li>D</li>
                                <li>D</li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>

            {
                produtos && produtos.map((produto) => {
                    return <Card
                        key={produto.id}
                        id={produto.id}
                        nome={produto.nome}
                        imagem={produto.imagem[0]}
                        preco={produto.preco}
                    />
                })
            }
        </div>



        {/* Div para os toast */}
        {/* <div
            id="toastContainer"
            className="toast-container position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 1055 }}
        ></div> */}
    </>
}
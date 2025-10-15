import Card from "@/components/Card";

export default async function Home() {

    const res = await fetch("http://localhost:4000/produtos");
    const produtos = await res.json();


    return <>
        <div className="container gap-4 d-flex flex-wrap justify-content-center">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5" style={{borderBottom:'1px solid #212529'}}>
                
                <div className="col-10 col-sm-8 col-lg-6">
                    <img
                        src="/img/DUNDERpreto.svg"
                        className="d-block mx-lg-auto img-fluid"
                        alt="Bootstrap Themes"
                        width={350}
                        height={500}
                        loading="lazy"
                    />
                </div>
                <div className="col-lg-6">
                    <h2 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
                        Bem-Vindo(a) a <br/>Dunder Mifflin Inc, Paper Company.
                    </h2>

                    <p className="lead">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta aut error beatae reiciendis facilis qui obcaecati cupiditate iste soluta odio nihil a voluptas itaque pariatur consequatur doloribus, illum consequuntur ducimus.
                    </p>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        <button type="button" className="btn btn-1 btn-lg px-4 me-md-2">
                            Entrar
                        </button>
                        <button type="button" className="btn btn-2 btn-lg px-4">
                            Sobre nós
                        </button>
                    </div>
                </div>
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
    </>
}

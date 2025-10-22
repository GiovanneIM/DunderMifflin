import CardMostruario from "@/components/CardMostruario";

export default async function Home() {

    const res = await fetch("http://localhost:4000/produtos");
    const produtos = await res.json();


    return <>
        <div className="container gap-4 d-flex flex-column justify-content-center">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5" style={{ borderBottom: '1px solid #212529' }}>

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
                        Bem-Vindo(a) à <br />Dunder Mifflin Inc, Paper Company.
                    </h2>

                    <p className="lead">
                        Fornecemos soluções completas em papelaria e suprimentos corporativos, com foco em qualidade, agilidade e atendimento personalizado.
                        Nosso compromisso é simplificar o dia a dia da sua empresa, oferecendo produtos confiáveis e condições comerciais vantajosas.
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

            <div className="row align-items-center g-5 py-5" style={{ borderBottom: '1px solid #212529' }}>
                <div className=" col-12 text-center mb-0">
                    <h3 className="titulo fs-3">Alguns de nossos produtos</h3>
                    <p className="text-muted">Conheça alguns dos produtos mais procurados por nossos clientes corporativos.</p>
                </div>
                <div className="gap-4 d-flex flex-wrap justify-content-center">
                    {
                        produtos && produtos.slice(0, 5).map((produto, index) => {
                            return <CardMostruario
                                key={index}
                                nome={produto.nome}
                                imagem={produto.imagem[0]}
                                preco={produto.preco}
                            />
                        })
                    }
                </div>
            </div>

            <div className="row align-items-center g-5 py-5" style={{ borderBottom: '1px solid #212529' }}>
                <div className="col-12 text-center mb-0">
                    <h3 className="titulo fs-3">Benefícios para nossos clientes</h3>
                    <p className="text-muted">Parceiros Dunder Mifflin contam com vantagens exclusivas para suas compras corporativas.</p>
                </div>

                <div className="col-12 d-flex flex-wrap justify-content-center gap-4">
                    <div className="card shadow-sm p-3" style={{ width: '16rem' }}>
                        <div className="card-body text-center">
                            <i className="bi bi-percent fs-1"></i>
                            <h5 className="card-title mt-3">Descontos exclusivos</h5>
                            <p className="card-text">Oferecemos descontos especiais para nossos clientes.</p>
                        </div>
                    </div>

                    <div className="card shadow-sm p-3" style={{ width: '16rem' }}>
                        <div className="card-body text-center">
                            <i className="bi bi-display fs-1"></i>
                            <h5 className="card-title mt-3">Interface intuitiva</h5>
                            <p className="card-text">Contamos com um sistema simples, mas completo, para melhorar sua experiência.</p>
                        </div>
                    </div>

                    <div className="card shadow-sm p-3" style={{ width: '16rem' }}>
                        <div className="card-body text-center">
                            <i className="bi bi-person-gear fs-1"></i>
                            <h5 className="card-title mt-3">Gerentes de compra</h5>
                            <p className="card-text">Você poderá cadastrar seus gerentes e permitir que eles montem listas de compras.</p>
                        </div>
                    </div>

                    <div className="card shadow-sm p-3" style={{ width: '16rem' }}>
                        <div className="card-body text-center">
                            <i className="bi bi-list-check fs-1"></i>
                            <h5 className="card-title mt-3">Listas de compras</h5>
                            <p className="card-text">
                                Monte e salve listas de produtos frequentes para agilizar pedidos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row align-items-center g-5 py-5" style={{ borderBottom: '1px solid #212529' }}>
                <div className=" col-12 text-center titulo fs-3">Algumas de nossas empresas parceiras</div>
                <div className="gap-4 d-flex flex-wrap justify-content-center">
                    <div className="gap-5 d-flex flex-wrap justify-content-center align-items-center">
                        <img src="https://placehold.co/600x400" alt="Parceiro 1" width="160" height="auto" className="opacity-75" />
                        <img src="https://placehold.co/600x400" alt="Parceiro 2" width="160" height="auto" className="opacity-75" />
                        <img src="https://placehold.co/600x400" alt="Parceiro 3" width="160" height="auto" className="opacity-75" />
                        <img src="https://placehold.co/600x400" alt="Parceiro 3" width="160" height="auto" className="opacity-75" />
                    </div>
                </div>
            </div>
        </div>
    </>
}

/*
    Página inicial do site / Sobre Nós
        * Apresentação da empresa e seus serviços;
        * Opção de Login
*/

import CardMostruario from "@/components/CardMostruario";
import FormContato from "@/components/FormContato";


export default async function Home() {

    const res = await fetch("http://localhost:4000/produtos");
    const produtos = await res.json();

    return <>
        <div className="container gap-4 d-flex flex-column justify-content-center">
            {/* APRESENTAÇÃO */}
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
                </div>
            </div>

            {/* PRODUTOS */}
            <div className="row align-items-center g-5 py-5" style={{ borderBottom: '1px solid #212529' }}>
                <div className=" col-12 text-center mb-0">
                    <h3 className="titulo fs-3" style={{ letterSpacing: '1px' }}>Alguns de nossos produtos</h3>
                    <p className="text-muted">Confira alguns dos produtos mais procurados por nossos clientes.</p>
                </div>
                <div className="gap-4 d-flex flex-wrap justify-content-center">
                    {
                        produtos && produtos.slice(0, 5).map((produto) => {
                            return <CardMostruario
                                key={produto.id}
                                nome={produto.nome}
                                imagem={produto.imagem[0]}
                                preco={produto.preco}
                            />
                        })
                    }
                </div>
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <div>
                        <a href="/mostruario">
                            <button className="btn btn-1">Ver mais produtos</button>
                        </a>
                    </div>
                </div>
            </div>

            {/* BENEFÍCIOS */}
            <div className="row align-items-center g-5 py-5" style={{ borderBottom: '1px solid #212529' }}>
                <div className="col-12 text-center mb-0">
                    <h3 className="titulo fs-3" style={{ letterSpacing: '1px' }}>Benefícios para nossos clientes</h3>
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

            {/* EMPRESAS CLIENTES */}
            <div className="row align-items-center g-5 py-5" style={{ borderBottom: '1px solid #212529' }}>
                <div className="col-12 text-center titulo fs-3" style={{ letterSpacing: '1px' }} >Algumas de nossas empresas clientes</div>
                <div className="gap-4 d-flex flex-wrap justify-content-center">
                    <div className="gap-5 d-flex flex-wrap justify-content-center align-items-center">
                        <div className="card empresas-clientes shadow-sm p-3">
                            <img src="https://sitefiespstorage.blob.core.windows.net/uploads/2022/08/file-20220802140942-senai-logo-e1659449473382.jpg" alt="SENAI" className="img-completa" />
                        </div>
                        <div className="card empresas-clientes shadow-sm p-3">
                            <img src="https://tse4.mm.bing.net/th/id/OIP.JK5mdFOdg9zMmhz0_soHkwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="GM" className="img-completa" />
                        </div>
                        <div className="card empresas-clientes shadow-sm p-3">
                            <img src="https://logosmarcas.net/wp-content/uploads/2020/11/Santander-Logo.png" alt="Santander" className="img-completa" />
                        </div>
                        <div className="card empresas-clientes shadow-sm p-3">
                            <img src="https://www.pngplay.com/wp-content/uploads/9/Nestle-Logo-Transparent-Free-PNG.png" alt="Nestle" className="img-completa" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ENTRAR EM CONTATO */}
            <div className="row align-items-center g-5 py-5" style={{ borderBottom: '1px solid #212529' }}>
                <div className=" col-12 text-center mb-0">
                    <h3 className="titulo fs-3" style={{ letterSpacing: '1px' }}>Entre em contato</h3>
                    <p className="text-muted">Fale conosco e descubra como a Dunder Mifflin pode atender às necessidades da sua empresa.</p>
                </div>

                <FormContato />
            </div>

            {/* ENTRAR EM CONTATO */}
            <div className="row align-items-center g-5 py-5">
                <div className=" col-12 text-center mb-0">
                    <h3 className="titulo fs-3" style={{ letterSpacing: '1px' }}>Nossas redes sociais</h3>
                    <p className="text-muted">Nos siga em nossas redes sociais para não perder nossas ofertas e novidades.</p>
                </div>

                <ul className="list-unstyled d-flex align-items-center justify-content-center gap-3">
                    <li className="ms-3 redesSociais">
                        <a className="" href="/" aria-label="Facebook">
                            <svg className="bi" fill="currentcolor" width={80} height={80} aria-hidden="true" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                            </svg>
                        </a>
                    </li>
                    <li className="ms-3 redesSociais">
                        <a className="" href="/" aria-label="Instagram">
                            <svg className="bi" fill="currentcolor" width={80} height={80} aria-hidden="true" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                            </svg>
                        </a>
                    </li>
                    <li className="ms-3 redesSociais">
                        <a className="" href="/" aria-label="Linkedin">
                            <svg className="bi" fill="currentcolor" width={80} height={80} aria-hidden="true" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    </>
}

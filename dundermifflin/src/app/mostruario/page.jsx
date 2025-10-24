/*
    Página de mostruário
        - Exibir produtos como em uma vitrine (Não dar opção de compra)
        - Formulário para contato
*/

import CardMostruario from "@/components/CardMostruario";
import FormContato from "@/components/FormContato";

export default async function Produtos() {
    const res = await fetch("http://localhost:4000/produtos");
    const produtos = await res.json();


    return <>
        <div className="container gap-4 d-flex flex-wrap justify-content-center">
            {/* PRODUTOS */}
            <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                <div className="titulo fs-3">Nossos produtos</div>
                <p className="text-muted">Confira alguns dos produtos que ofertamos aos nossos clientes.</p>
            </div>

            {/* EXIBIÇÃO DOS PRODUTOS */}
            <div className="d-flex flex-wrap gap-4 justify-content-center align-items-center">
                {
                    produtos && produtos.map((produto) => {
                        return <CardMostruario
                            key={produto.id}
                            id={produto.id}
                            nome={produto.nome}
                            imagem={produto.imagem[0]}
                            preco={produto.preco}
                        />
                    })
                }
            </div>

            {/* ENTRAR EM CONTATO */}
            <div className="row align-items-center g-5 py-5" style={{ borderBottom: '1px solid #212529' }}>
                <div className=" col-12 text-center mb-0">
                    <h3 className="titulo fs-3" style={{ letterSpacing: '1px' }}>Gostou do que viu?</h3>
                    <p className="text-muted">Fale conosco e descubra como a Dunder Mifflin pode atender às necessidades da sua empresa.</p>
                </div>

                <FormContato />
            </div>
        </div>
    </>
}
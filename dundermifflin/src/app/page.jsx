import Card from "@/components/card";

export default async function Home() {

    const res = await fetch("http://localhost:4000/produtos");
    const produtos = await res.json();


    return <>
        <div className="container gap-4 d-flex flex-wrap justify-content-center">
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
        <div
            id="toastContainer"
            className="toast-container position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 1055 }}
        ></div>
    </>
}


import CardAdmin from "@/components/CardAdmin";

export default async function Produtos() {
    const res = await fetch("http://localhost:4000/produtos");
    const produtos = await res.json();

    return <>
        <div className="container corpo py-4">
            <h2 className="titulo fs-2 text-center mb-4">Produtos</h2>

            <div className="d-flex flex-wrap gap-3 justify-content-center">
                {produtos && produtos.map((produto, index) => {
                    return <CardAdmin produto={produto} key={index} />
                })}
            </div>
        </div>
    </>
}
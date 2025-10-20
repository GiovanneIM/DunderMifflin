import CardAdmin from "@/components/CardAdmin";

export default async function Produtos() {
    const res = await fetch("http://localhost:4000/produtos");
    const produtos = await res.json();

    return <>
        <div className="container corpo py-4">
            <h2 className="titulo fs-2 text-center mb-4">Registrar produto</h2>

            {produtos && produtos.map((produto, index) => {
                return <CardAdmin produto={produto} key={index}/>
            })}
        </div>
    </>
}
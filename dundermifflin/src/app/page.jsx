import Image from "next/image";
import styles from "./page.module.css";

import Card from "@/components/card";

export default async function Home() {

    const res = await fetch("http://localhost:4000/produtos");
    const produtos = await res.json();
    // console.log(produtos);


    return <>
        <div className="d-flex flex-wrap justify-content-between">
            {
                produtos && produtos.map((produto) => {
                    return <Card
                        key={produto.id}
                        nome={produto.nome}
                        imagem={produto.imagem[0]}
                        preco={produto.preco}
                    />
                })
            }
        </div>
    </>
}

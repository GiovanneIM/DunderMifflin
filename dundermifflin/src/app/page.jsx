"use client"

import { useState, useEffect } from "react"


import Image from "next/image";
import styles from "./page.module.css";


import Card from "@/components/card";

export default function Home() {
    // const [produtos, setProdutos] = useState(null);

    // useEffect(() => {
    //     fetch("https://refactored-rotary-phone-v4xvrxp6gjwfxgqw-4000.app.github.dev/produtos")
    //         // .then(response => response.json())
    //         // .then(data => setProdutos(data))
    // }, [])

    // return <>
    //     {produtos && produtos.map((produto) => {
    //         return <UserCard
    //             key={produtos.id}
    //             nome={produtos.nome}
    //             imagem={produtos.imagem[0]}
    //             preco={produtos.preco}
    //         />
    //     })
    //     }
    // </>
}

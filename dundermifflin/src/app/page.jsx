"use client"

import { useState, useEffect } from "react"


import Image from "next/image";
import styles from "./page.module.css";


import Card from "@/components/card";

export default function Home() {
    const [produtos, setProdutos] = useState(null);

    useEffect(() => {
        fetch("https://localhost:4000/produtos")
            // .then(response => response.json())
            .then(response => setProdutos(response.data))
    }, [])

    return <>
        {produtos && produtos.map((produto) => {
            return <UserCard
                key={produtos.id}
                nome={produtos.nome}
                imagem={produtos.imagem[0]}
                preco={produtos.preco}
            />
        })
        }
    </>
}

'use client'

import './navbar.css'

import { useEffect, useState } from 'react';

import NavGerente from "../Navs/NavGerente";
import NavEmpresa from "../Navs/NavEmpresa";
import NavAdmin from "../Navs/NavAdmin";

export default function Navbar() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem('usuario');
        if (usuarioSalvo) setUsuario(JSON.parse(usuarioSalvo));

        // setUsuario({id:0, tipo:'admin', nome:'Teste'})
        // setUsuario({id:0, tipo:'empresa', nome:'Teste'})
        // setUsuario({id:0, tipo:'gerente', nome:'Teste'})
    }, []);

    function logout() {
        localStorage.removeItem('usuario');
        setUsuario(null);
    }

    return <>
        <header id='header'>

            <div className="px-3 py-2 text-bg-dark border-bottom">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        {/* Logo */}
                        <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                            <img src="/img/DUNDERbranco.svg" alt="Logo Dunder Mifflin" height="80" />
                        </a>

                        {/* Opções de navegação */}
                        {usuario && (
                            <>
                                {usuario.tipo === 'gerente' && <NavGerente />}
                                {usuario.tipo === 'empresa' && <NavEmpresa />}
                                {usuario.tipo === 'admin' && <NavAdmin />}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-3 py-2 border-bottom mb-3 bordaCinza">
                <div className="container d-flex flex-wrap justify-content-center">
                    {/* Procurar */}
                    <form className="col-12 col-lg-8 mb-2 mb-lg-0 me-lg-auto" role="procurar">
                        <input type="procurar" className="form-control bordaCinza" placeholder="Procurar..." aria-label="Procurar" />
                    </form>

                    {/* Botão de Login */}
                    {!usuario &&
                        <div className="text-end">
                            <a href={'/login'}>
                                <button type="button" className="btn btn-1">Entrar</button>
                            </a>
                        </div>
                    }

                    {/* Nome do usuário */}
                    {usuario &&
                        <div className="text-end d-flex align-items-center gap-3">
                            <b>{usuario.nome}</b>

                            <button type="button" className="btn btn-1" onClick={logout}>Sair</button>
                        </div>
                    }
                </div>
            </div>

        </header>
    </>
}
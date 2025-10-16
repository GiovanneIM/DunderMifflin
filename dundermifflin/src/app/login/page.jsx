'use client'

import './login.css'
import Image from 'next/image'
import { useState } from 'react';

export default function Login() {
    const [loginInfo, setLoginInfo] = useState({ id: '', senha: '' });
    const [usuario, setUsuario] = useState('gerente');

    async function fazerLogin(e) {
        e.preventDefault();

        const idNum = Number(loginInfo.id);
        const corpoReq = { ...loginInfo, id: idNum };

        console.log('Login enviado:', loginInfo);
        console.log('Tipo de Usuário:', usuario);

        const urlLogin = `http://localhost:4000/${usuario}/login`;
        fetch(urlLogin, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(corpoReq)
        })
        .then(async res => {
            const texto = await res.text();
            console.log("Status:", res.status);
            console.log("Resposta:", texto);
        })
    }

    function atualizarInfoLogin(e) {
        const { id, value } = e.target;
        setLoginInfo(prev => ({ ...prev, [id]: value }));
    }


    function atualizarUsuario(e) {
        setUsuario(e.target.value);
    }

    return <>

        <div className='corpo d-flex flex-wrap'>
            <div className='col-12 col-sm-6'>
                <a
                    href={'/'}
                >
                    <Image
                        src='/img/DUNDERbranco.svg'
                        alt='Logo Dunner Mifflin'
                        width={300}
                        height={200}
                    />
                </a>
            </div>

            <div className='div_branca col-12 col-sm-6'>
                <div>

                    <form className='form-signin' id='form-login' onSubmit={fazerLogin}>
                        <h1 className=" titulo h1 mb-3 fw-normal">fazer login</h1>

                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="id"
                                onChange={atualizarInfoLogin}
                                placeholder="name@example.com"
                            />
                            <label htmlFor="id">ID</label>
                        </div>

                        <div className="form-floating">

                            <input
                                type="password"
                                className="form-control"
                                id="senha"
                                onChange={atualizarInfoLogin}
                                placeholder="Password"
                            />
                            <label htmlFor="senha">Senha</label>
                        </div>

                        <div className="form-check text-start my-3 seletor col-12">
                            <div className='col-4'>
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="options-base"
                                    id="option5"
                                    autoComplete="off"
                                    value="gerente"
                                    onChange={atualizarUsuario}
                                    defaultChecked="on"
                                />
                                <label className="btn btn-esq" htmlFor="option5">Gerente</label>
                            </div>

                            <div className='col-4'>
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="options-base"
                                    id="option6"
                                    autoComplete="off"
                                    value="empresa"
                                    onChange={atualizarUsuario}
                                />
                                <label className="btn btn-dir" htmlFor="option6">Empresa</label>
                            </div>
                        </div>

                        <div className="form-check text-start my-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue="remember-me"
                                id="checkDefault"
                            />
                            <label className="form-check-label" htmlFor="checkDefault">
                                Lembre de mim
                            </label>
                        </div>

                        <button className="btn btn-1 w-100 py-2" type="submit" id='btn-login'>
                            Login
                        </button>

                        <div className='legenda'>
                            <p className="text-body-secondary">Ainda não possui uma conta?</p>
                            <a className="text-body-secondary" href='/cadastro'>Como ter uma conta</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}
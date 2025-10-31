'use client'

/*
    Página Login - Gerentes e empresas
        - Preencher informações para login (ID e senha)
        - Selecionar o tipo de usuário (Gerente ou Empresa)
*/

import './login.css'

import Image from 'next/image'

import { useState } from 'react';


export default function Login() {
    const [id, setID] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('gerente');
    const [erro, setErro] = useState('');
    const [usuario, setUsuario] = useState(null);

    /* Função para atualizar o ID */
    function atualizarID(e) {
        setID(e.target.value);
    }

    /* Função para atualizar a Senha */
    function atualizarSenha(e) {
        setSenha(e.target.value);
    }

    /* Função para atualizar o tipo do usuário */
    function atualizarUsuario(e) {
        setTipoUsuario(e.target.value);
    }

    /* Função para fazer a requisição à API e confirmar o login */
    async function fazerLogin(e) {
        e.preventDefault();
        setErro('');

        try {
            const infosLogin = { id: Number(id), senha };
            const urlLogin = `http://localhost:4000/${tipoUsuario}s/login`;

            const response = await fetch(urlLogin, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(infosLogin)
            });

            if (!response.ok) {
                // Erros HTTP (400, 401, 500...)
                const errorData = await response.json();
                setErro(errorData.mensagem || 'Erro no servidor.');
                return;
            }

            const data = await response.json();
            console.log('Resposta do servidor:', data);

            if (data.sucesso) {
                const userLogado = data.usuario;

                setUsuario(userLogado);
                localStorage.setItem('usuario', JSON.stringify(userLogado));

                // Redirecionamento rápido
                window.location.href = `/${tipoUsuario}/home`;
            } else {
                setErro(data.mensagem || 'ID ou senha incorretos.');
            }

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setErro('Falha de conexão com o servidor.');
        }
    }


    return <>
        {/* Corpo */}
        <div className='corpo d-flex flex-wrap'>
            {/* Logo */}
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

            {/* Login */}
            <div className='div_branca col-12 col-sm-6'>
                <div>
                    <form className='form-signin' id='form-login' onSubmit={fazerLogin}>
                        <h1 className=" titulo h1 mb-3 fw-normal">fazer login</h1>

                        {/* ID */}
                        <div className="form-floating">
                            <input type="text" className="form-control" id="id" onChange={atualizarID} required />
                            <label htmlFor="id">ID</label>
                        </div>

                        {/* Senha */}
                        <div className="form-floating">
                            <input type="password" className="form-control" id="senha" onChange={atualizarSenha} required />
                            <label htmlFor="senha">Senha</label>
                        </div>

                        {/* Tipo de usuário */}
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

                        {/* Lembre de mim - DECORATIVO*/}
                        <div className="form-check text-start my-3">
                            <input className="form-check-input" type="checkbox" defaultValue="remember-me" id="checkDefault" />
                            <label className="form-check-label" htmlFor="checkDefault">Lembre de mim</label>
                        </div>

                        {/* Botão Login */}
                        <button className="btn btn-1 w-100 py-2" type="submit" id='btn-login'>Login</button>

                        {/* Mensagem de erro */}
                        <div className='msgErro'>{erro && '- ' + erro}</div>

                        {/* Legendas */}
                        <div className='legenda'>
                            <div className="text-body-secondary">Não se lembra de sua senha?</div>
                            <a className="text-body-secondary" href='/cadastro'>Esqueci minha senha</a>
                        </div>
                        <div className='legenda'>
                            <div className="text-body-secondary">Não possui uma conta?</div>
                            <a className="text-body-secondary" href='/cadastro'>Como ter uma conta</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        {/* Toast - Mensagem de sucesso */}
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 2000 }}>
            {usuario && (
                <div className="toast show align-items-center text-bg-success border-0" role="alert">
                    <div className="d-flex">
                        <div className="toast-body" id='corpo-toast'>
                            <strong>Login efetuado com sucesso!</strong> <br />
                            Seja bem-vindo(a) <strong>{usuario.nome}</strong>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
}
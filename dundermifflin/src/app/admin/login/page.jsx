'use client'

/*
    Página Login - Administradores
        - Preencher informações para login (ID e senha)
        - Selecionar o tipo de usuário (Gerente ou Empresa)
*/

import './login.css'

import { useState } from 'react';

import Image from 'next/image'



export default function Login() {
    const [id, setID] = useState('');
    const [senha, setSenha] = useState('');
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

    /* Função para fazer a requisição à API e confirmar o login */
    async function fazerLogin(e) {
        e.preventDefault();

        // Limpa a mensagem de erro
        setErro(' ');

        // Criando o corpo da requisição
        const infosLogin = { senha: senha, id: Number(id) };
        console.log('Informações de login:', infosLogin);

        // Link do endpoint da API
        const urlLogin = `http://localhost:4000/admin/login`;

        // Fazendo a requisição à API
        fetch(urlLogin, {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(infosLogin)
        }).then(async res => {
            const data = await res.json();
            console.log("Status:", res.status);
            console.log("Resposta:", data);

            if (data.sucesso) {
                const userLogado = data.usuario;

                setUsuario(userLogado)

                // Salvando as informações do usuário
                localStorage.setItem('usuario', JSON.stringify({
                    id: userLogado.id,
                    tipo: userLogado.tipo,
                    nome: userLogado.nome
                }));

                // Redirecionando o usuário
                setTimeout(() => { window.location.href = `/admin/home`; }, 1500);
            } else {
                // Mensagem de erro
                setErro('- ' + data.mensagem);
            }
        })
    }

    return <>
        <div className='corpo d-flex flex-wrap'>
            <div className="container">
                {/* Quadro de login */}
                <div className='container_login col-12 col-md-6 col-lg-5 p-3 bordaCinza shadow-sm rounded'>
                    {/* Imagem */}
                    <div>
                        <Image
                            src='/img/DUNDERcinza.svg'
                            alt='Logo Dunner Mifflin'
                            width={300}
                            height={100}
                        />
                    </div>


                    <div className='col-12'>
                        <form className='form-signin' onSubmit={fazerLogin}>
                            <h1 className=" titulo h1 mb-3 fw-normal">fazer login</h1>

                            {/* ID */}
                            <div className="form-floating">
                                <input type="text" className="form-control" id="id" onChange={atualizarID} required />
                                <label htmlFor="id">ID de Funcionário</label>
                            </div>

                            {/* Senha */}
                            <div className="form-floating">
                                <input type="password" className="form-control" id="senha" onChange={atualizarSenha} required />
                                <label htmlFor="senha">Senha</label>
                            </div>

                            {/* Lembre de mim - DECORATIVO*/}
                            <div className="form-check text-start my-3">
                                <input className="form-check-input" type="checkbox" defaultValue="remember-me" id="checkDefault" />
                                <label className="form-check-label" htmlFor="checkDefault">Lembre de mim</label>
                            </div>

                            {/* Botão Login */}
                            <button className="btn btn-1 w-100 py-2" type="submit">
                                Login
                            </button>

                            {/* Mensagem de erro */}
                            <div className='msgErro'>{erro && erro}</div>

                            {/* Legenda */}
                            <div className='legenda'>
                                <div className="text-body-secondary">Não se lembra de sua senha?</div>
                                <a className="text-body-secondary" href='/cadastro'>Esqueci minha senha</a>
                            </div>
                        </form>
                    </div>
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
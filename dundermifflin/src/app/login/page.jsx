import './login.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Login() {
    return <>

        <div className='corpo d-flex flex-wrap'>
            <div>
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

            <div className='div_branca'>
                <div>

                    <form className='form-signin'>
                        <h1 className=" titulo h1 mb-3 fw-normal">fazer login</h1>

                        <div className="form-floating">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                            />
                            <label htmlFor="floatingInput">ID</label>
                        </div>

                        <div className="form-floating">

                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                            />
                            <label htmlFor="floatingPassword">Senha</label>
                        </div>

                        <div className="form-check text-start my-3 seletor col-12">
                            <div className='col-4'>
                                <input type="radio" className="btn-check" name="options-base" id="option5" autoComplete="off" defaultChecked="on" />
                                <label className="btn btn-esq" htmlFor="option5">Gerente</label>
                            </div>

                            <div className='col-4'>
                                <input type="radio" className="btn-check" name="options-base" id="option6" autoComplete="off" />
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

                        <button className="btn btn-1 w-100 py-2" type="submit">
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
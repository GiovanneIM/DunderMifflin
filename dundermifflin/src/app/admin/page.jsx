import './login.css'
import Image from 'next/image'

export default function Login() {
    return <>

        <div className='corpo d-flex flex-wrap'>

            <div className='container_login'>
                <div>
                    <a
                        href={'/'}
                    >
                        <Image
                            src='/img/DUNDERcinza.svg'
                            alt='Logo Dunner Mifflin'
                            width={300}
                            height={100}
                        />
                    </a>
                </div>

                <div className='col-12'>
                    <form className='form-signin'>
                        <h1 className=" titulo h1 mb-3 fw-normal">fazer login</h1>

                        <div className="form-floating">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                            />
                            <label htmlFor="floatingInput">ID de Funcionário</label>
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
                            <div className="text-body-secondary">Não se lembra de sua senha?</div>
                            <a className="text-body-secondary" href='/cadastro'>Esqueci minha senha</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}
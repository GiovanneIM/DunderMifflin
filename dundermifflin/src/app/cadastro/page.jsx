import './cadastro.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Cadastro() {
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
                        <h1 className=" titulo h1 mb-3 fw-normal">cadastrar</h1>


                        <button className="btn btn-1 w-100 py-2" type="submit">
                            Cadastro
                        </button>

                        <div className='legenda'>
                            <p className="text-body-secondary">Já possui uma conta?</p>
                            <a className="text-body-secondary" href='/login'>Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}
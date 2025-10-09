import './login.css'
import Image from 'next/image'

export default function Login() {
    return <>
        <div className='corpo d-flex flex-wrap'>
            <div className='container'>
<div>
                <Image
                    src='/img/DUNDERbranco.svg'
                    alt='Logo Dunner Mifflin'
                    width={200}
                    height={500}
                />
            </div>

            <div className='div_branca'>
                teste
            </div><div>
                <Image
                    src='/img/DUNDERbranco.svg'
                    alt='Logo Dunner Mifflin'
                    width={200}
                    height={500}
                />
            </div>

            <div className='div_branca'>
                teste
            </div>
            </div>
            
        </div>
    </>
}
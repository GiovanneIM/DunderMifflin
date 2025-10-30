'use client'
import './login/login.css'

/* Página para redirecionar para o login */

export default function () {
    window.location.href = '/admin/login'

    return <div style={{backgroundColor:'#212529', minHeight: '100vh'}}></div>
}
    
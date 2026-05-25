import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'

export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

    useEffect(() => {
        const token = searchParams.get('token')

        if (!token) {
            setStatus('error')
            return
        }

        authService.verifyEmail(token)
            .then(() => setStatus('success'))
            .catch(() => setStatus('error'))
    }, [searchParams])

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700 text-center">
                {status === 'loading' && (
                    <>
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-300">Verificando seu e-mail...</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="text-green-400 text-5xl mb-4">✓</div>
                        <h2 className="text-xl font-semibold text-white mb-2">E-mail verificado!</h2>
                        <p className="text-slate-400 text-sm mb-6">Sua conta está ativa. Você já pode fazer login.</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2.5 text-sm transition"
                        >
                            Ir para o login
                        </button>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="text-red-400 text-5xl mb-4">✕</div>
                        <h2 className="text-xl font-semibold text-white mb-2">Link inválido</h2>
                        <p className="text-slate-400 text-sm mb-6">O link de verificação é inválido ou expirou.</p>
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg px-6 py-2.5 text-sm transition"
                        >
                            Tentar novamente
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
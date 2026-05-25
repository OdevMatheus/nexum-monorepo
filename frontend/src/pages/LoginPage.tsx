import { useLogin } from '../hooks/useAuth'
import { useState } from 'react'
import type { LoginRequest } from '../types/auth'

export default function LoginPage() {
    const { mutate, isPending, error } = useLogin()
    const [form, setForm] = useState<LoginRequest>({
        email: '',
        password: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutate(form)
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
                <h1 className="text-2xl font-semibold text-white mb-1">Entrar</h1>
                <p className="text-slate-400 text-sm mb-6">Acesse sua conta Nexum</p>

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-700 text-red-400 text-sm">
                        E-mail ou senha inválidos.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-slate-300 mb-1">E-mail</label>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-300 mb-1">Senha</label>
                        <input
                            type="password"
                            placeholder="Sua senha"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg py-2.5 text-sm transition"
                    >
                        {isPending ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <p className="text-center text-slate-400 text-sm mt-6">
                    Não tem uma conta?{' '}
                    <a href="/register" className="text-blue-400 hover:text-blue-300 transition">
                        Criar conta
                    </a>
                </p>
            </div>
        </div>
    )
}
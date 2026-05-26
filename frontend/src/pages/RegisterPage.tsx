import { useRegister } from '../hooks/useAuth'
import { useState } from 'react'
import type { RegisterRequest } from '../types/auth'
import { getErrorMessage } from '../services/authService'

export default function RegisterPage() {
    const { mutate, isPending, isSuccess, error } = useRegister()
    const [form, setForm] = useState<RegisterRequest>({
        name: '',
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
                <h1 className="text-2xl font-semibold text-white mb-1">Criar conta</h1>
                <p className="text-slate-400 text-sm mb-6">Preencha os dados abaixo para começar</p>

                {isSuccess && (
                    <div className="mb-4 p-3 rounded-lg bg-green-900/30 border border-green-700 text-green-400 text-sm">
                        Cadastro realizado! Verifique seu e-mail para ativar a conta.
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-700 text-red-400 text-sm">
                        {getErrorMessage(error)}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-slate-300 mb-1">Nome</label>
                        <input
                            type="text"
                            placeholder="Seu nome completo"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition"
                            required
                        />
                    </div>

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
                            placeholder="Mínimo 8 caracteres"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition"
                            required
                            minLength={8}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg py-2.5 text-sm transition"
                    >
                        {isPending ? 'Criando conta...' : 'Criar conta'}
                    </button>
                </form>

                <p className="text-center text-slate-400 text-sm mt-6">
                    Já tem uma conta?{' '}
                    <a href="/login" className="text-blue-400 hover:text-blue-300 transition">
                        Entrar
                    </a>
                </p>
            </div>
        </div>
    )
}
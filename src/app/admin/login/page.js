'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Credenciais inválidas ou erro de ligação.')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-dark-green bg-grain flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary-green/10 rounded-full blur-[120px] pointer-events-none" />

      <Container size="xs" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-10 md:p-14 border border-white/10 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)]"
        >
          <div className="flex flex-col items-center mb-12 text-center">
            <div className="w-20 h-20 bg-primary-green/20 rounded-[1.5rem] flex items-center justify-center mb-6 text-primary-green border border-primary-green/30 shadow-lg shadow-primary-green/10">
              <Lock size={32} strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Administração</h1>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Acesso Seguro 20Recolher</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-primary-green uppercase tracking-[0.3em] ml-1">Identificador Digital</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary-green transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-primary-green/50 focus:bg-white/10 focus:border-primary-green transition-all outline-none text-white font-bold"
                  placeholder="admin@20recolher.pt"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-primary-green uppercase tracking-[0.3em] ml-1">Chave de Segurança</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary-green transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-primary-green/50 focus:bg-white/10 focus:border-primary-green transition-all outline-none text-white font-bold"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              className="h-16 rounded-2xl bg-primary-green hover:bg-white hover:text-dark-green transition-all duration-300 font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-2xl shadow-primary-green/20 border-none"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Verificando...
                </>
              ) : (
                <>
                  Entrar no Sistema
                  <ChevronRight size={18} strokeWidth={3} />
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
             <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">&copy; {new Date().getFullYear()} 20Recolher v2.0</p>
          </div>
        </motion.div>
      </Container>
    </main>
  )
}
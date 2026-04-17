'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { Lock, Mail, Loader2, AlertCircle, ChevronRight, ShieldCheck } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

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

  // Tilt Effect Logic
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg'])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <main className="min-h-screen bg-dark-green bg-grain flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Immersive Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary-green/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      <Container size="xs" className="relative z-10">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/5 backdrop-blur-3xl rounded-[3.5rem] p-10 md:p-16 border border-white/10 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)] relative"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 rounded-[3.5rem] border border-white/5 pointer-events-none" />

          <div className="flex flex-col items-center mb-14 text-center">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="w-24 h-24 bg-primary-green rounded-[2rem] flex items-center justify-center mb-8 text-dark-green shadow-[0_0_40px_rgba(142,179,31,0.3)] border-4 border-white/10"
            >
              <Lock size={38} strokeWidth={2.5} />
            </motion.div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
                Acesso <span className="text-primary-green">Admin</span>
              </h1>
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-px bg-white/20" />
                <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.4em]">20Recolher Cloud</p>
                <div className="w-8 h-px bg-white/20" />
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-primary-green uppercase tracking-[0.4em] ml-2">Identificador</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-white/30 group-focus-within:text-primary-green transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-16 pr-8 py-6 bg-white/5 border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary-green/20 focus:bg-white/10 focus:border-primary-green transition-all outline-none text-white font-bold placeholder:text-white/10"
                  placeholder="utilizador@20recolher.pt"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-primary-green uppercase tracking-[0.4em] ml-2">Chave Mestra</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-white/30 group-focus-within:text-primary-green transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-16 pr-8 py-6 bg-white/5 border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary-green/20 focus:bg-white/10 focus:border-primary-green transition-all outline-none text-white font-bold placeholder:text-white/10"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-black uppercase tracking-tight"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              className="h-20 rounded-2xl bg-primary-green text-dark-green hover:bg-white hover:text-dark-green transition-all duration-500 font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 shadow-[0_20px_40px_-10px_rgba(142,179,31,0.4)] border-none active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={22} />
                  Sincronizando...
                </>
              ) : (
                <>
                  Iniciar Sessão
                  <ChevronRight size={20} strokeWidth={4} />
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-14 pt-10 border-t border-white/5 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
              <ShieldCheck size={12} className="text-primary-green" />
              <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Encriptação AES-256</span>
            </div>
            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">&copy; 2026 Sistema de Gestão 20Recolher</p>
          </div>
        </motion.div>
      </Container>
    </main>
  )
}
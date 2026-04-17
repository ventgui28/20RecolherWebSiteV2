'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { 
  Lock, 
  Mail, 
  Loader2, 
  AlertCircle, 
  ChevronRight, 
  ShieldCheck, 
  ArrowLeft,
  Globe,
  Leaf
} from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { BRAND } from '@/constants/brand'
import { Turnstile } from '@marsidev/react-turnstile'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const supabase = createClient()

  // Diagnóstico
  useEffect(() => {
    console.log('🛡️ Turnstile Site Key:', process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? 'Configurada ✅' : 'Em falta ❌')
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    
    // Validar se o captcha foi resolvido se a chave estiver presente
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !captchaToken) {
      setError('Por favor, resolva o desafio de segurança.')
      return
    }

    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        captchaToken: captchaToken // Integrado com Supabase Auth se ativado no painel
      }
    })

    if (error) {
      setError('Credenciais inválidas ou erro de ligação.')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
    router.refresh()
  }

  // Tilt Effect Logic for the form card
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['3deg', '-3deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-3deg', '3deg'])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <main className="min-h-screen bg-dark-green flex flex-col lg:flex-row relative overflow-hidden">
      {/* Background Texture & Noise */}
      <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none z-0" />
      
      {/* Left Side: Brand Narrative (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] bg-dark-green relative p-20 flex-col justify-between overflow-hidden border-r border-white/5">
        {/* Dynamic Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-primary-green/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-emerald-500/5 rounded-full blur-[100px]" />

        <div className="relative z-10">
          <Link 
            href="/"
            className="group flex items-center gap-3 text-white/40 hover:text-primary-green transition-colors mb-20 inline-flex"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary-green/20 group-hover:scale-110 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Voltar ao Site</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-1 bg-primary-green rounded-full shadow-[0_0_15px_rgba(142,179,31,0.6)]" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-green">Missão & Valores</span>
            </div>
            <h2 className="text-5xl xl:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-8">
              Liderar a <span className="italic text-primary-green">Circularidade</span> Tecnológica.
            </h2>
            <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-md">
              {BRAND.mission}
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5"
        >
          <p className="text-white/60 italic text-sm font-medium mb-6 leading-relaxed">
            "{BRAND.quote}"
          </p>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-primary-green/20 rounded-full flex items-center justify-center text-primary-green">
               <Leaf size={18} />
             </div>
             <div>
               <p className="text-white font-black text-[10px] uppercase tracking-widest">Sustentabilidade Primeiro</p>
               <p className="text-white/30 text-[9px] font-bold uppercase tracking-tight">Compromisso 20Recolher</p>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-20 relative z-10">
        {/* Mobile Logo / Header */}
        <div className="absolute top-10 left-10 lg:hidden">
          <Link href="/" className="text-white font-black tracking-tighter text-xl">
            20<span className="text-primary-green">Recolher</span>
          </Link>
        </div>

        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md bg-white/5 backdrop-blur-3xl rounded-[3.5rem] p-10 md:p-14 border border-white/10 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.4)] relative overflow-hidden group/card"
        >
          {/* Subtle Corner Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-green/10 rounded-full blur-[80px] group-hover/card:bg-primary-green/20 transition-colors duration-700" />
          
          <div className="flex flex-col items-center mb-12 text-center relative z-10">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -5 }}
              className="w-20 h-20 bg-primary-green rounded-[1.8rem] flex items-center justify-center mb-8 text-dark-green shadow-2xl shadow-primary-green/20 border border-white/20"
            >
              <Lock size={32} strokeWidth={2.5} />
            </motion.div>
            
            <div className="space-y-3">
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">
                Bem-vindo ao <br />
                <span className="text-primary-green">Cloud Manager</span>
              </h1>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Autenticação de Segurança</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-8 relative z-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-primary-green uppercase tracking-[0.4em] ml-2">Email Profissional</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-white/20 group-focus-within/input:text-primary-green transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-white/[0.03] border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary-green/20 focus:bg-white/[0.07] focus:border-primary-green transition-all outline-none text-white font-bold placeholder:text-white/5"
                  placeholder="ex: gestor@20recolher.pt"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-primary-green uppercase tracking-[0.4em] ml-2">Código de Acesso</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-white/20 group-focus-within/input:text-primary-green transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-white/[0.03] border border-white/10 rounded-2xl focus:ring-4 focus:ring-primary-green/20 focus:bg-white/[0.07] focus:border-primary-green transition-all outline-none text-white font-bold placeholder:text-white/5"
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

            {/* Cloudflare Turnstile Widget */}
            {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
              <div className="flex justify-center py-2 min-h-[70px] relative z-[100] border border-dashed border-white/5">
                <Turnstile 
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} 
                  onSuccess={(token) => {
                    console.log('✅ Token gerado com sucesso')
                    setCaptchaToken(token)
                  }}
                  onError={() => console.error('❌ Erro ao carregar Turnstile')}
                  options={{
                    theme: 'dark',
                    appearance: 'always',
                  }}
                />
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              className="h-20 rounded-2xl bg-primary-green text-dark-green hover:bg-white transition-all duration-500 font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 shadow-[0_30px_60px_-15px_rgba(142,179,31,0.4)] border-none active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={22} />
                  Sincronizando...
                </>
              ) : (
                <>
                  Entrar na Plataforma
                  <ChevronRight size={20} strokeWidth={4} />
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-14 pt-10 border-t border-white/5 flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 rounded-full border border-white/5">
              <ShieldCheck size={14} className="text-primary-green" />
              <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Sessão Encriptada End-to-End</span>
            </div>
            
            <div className="flex items-center gap-8">
               <Globe size={16} className="text-white/10" />
               <div className="w-px h-4 bg-white/10" />
               <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.4em]">&copy; 2026 v2.5.1</p>
               <div className="w-px h-4 bg-white/10" />
               <Leaf size={16} className="text-white/10" />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
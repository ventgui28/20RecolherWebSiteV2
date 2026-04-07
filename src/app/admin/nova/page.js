'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import RichTextEditor from '@/components/admin/RichTextEditor'
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  X, 
  Loader2, 
  CheckCircle2,
  Type,
  FileText,
  Tag
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function NovaNoticiaPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  
  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    categoria: 'Reciclagem',
    conteudo: '',
    publicado: true
  })

  const router = useRouter()
  const supabase = createClient()

  // Função para criar slug a partir do título
  const createSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imagemUrl = null

      // 1. Upload da Imagem (se houver)
      if (image) {
        const fileExt = image.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `noticias/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('noticias-images')
          .upload(filePath, image)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('noticias-images')
          .getPublicUrl(filePath)
          
        imagemUrl = publicUrl
      }

      // 2. Inserir na Base de Dados
      const { error: dbError } = await supabase
        .from('noticias')
        .insert([{
          titulo: formData.titulo,
          slug: createSlug(formData.titulo),
          subtitulo: formData.subtitulo,
          categoria: formData.categoria,
          conteudo: formData.conteudo,
          imagem_url: imagemUrl,
          publicado: formData.publicado
        }])

      if (dbError) throw dbError

      setSuccess(true)
      setTimeout(() => router.push('/admin/dashboard'), 1500)
    } catch (error) {
      console.error('Erro ao guardar notícia:', error)
      alert('Erro ao guardar notícia. Verifique a consola.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Notícia Publicada!</h1>
          <p className="text-slate-500">A redirecionar para o painel...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Voltar</span>
            </button>
            <h1 className="text-3xl font-bold text-slate-900">Nova Notícia</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informações Básicas */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <Type size={16} className="text-emerald-600" />
                  Título da Notícia
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Novo centro de reciclagem em Cantanhede"
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-lg font-medium"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <FileText size={16} className="text-emerald-600" />
                  Subtítulo / Lead
                </label>
                <textarea
                  placeholder="Breve resumo da notícia para atrair leitores..."
                  value={formData.subtitulo}
                  onChange={(e) => setFormData({...formData, subtitulo: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all h-24 resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                    <Tag size={16} className="text-emerald-600" />
                    Categoria
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option>Reciclagem</option>
                    <option>Sustentabilidade</option>
                    <option>Empresa</option>
                    <option>Legislação</option>
                    <option>Inovação</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                    <ImageIcon size={16} className="text-emerald-600" />
                    Imagem de Destaque
                  </label>
                  {imagePreview ? (
                    <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100 border border-slate-200 group">
                      <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                      <button 
                        onClick={() => { setImage(null); setImagePreview(null); }}
                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:border-emerald-300 transition-all cursor-pointer">
                      <ImageIcon className="text-slate-400 mb-2" size={32} />
                      <span className="text-sm text-slate-500 font-medium">Clique para carregar imagem</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
              </div>
            </section>

            {/* Editor */}
            <section className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">Conteúdo Completo</label>
              <RichTextEditor 
                content={formData.conteudo} 
                onChange={(html) => setFormData({...formData, conteudo: html})} 
              />
            </section>

            {/* Botão de Gravar */}
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
                className="px-8"
              >
                Cancelar
              </Button>
              <Button
                disabled={loading || !formData.titulo || !formData.conteudo}
                className="px-10 py-4 flex items-center gap-2 font-bold"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    A guardar...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Publicar Notícia
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </main>
  )
}

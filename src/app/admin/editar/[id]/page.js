'use client'

import { useState, useEffect, use } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import RichTextEditor from '@/components/admin/RichTextEditor'
import PreviewModal from '@/components/admin/PreviewModal'
import RevisionsModal from '@/components/admin/RevisionsModal'
import { NEWS_DEFAULT_IMAGES } from '@/constants/news'
import { calculateReadingTime } from '@/lib/utils'
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  X, 
  Loader2, 
  CheckCircle2,
  Type,
  FileText,
  Tag,
  Search,
  Eye,
  Globe,
  Settings,
  History,
  Clock,
  MousePointer2
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function EditarNoticiaPage({ params }) {
  const { id } = use(params)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isRevisionsOpen, setIsRevisionsOpen] = useState(false)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isUsingDefault, setIsUsingDefault] = useState(false)
  
  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    categoria: 'Institucional',
    conteudo: '',
    publicado: false,
    seo_title: '',
    seo_description: ''
  })

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (id) {
      fetchNoticia()
    }
  }, [id])

  const fetchNoticia = async () => {
    const { data, error } = await supabase
      .from('noticias')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Erro ao carregar notícia:', error)
      router.push('/admin/dashboard')
    } else {
      setFormData({
        titulo: data.titulo,
        subtitulo: data.subtitulo || '',
        categoria: data.categoria,
        conteudo: data.conteudo,
        publicado: data.publicado,
        seo_title: data.seo_title || '',
        seo_description: data.seo_description || ''
      })
      setImagePreview(data.imagem_url)
      
      // Verificar se a imagem atual é uma das padrão
      const isDefault = NEWS_DEFAULT_IMAGES.some(img => img.url === data.imagem_url);
      setIsUsingDefault(isDefault);
    }
    setLoading(false)
  }

  const handleRestore = (revision) => {
    setFormData({
      titulo: revision.titulo,
      subtitulo: revision.resumo || '', // Na tabela de revisões é 'resumo'
      categoria: revision.categoria,
      conteudo: revision.conteudo,
      publicado: revision.publicado,
      seo_title: revision.meta_title || '', // Na tabela de revisões é 'meta_title'
      seo_description: revision.meta_description || '' // Na tabela de revisões é 'meta_description'
    })
    if (revision.imagem_url) {
      setImagePreview(revision.imagem_url)
      const isDefault = NEWS_DEFAULT_IMAGES.some(img => img.url === revision.imagem_url);
      setIsUsingDefault(isDefault);
    }
    setIsRevisionsOpen(false)
    alert('Versão restaurada no editor. Clique em "Guardar Alterações" para confirmar.')
  }

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

  const optimizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            const optimizedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(optimizedFile);
          }, 'image/jpeg', 0.8);
        };
      };
    });
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setSaving(true);
      const optimized = await optimizeImage(file);
      setImage(optimized);
      setImagePreview(URL.createObjectURL(optimized));
      setIsUsingDefault(false);
      setSaving(false);
    }
  }

  const handleSelectDefault = (url) => {
    setImage(null);
    setImagePreview(url);
    setIsUsingDefault(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação de imagem obrigatória
    if (!image && !imagePreview) {
      alert('A imagem de capa é obrigatória. Por favor, faça upload ou selecione uma imagem padrão.');
      return;
    }

    setSaving(true)

    try {
      let imagemUrl = imagePreview

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

      const { error: dbError } = await supabase
        .from('noticias')
        .update({
          titulo: formData.titulo,
          slug: createSlug(formData.titulo),
          subtitulo: formData.subtitulo,
          categoria: formData.categoria,
          conteudo: formData.conteudo,
          imagem_url: imagemUrl,
          publicado: formData.publicado,
          seo_title: formData.seo_title,
          seo_description: formData.seo_description
        })
        .eq('id', id)


      if (dbError) throw dbError

      setSuccess(true)
      setTimeout(() => router.push('/admin/dashboard'), 1500)
    } catch (error) {
      console.error('Erro ao atualizar notícia:', error)
      alert('Erro ao atualizar notícia.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    )
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Alterações Guardadas!</h1>
          <p className="text-slate-500">A atualizar o painel...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.back()}
                className="p-3 bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 rounded-2xl transition-all shadow-sm"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editar Notícia</h1>
                <p className="text-sm text-slate-500 font-medium italic">Gestão de Conteúdo & Histórico</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsRevisionsOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 rounded-2xl font-bold transition-all shadow-sm"
                title="Ver versões anteriores"
              >
                <History size={18} />
                Histórico
              </button>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 rounded-2xl font-bold transition-all shadow-sm"
              >
                <Eye size={18} />
                Pré-visualizar
              </button>
              <Button
                onClick={handleSubmit}
                disabled={saving || !formData.titulo || !formData.conteudo || (!image && !imagePreview)}
                className="px-8 py-3 flex items-center gap-2 font-black shadow-lg shadow-emerald-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                Guardar Alterações
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100 space-y-8">
                <div>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">
                    <Type size={14} className="text-emerald-600" />
                    Título Editorial
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Título de impacto..."
                    value={formData.titulo}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                    className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all text-2xl font-black text-slate-900 placeholder:text-slate-300"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">
                    <FileText size={14} className="text-emerald-600" />
                    Subtítulo / Introdução
                  </label>
                  <textarea
                    placeholder="Resumo da notícia..."
                    value={formData.subtitulo}
                    onChange={(e) => setFormData({...formData, subtitulo: e.target.value})}
                    className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all h-32 resize-none font-medium text-slate-600 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">
                    Conteúdo do Artigo
                  </label>
                  <RichTextEditor 
                    content={formData.conteudo} 
                    onChange={(html) => setFormData({...formData, conteudo: html})} 
                  />
                </div>
              </section>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 mb-2">
                  <Settings size={14} className="text-emerald-600" />
                  Estado & Categoria
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-sm font-bold text-slate-700">Público</span>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, publicado: !formData.publicado})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.publicado ? 'bg-emerald-600' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.publicado ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Categoria</label>
                    <select
                      value={formData.categoria}
                      onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      <option>Institucional</option>
                      <option>Serviços</option>
                      <option>Certificações</option>
                      <option>Inovação</option>
                      <option>Parcerias</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Sidebar: Imagem */}
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-900 mb-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon size={14} className="text-emerald-600" />
                    Imagem de Capa
                  </div>
                  <span className="text-[9px] text-red-500 bg-red-50 px-2 py-1 rounded">Obrigatório</span>
                </div>
                
                {imagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100 border border-slate-100 group">
                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       <button 
                        onClick={() => { setImage(null); setImagePreview(null); setIsUsingDefault(false); }}
                        className="p-3 bg-white text-red-500 rounded-2xl hover:scale-110 transition-transform shadow-xl"
                        title="Remover imagem"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    {isUsingDefault && (
                      <div className="absolute bottom-3 left-3 px-3 py-1 bg-emerald-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        Imagem Padrão Selecionada
                      </div>
                    )}
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50 hover:bg-white hover:border-emerald-300 transition-all cursor-pointer group shadow-inner">
                    <div className="p-4 bg-white rounded-2xl shadow-sm mb-3 group-hover:scale-110 transition-transform text-slate-300 group-hover:text-emerald-500">
                      <ImageIcon size={28} />
                    </div>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Alterar Imagem</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}

                {/* Default Images Selection */}
                <div className="pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">
                    <MousePointer2 size={12} className="text-emerald-500" />
                    Ou use um dos padrões:
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {NEWS_DEFAULT_IMAGES.map((img) => (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => handleSelectDefault(img.url)}
                        className={`group relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                          imagePreview === img.url 
                            ? 'border-emerald-500 ring-4 ring-emerald-500/10' 
                            : 'border-transparent hover:border-slate-200'
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
                        <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-slate-900/80 to-transparent">
                          <span className="text-[8px] font-black text-white uppercase tracking-widest">{img.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              <section className="bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200 space-y-6 text-white">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">
                  <Search size={14} />
                  Configurações SEO
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Meta Title</label>
                    <input
                      type="text"
                      value={formData.seo_title}
                      onChange={(e) => setFormData({...formData, seo_title: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Meta Description</label>
                    <textarea
                      value={formData.seo_description}
                      onChange={(e) => setFormData({...formData, seo_description: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 h-24 resize-none"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Container>

      <PreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        data={{...formData, imagePreview}} 
      />

      <RevisionsModal
        isOpen={isRevisionsOpen}
        onClose={() => setIsRevisionsOpen(false)}
        noticiaId={id}
        onRestore={handleRestore}
      />
    </main>
  )
}

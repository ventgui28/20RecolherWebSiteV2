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
  MousePointer2,
  Plus
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
  const [readingMetrics, setReadingMetrics] = useState({ words: 0, time: 0 })

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (id) {
      fetchNoticia()
    }
  }, [id])

  useEffect(() => {
    const words = formData.conteudo ? formData.conteudo.replace(/<[^>]*>/g, '').trim().split(/\s+/).length : 0
    const time = calculateReadingTime(formData.conteudo)
    setReadingMetrics({ words: formData.conteudo ? words : 0, time })
  }, [formData.conteudo])

  const fetchNoticia = async () => {
    const { data, error } = await supabase
      .from('noticias')
      .select('id, titulo, subtitulo, categoria, conteudo, publicado, seo_title, seo_description, imagem_url, slug, autor')
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
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('O ficheiro selecionado não é uma imagem válida.'));
        return;
      }

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
        
        img.onerror = () => {
          reject(new Error('Falha ao processar a imagem. O ficheiro pode estar corrompido.'));
        };
      };
      
      reader.onerror = () => reject(new Error('Falha ao ler o ficheiro.'));
    });
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setSaving(true);
      try {
        const optimized = await optimizeImage(file);
        setImage(optimized);
        setImagePreview(URL.createObjectURL(optimized));
        setIsUsingDefault(false);
      } catch (err) {
        alert(err.message);
      } finally {
        setSaving(false);
      }
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
        const fileExt = image.name.split('.').pop().toLowerCase()
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`
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
          className="bg-white p-12 rounded-[3rem] shadow-xl text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Alterações Guardadas!</h1>
          <p className="text-slate-500 font-medium">A atualizar o painel de controlo...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50/30 pt-32 pb-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary-green/5 rounded-full blur-[100px] -z-10" />
      
      <Container size="xl">
        <div className="max-w-7xl mx-auto">
          {/* Sticky Header - Premium Glass */}
          <div className="sticky top-24 z-40 bg-white/40 backdrop-blur-xl pb-8 -mx-4 px-4 mb-4 border-b border-white/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => router.back()}
                  className="w-14 h-14 flex items-center justify-center bg-white border border-slate-100 text-slate-400 hover:text-primary-green rounded-2xl transition-all shadow-sm hover:shadow-primary-green/10 group"
                >
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-1 bg-primary-green rounded-full shadow-[0_0_10px_rgba(142,179,31,0.5)]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-green">Edição Editorial</span>
                  </div>
                  <h1 className="text-3xl font-black text-dark-green tracking-tighter line-clamp-1 max-w-md">
                    {formData.titulo || 'Nova Notícia'}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden lg:flex items-center gap-8 px-8 py-3 bg-white/80 border border-slate-100 rounded-[2rem] shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Palavras</span>
                    <span className="text-sm font-black text-dark-green">{readingMetrics.words}</span>
                  </div>
                  <div className="w-px h-6 bg-slate-100" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Tempo</span>
                    <span className="text-sm font-black text-dark-green">{readingMetrics.time} min</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsRevisionsOpen(true)}
                  className="w-14 h-14 flex items-center justify-center bg-white border border-slate-100 text-slate-400 hover:text-primary-green rounded-2xl transition-all shadow-sm hover:shadow-primary-green/10"
                  title="Histórico de versões"
                >
                  <History size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="w-14 h-14 flex items-center justify-center bg-white border border-slate-100 text-slate-400 hover:text-primary-green rounded-2xl transition-all shadow-sm hover:shadow-primary-green/10"
                  title="Pré-visualizar"
                >
                  <Eye size={22} />
                </button>
                <Button
                  onClick={handleSubmit}
                  disabled={saving || !formData.titulo || !formData.conteudo || (!image && !imagePreview)}
                  className="h-14 px-10 bg-dark-green text-white hover:bg-primary-green rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-dark-green/10 hover:shadow-primary-green/20 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={18} strokeWidth={3} /> : <Save size={18} strokeWidth={3} />}
                  Guardar Alterações
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-10">
            {/* Editor Area */}
            <div className="lg:col-span-8 space-y-10">
              <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 space-y-10">
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 ml-1">
                      <Type size={14} className="text-primary-green" />
                      Título do Artigo
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      placeholder="Escreva algo impactante..."
                      value={formData.titulo}
                      onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                      className="w-full px-0 py-2 bg-transparent border-b-2 border-slate-50 focus:border-primary-green outline-none transition-all text-3xl md:text-5xl font-black text-dark-green placeholder:text-slate-100 tracking-tighter"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 ml-1">
                      <FileText size={14} className="text-primary-green" />
                      Subtítulo / Lead Editorial
                    </label>
                    <textarea
                      placeholder="Um breve resumo para captar a atenção do leitor..."
                      maxLength={300}
                      value={formData.subtitulo}
                      onChange={(e) => setFormData({...formData, subtitulo: e.target.value})}
                      className="w-full px-8 py-6 bg-slate-50/50 border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-primary-green/5 focus:bg-white focus:border-primary-green outline-none transition-all h-36 resize-none font-bold text-dark-green/70 leading-relaxed placeholder:text-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 ml-1">
                    Conteúdo Principal
                  </label>
                  <RichTextEditor 
                    content={formData.conteudo} 
                    onChange={(html) => setFormData({...formData, conteudo: html})} 
                  />
                </div>
              </section>
            </div>

            {/* Sidebar Area */}
            <div className="lg:col-span-4 space-y-8">
              {/* Publication Settings */}
              <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-2">
                  <Settings size={14} className="text-emerald-600" />
                  Publicação
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-700">Visibilidade</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{formData.publicado ? 'Público no Site' : 'Rascunho Privado'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, publicado: !formData.publicado})}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all focus:outline-none ${formData.publicado ? 'bg-emerald-600 shadow-lg shadow-emerald-500/20' : 'bg-slate-200'}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${formData.publicado ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Categoria do Artigo</label>
                    <div className="relative group">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={16} />
                      <select
                        value={formData.categoria}
                        onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                        className="w-full pl-11 pr-10 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-700 outline-none focus:ring-4 focus:ring-emerald-500/5 focus:bg-white focus:border-emerald-500 transition-all appearance-none cursor-pointer shadow-sm"
                      >
                        <option>Institucional</option>
                        <option>Serviços</option>
                        <option>Certificações</option>
                        <option>Inovação</option>
                        <option>Parcerias</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <Plus size={14} className="rotate-45" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cover Image */}
              <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                    <ImageIcon size={14} className="text-emerald-600" />
                    Imagem de Capa
                  </div>
                  <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">Obrigatório</span>
                </div>
                
                {imagePreview ? (
                  <div className="relative rounded-3xl overflow-hidden aspect-video bg-slate-100 border border-slate-100 group shadow-inner">
                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                       <button 
                        onClick={() => { setImage(null); setImagePreview(null); setIsUsingDefault(false); }}
                        className="p-4 bg-white text-red-500 rounded-2xl hover:scale-110 transition-transform shadow-2xl active:scale-95"
                        title="Remover imagem"
                      >
                        <X size={20} strokeWidth={3} />
                      </button>
                    </div>
                    {isUsingDefault && (
                      <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-xl flex items-center gap-2 border border-emerald-400/30">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        Padrão Ativo
                      </div>
                    )}
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all cursor-pointer group shadow-inner relative overflow-hidden">
                    <div className="p-5 bg-white rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-all duration-500 text-slate-300 group-hover:text-emerald-500 group-hover:shadow-emerald-500/10">
                      <ImageIcon size={32} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Fazer Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}

                {/* Library Selection */}
                <div className="pt-6 border-t border-slate-50">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5 ml-1">
                    <MousePointer2 size={12} className="text-emerald-500" />
                    Biblioteca de Padrões
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {NEWS_DEFAULT_IMAGES.map((img) => (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => handleSelectDefault(img.url)}
                        className={`group relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all ${
                          imagePreview === img.url 
                            ? 'border-emerald-500 ring-4 ring-emerald-500/5' 
                            : 'border-transparent hover:border-slate-200'
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
                        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-900/90 to-transparent">
                          <span className="text-[9px] font-black text-white uppercase tracking-widest block truncate">{img.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* SEO Engine Card - Dark Mode Premium */}
              <section className="bg-dark-green bg-grain rounded-[2.5rem] p-10 shadow-2xl shadow-dark-green/20 space-y-8 text-white overflow-hidden relative group border border-white/5">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-green/20 rounded-full blur-[80px] group-hover:bg-primary-green/30 transition-colors" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-primary-green mb-10">
                    <Globe size={16} strokeWidth={3} />
                    SEO Engine v2
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 ml-1">Meta Title</label>
                      <input
                        type="text"
                        placeholder="Título Otimizado..."
                        value={formData.seo_title}
                        onChange={(e) => setFormData({...formData, seo_title: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm text-white focus:outline-none focus:ring-4 focus:ring-primary-green/20 focus:bg-white/10 focus:border-primary-green/50 transition-all placeholder:text-white/10 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 ml-1">Meta Description</label>
                      <textarea
                        placeholder="Snippet para o Google..."
                        value={formData.seo_description}
                        onChange={(e) => setFormData({...formData, seo_description: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm text-white focus:outline-none focus:ring-4 focus:ring-primary-green/20 focus:bg-white/10 focus:border-primary-green/50 transition-all h-32 resize-none placeholder:text-white/10 font-medium leading-relaxed"
                      />
                    </div>
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

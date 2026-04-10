'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { useEffect } from 'react'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  Heading1, 
  Heading2, 
  Link as LinkIcon,
  Unlink
} from 'lucide-react'

const MenuBar = ({ editor }) => {
  if (!editor) return null

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL do Link:', previousUrl)
    
    // Se cancelar
    if (url === null) return

    // Se vazio, remove link
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    // Adiciona link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="flex flex-wrap gap-2 p-3 border-b border-slate-200 bg-slate-50/50 rounded-t-xl sticky top-0 z-10 backdrop-blur-md">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('bold') ? 'bg-emerald-600 shadow-lg shadow-emerald-500/20 text-white' : 'text-slate-500 hover:bg-white hover:text-emerald-600'}`}
        title="Negrito"
      >
        <Bold size={18} strokeWidth={2.5} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('italic') ? 'bg-emerald-600 shadow-lg shadow-emerald-500/20 text-white' : 'text-slate-500 hover:bg-white hover:text-emerald-600'}`}
        title="Itálico"
      >
        <Italic size={18} strokeWidth={2.5} />
      </button>
      
      <div className="w-px h-6 bg-slate-200 mx-1 self-center" />
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('heading', { level: 1 }) ? 'bg-emerald-600 shadow-lg shadow-emerald-500/20 text-white' : 'text-slate-500 hover:bg-white hover:text-emerald-600'}`}
        title="Título 1"
      >
        <Heading1 size={18} strokeWidth={2.5} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('heading', { level: 2 }) ? 'bg-emerald-600 shadow-lg shadow-emerald-500/20 text-white' : 'text-slate-500 hover:bg-white hover:text-emerald-600'}`}
        title="Título 2"
      >
        <Heading2 size={18} strokeWidth={2.5} />
      </button>
      
      <div className="w-px h-6 bg-slate-200 mx-1 self-center" />
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('bulletList') ? 'bg-emerald-600 shadow-lg shadow-emerald-500/20 text-white' : 'text-slate-500 hover:bg-white hover:text-emerald-600'}`}
        title="Lista de Pontos"
      >
        <List size={18} strokeWidth={2.5} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('orderedList') ? 'bg-emerald-600 shadow-lg shadow-emerald-500/20 text-white' : 'text-slate-500 hover:bg-white hover:text-emerald-600'}`}
        title="Lista Numerada"
      >
        <ListOrdered size={18} strokeWidth={2.5} />
      </button>
      
      <div className="w-px h-6 bg-slate-200 mx-1 self-center" />
      
      <button
        type="button"
        onClick={addLink}
        className={`p-2 rounded-lg transition-all ${editor.isActive('link') ? 'bg-emerald-600 shadow-lg shadow-emerald-500/20 text-white' : 'text-slate-500 hover:bg-white hover:text-emerald-600'}`}
        title="Adicionar Link"
      >
        <LinkIcon size={18} strokeWidth={2.5} />
      </button>
      {editor.isActive('link') && (
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="p-2 rounded-lg transition-all text-red-500 hover:bg-red-50"
          title="Remover Link"
        >
          <Unlink size={18} strokeWidth={2.5} />
        </button>
      )}
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded-lg transition-all ${editor.isActive('blockquote') ? 'bg-emerald-600 shadow-lg shadow-emerald-500/20 text-white' : 'text-slate-500 hover:bg-white hover:text-emerald-600'}`}
        title="Citação"
      >
        <Quote size={18} strokeWidth={2.5} />
      </button>
      
      <div className="w-px h-6 bg-slate-200 mx-1 flex-grow" />
      
      <div className="flex items-center gap-1">
        <button 
          type="button" 
          onClick={() => editor.chain().focus().undo().run()} 
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-30"
          title="Anular"
        >
          <Undo size={18} strokeWidth={2.5} />
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().redo().run()} 
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-30"
          title="Refazer"
        >
          <Redo size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

export default function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: true,
      }),
      Link.configure({ 
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-emerald-600 font-black underline cursor-pointer decoration-emerald-500/30 underline-offset-4',
        },
      }),
      Image,
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'max-w-none p-8 md:p-10 outline-none min-h-[400px] text-slate-800 text-lg leading-relaxed editor-content',
      },
    },
  })

  // Sincronizar conteúdo quando a prop muda (importante para o histórico/restauro)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return (
    <div className="border border-slate-100 rounded-[2rem] overflow-hidden bg-slate-50/30 focus-within:ring-4 focus-within:ring-emerald-500/5 focus-within:border-emerald-500/50 focus-within:bg-white transition-all shadow-inner relative group">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      
      <style jsx global>{`
        .editor-content h1 { font-size: 2.25rem; font-weight: 900; color: #0f172a; margin-top: 2rem; margin-bottom: 1rem; line-height: 1.2; }
        .editor-content h2 { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin-top: 1.5rem; margin-bottom: 0.75rem; }
        .editor-content p { margin-bottom: 1.25rem; }
        .editor-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .editor-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .editor-content li { margin-bottom: 0.5rem; }
        .editor-content blockquote { border-left: 4px solid #10b981; padding-left: 1.5rem; font-style: italic; color: #475569; margin: 2rem 0; font-size: 1.25rem; }
        .editor-content a { color: #059669; text-decoration: underline; font-weight: 700; }
      `}</style>
    </div>
  )
}

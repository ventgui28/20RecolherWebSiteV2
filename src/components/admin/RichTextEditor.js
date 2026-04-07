'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
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
  Link as LinkIcon 
} from 'lucide-react'

const MenuBar = ({ editor }) => {
  if (!editor) return null

  const addLink = () => {
    const url = window.prompt('URL do Link:')
    if (url) editor.chain().focus().setLink({ href: url }).run()
  }

  return (
    <div className="flex flex-wrap gap-2 p-3 border-b border-slate-200 bg-slate-50 rounded-t-xl sticky top-0 z-10">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-white transition-all ${editor.isActive('bold') ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-600'}`}
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-white transition-all ${editor.isActive('italic') ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-600'}`}
      >
        <Italic size={18} />
      </button>
      <div className="w-px h-6 bg-slate-200 mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-white transition-all ${editor.isActive('heading', { level: 1 }) ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-600'}`}
      >
        <Heading1 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-white transition-all ${editor.isActive('heading', { level: 2 }) ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-600'}`}
      >
        <Heading2 size={18} />
      </button>
      <div className="w-px h-6 bg-slate-200 mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-white transition-all ${editor.isActive('bulletList') ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-600'}`}
      >
        <List size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-white transition-all ${editor.isActive('orderedList') ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-600'}`}
      >
        <ListOrdered size={18} />
      </button>
      <div className="w-px h-6 bg-slate-200 mx-1" />
      <button
        type="button"
        onClick={addLink}
        className={`p-2 rounded hover:bg-white transition-all ${editor.isActive('link') ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-600'}`}
      >
        <LinkIcon size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded hover:bg-white transition-all ${editor.isActive('blockquote') ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-600'}`}
      >
        <Quote size={18} />
      </button>
      <div className="w-px h-6 bg-slate-200 mx-1 flex-grow" />
      <button type="button" onClick={() => editor.chain().focus().undo().run()} className="p-2 text-slate-400 hover:text-slate-600"><Undo size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()} className="p-2 text-slate-400 hover:text-slate-600"><Redo size={18} /></button>
    </div>
  )
}

export default function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-emerald max-w-none p-6 outline-none min-h-[300px] text-slate-900',
      },
    },
  })

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

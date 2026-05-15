"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Minus,
  RotateCcw,
  RotateCw,
  ImageIcon,
  Video,
  Loader2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
      title={title}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded text-sm transition-colors",
        active
          ? "bg-slate-900 text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        disabled && "cursor-not-allowed opacity-40",
      )}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Nhập nội dung bài viết...",
  disabled = false,
  className,
}: RichTextEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Placeholder.configure({ placeholder }),
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full rounded-lg my-4",
        },
      }),
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: "w-full rounded-lg my-4 aspect-video",
        },
      }),
    ],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] px-4 py-3 text-sm leading-relaxed focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL:", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  }, [editor]);

  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!editor) return;
      const form = new FormData();
      form.append("file", file);
      setUploadingImage(true);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: form });
        const body = await res.json();
        if (!res.ok) throw new Error(body.message ?? "Upload thất bại");
        editor.chain().focus().setImage({ src: body.url, alt: file.name }).run();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Upload ảnh thất bại");
      } finally {
        setUploadingImage(false);
      }
    },
    [editor],
  );

  const handleImageFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleImageUpload(file);
      e.target.value = "";
    },
    [handleImageUpload],
  );

  const insertYoutube = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Nhập URL YouTube hoặc Vimeo:");
    if (!url) return;
    editor.chain().focus().setYoutubeVideo({ src: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-input bg-background",
        disabled && "opacity-60",
        className,
      )}
    >
      {/* Hidden file input for image upload */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleImageFileChange}
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-slate-50 px-2 py-1.5">
        {/* Text style */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough className="h-3.5 w-3.5" />
        </ToolbarButton>

        <div className="mx-1 h-4 w-px bg-border" />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="h-3.5 w-3.5" />
        </ToolbarButton>

        <div className="mx-1 h-4 w-px bg-border" />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet list"
        >
          <List className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Ordered list"
        >
          <ListOrdered className="h-3.5 w-3.5" />
        </ToolbarButton>

        <div className="mx-1 h-4 w-px bg-border" />

        {/* Align */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          title="Align left"
        >
          <AlignLeft className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          title="Align center"
        >
          <AlignCenter className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          title="Align right"
        >
          <AlignRight className="h-3.5 w-3.5" />
        </ToolbarButton>

        <div className="mx-1 h-4 w-px bg-border" />

        {/* Link */}
        <ToolbarButton
          onClick={setLink}
          active={editor.isActive("link")}
          title="Insert link"
        >
          <Link2 className="h-3.5 w-3.5" />
        </ToolbarButton>

        {/* Divider */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal rule"
        >
          <Minus className="h-3.5 w-3.5" />
        </ToolbarButton>

        <div className="mx-1 h-4 w-px bg-border" />

        {/* Image upload */}
        <ToolbarButton
          onClick={() => imageInputRef.current?.click()}
          disabled={uploadingImage || disabled}
          title="Chèn ảnh (JPG/PNG/WebP/GIF, tối đa 10 MB)"
        >
          {uploadingImage ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <ImageIcon className="h-3.5 w-3.5" />
          )}
        </ToolbarButton>

        {/* YouTube / Video embed */}
        <ToolbarButton
          onClick={insertYoutube}
          disabled={disabled}
          title="Nhúng video YouTube / Vimeo"
        >
          <Video className="h-3.5 w-3.5" />
        </ToolbarButton>

        <div className="mx-1 h-4 w-px bg-border" />

        {/* Undo / Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <RotateCw className="h-3.5 w-3.5" />
        </ToolbarButton>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} className="prose-editor" />
    </div>
  );
}

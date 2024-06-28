import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import { Extension } from "@tiptap/core";

export const LiteralTab = Extension.create({
  name: "literalTab",

  addKeyboardShortcuts() {
    return {
      Tab: () => {
        return this.editor.commands.insertContent("\t");
      },
    };
  },
});

interface TiptapProps {
  value: string;
  onChange: (value: string) => void;
}

const Tiptap: React.FC<TiptapProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: "text-2xl",
            levels: "2",
          },
        },
        bold: {
          HTMLAttributes: {
            class: "font-bold",
          },
        },
        bulletList: {
          itemTypeName: "listItem",
          // keepMarks: true,
          // keepAttributes: true,
          HTMLAttributes: {
            class: "list-disc",
          },
        },
      }),
      LiteralTab,
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[100px] h-full border border-background/10 rounded-md p-2 text-white bg-[#222222]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="w-full h-full col-span-2">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;

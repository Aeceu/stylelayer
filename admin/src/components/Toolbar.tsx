import React from "react";
import { type Editor } from "@tiptap/react";
import { Bold, Strikethrough, Italic, List, ListOrdered, Heading2 } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  editor: Editor | null;
};

const Toolbar: React.FC<Props> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-2 my-2">
      <Button
        type="button"
        size={"icon"}
        className="bg-[#222222] border border-background/10"
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}>
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size={"icon"}
        className="bg-[#222222] border border-background/10"
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}>
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size={"icon"}
        className="bg-[#222222] border border-background/10"
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
        }}>
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size={"icon"}
        className="bg-[#222222] border border-background/10"
        onClick={() => {
          editor.chain().focus().toggleStrike().run();
        }}>
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size={"icon"}
        className="bg-[#222222] border border-background/10"
        onClick={() => {
          editor.chain().focus().toggleBulletList().run();
        }}>
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size={"icon"}
        className="bg-[#222222] border border-background/10"
        onClick={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}>
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Toolbar;

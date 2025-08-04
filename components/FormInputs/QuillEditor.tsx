"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import "react-quill/dist/quill.snow.css";

// ReactQuill को dynamically import करें ताकि SSR error न आए
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

interface QuillEditorProps {
  label?: string;
  value: string;
  onChangeAction: (value: string) => void;
}

export default function QuillEditor({
  label,
  value,
  onChangeAction,
}: QuillEditorProps) {
  const [mounted, setMounted] = useState(false);

  // Client-only rendering सुनिश्चित करने के लिए
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChangeAction}
        className="bg-white dark:bg-gray-900"
      />
    </div>
  );
}

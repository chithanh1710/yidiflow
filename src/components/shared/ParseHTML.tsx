"use client";
import Prism from "prismjs";
import { useEffect, useRef } from "react";

function wrapCodeInPre(content: string) {
  const div = document.createElement("div");
  div.innerHTML = content;

  const pres = div.querySelectorAll("pre.ql-syntax");
  pres.forEach((pre) => {
    const code = document.createElement("code");
    code.className = "language-javascript";
    code.innerHTML = pre.innerHTML;
    pre.innerHTML = "";
    pre.appendChild(code);
  });

  return div.innerHTML;
}

export default function ParseHTML({ content }: { content: string }) {
  const containerRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current) {
      const updatedContent = wrapCodeInPre(content);
      containerRef.current.innerHTML = updatedContent;
      Prism.highlightAll();
    }
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="markdown w-full min-w-full content-container"
    />
  );
}

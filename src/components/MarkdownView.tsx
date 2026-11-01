"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy } from "lucide-react";

interface MarkdownViewProps {
  content: string;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-all opacity-80 group-hover:opacity-100"
        title="전체 복사"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-600">복사됨!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>1초 복사</span>
          </>
        )}
      </button>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed overflow-x-auto">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ ...props }) => (
              <h1 className="text-xl font-bold text-slate-900 mt-4 mb-2 pb-1 border-b border-slate-200" {...props} />
            ),
            h2: ({ ...props }) => (
              <h2 className="text-lg font-bold text-slate-800 mt-3 mb-2" {...props} />
            ),
            h3: ({ ...props }) => (
              <h3 className="text-base font-semibold text-slate-800 mt-2 mb-1" {...props} />
            ),
            table: ({ ...props }) => (
              <div className="my-3 overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 text-left text-xs" {...props} />
              </div>
            ),
            thead: ({ ...props }) => <thead className="bg-slate-100 font-semibold text-slate-700" {...props} />,
            th: ({ ...props }) => <th className="px-3 py-2 border-b border-slate-200 font-medium" {...props} />,
            td: ({ ...props }) => <td className="px-3 py-2 border-b border-slate-100 text-slate-700" {...props} />,
            code: ({ className, children, ...props }) => {
              const isInline = !className;
              return isInline ? (
                <code className="px-1.5 py-0.5 rounded bg-slate-100 text-brand-700 font-mono text-xs font-semibold" {...props}>
                  {children}
                </code>
              ) : (
                <pre className="p-3 my-2 rounded-lg bg-slate-900 text-slate-100 overflow-x-auto text-xs font-mono">
                  <code {...props}>{children}</code>
                </pre>
              );
            },
            ul: ({ ...props }) => <ul className="list-disc list-inside space-y-1 my-2 text-slate-700" {...props} />,
            ol: ({ ...props }) => <ol className="list-decimal list-inside space-y-1 my-2 text-slate-700" {...props} />,
            li: ({ ...props }) => <li className="text-slate-700" {...props} />,
            blockquote: ({ ...props }) => (
              <blockquote className="border-l-4 border-brand-500 bg-brand-50/50 pl-3 py-1.5 my-2 text-slate-700 italic rounded-r" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

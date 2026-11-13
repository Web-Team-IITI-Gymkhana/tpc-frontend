import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownMessage({ text }: { text: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      skipHtml
      components={{
        h1: ({ children }) => (
          <h1 className="mb-3 mt-4 text-lg font-semibold first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-2 mt-4 text-base font-semibold first:mt-0">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 mt-3 text-sm font-semibold first:mt-0">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="my-2 leading-relaxed first:mt-0 last:mb-0">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>
        ),
        li: ({ children }) => <li className="pl-1">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="my-3 border-l-2 border-blue-400 pl-3 text-slate-600">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-4 border-slate-200" />,
        code: ({ children }) => (
          <code className="break-words rounded bg-slate-100 px-1 py-0.5 font-mono text-xs">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="my-2 overflow-x-auto rounded-lg bg-slate-100 p-2">
            {children}
          </pre>
        ),
        table: ({ children }) => (
          <div className="my-3 max-w-full overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-xs">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-slate-200 bg-slate-100 px-2 py-1.5 font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-slate-200 px-2 py-1.5 align-top">
            {children}
          </td>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            {children}
          </a>
        ),
        img: () => null,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

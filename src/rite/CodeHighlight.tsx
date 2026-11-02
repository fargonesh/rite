import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cx } from '../lib/cx.ts';

export interface CodeHighlightProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  maxHeight?: number | string;
}

type TokenKind = 'plain' | 'comment' | 'string' | 'keyword' | 'number';

interface Token {
  text: string;
  kind: TokenKind;
}

const KEYWORDS =
  'const|let|var|function|return|import|from|export|default|if|else|for|while|do|switch|case|break|continue|type|interface|extends|implements|new|class|typeof|in|of|as|async|await|try|catch|finally|throw|enum|namespace|declare|readonly|public|private|protected|static|void|null|undefined|true|false|this';

const TOKEN_RE = new RegExp(
  `(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)` +
    `|('(?:[^'\\\\\\n]|\\\\.)*'|"(?:[^"\\\\\\n]|\\\\.)*"|\`(?:[^\`\\\\]|\\\\.)*\`)` +
    `|(\\b\\d[\\d_]*(?:\\.\\d+)?\\b)` +
    `|(\\b(?:${KEYWORDS})\\b)`,
  'g',
);

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  TOKEN_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TOKEN_RE.exec(code)) !== null) {
    if (m.index > last) {
      tokens.push({ text: code.slice(last, m.index), kind: 'plain' });
    }
    const kind: TokenKind = m[1] ? 'comment' : m[2] ? 'string' : m[3] ? 'number' : 'keyword';
    tokens.push({ text: m[0], kind });
    last = m.index + m[0].length;
  }
  if (last < code.length) {
    tokens.push({ text: code.slice(last), kind: 'plain' });
  }
  return tokens;
}

function splitLines(tokens: Token[]): Token[][] {
  const lines: Token[][] = [[]];
  for (const t of tokens) {
    const parts = t.text.split('\n');
    parts.forEach((part, i) => {
      if (i > 0) lines.push([]);
      if (part.length > 0) lines[lines.length - 1].push({ text: part, kind: t.kind });
    });
  }
  return lines;
}

const TOKEN_CLASS: Record<TokenKind, string> = {
  plain: 'text-[#e9e7e2]',
  comment: 'text-white/30',
  string: 'text-white/65',
  keyword: 'text-white font-medium',
  number: 'text-white/90',
};

export function CodeHighlight({ code, language, showLineNumbers = false, maxHeight }: CodeHighlightProps) {
  const [copied, setCopied] = useState(false);
  const lines = splitLines(tokenize(code));

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="overflow-hidden rounded-[2px] border border-[#0a0a0b]/20 bg-black dark:border-white/15">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
          {language ?? 'code'}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50 transition-colors hover:text-white"
        >
          {copied ? (
            <Check size={12} className="text-[#d42b1e]" aria-hidden />
          ) : (
            <Copy size={12} aria-hidden />
          )}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre
        className="overflow-auto px-3 py-3"
        style={maxHeight !== undefined ? { maxHeight } : undefined}
      >
        <code className="block font-mono text-[12px] leading-relaxed">
          {lines.map((lineTokens, i) => (
            <span key={i} className="flex">
              {showLineNumbers && (
                <span
                  aria-hidden
                  className="w-8 shrink-0 select-none pr-3 text-right text-white/25"
                >
                  {i + 1}
                </span>
              )}
              <span className="flex-1 whitespace-pre">
                {lineTokens.length === 0 ? (
                  ' '
                ) : (
                  lineTokens.map((t, j) => (
                    <span key={j} className={cx(TOKEN_CLASS[t.kind])}>
                      {t.text}
                    </span>
                  ))
                )}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function CodeHighlightDemo() {
  return (
    <div className="w-full max-w-lg">
      <CodeHighlight
        language="tsx"
        showLineNumbers
        maxHeight={220}
        code={`import { sigil } from "./vesper";\n\nconst dossier = "VESPER"; // blood-red file\nconst count = 42;\n\nexport function build(input: string) {\n  if (!input) return null;\n  return \`\${dossier}:\${input}\`;\n}`}
      />
    </div>
  );
}

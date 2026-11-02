import type { ReactNode } from 'react';

export interface ExampleSection {
  id: string;
  title: string;
  blurb: string;
  components: string[];
  /** Concise tsx usage snippet — shown in CodeHighlight, copied by CopyButton. */
  code: string;
  render: () => ReactNode;
}

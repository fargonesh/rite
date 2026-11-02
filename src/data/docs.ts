import { docs1 } from './docs-1.ts';
import { docs2 } from './docs-2.ts';
import { docs3 } from './docs-3.ts';
import { docs4 } from './docs-4.ts';
import { docs5 } from './docs-5.ts';
import { docs6 } from './docs-6.ts';
import { docs7 } from './docs-7.ts';
import { docs8 } from './docs-8.ts';
import { docs9 } from './docs-9.ts';
import { docs10 } from './docs-10.ts';
import { docs11 } from './docs-11.ts';
import { docs12 } from './docs-12.ts';
import { docs13 } from './docs-13.ts';

export interface PropDoc {
  name: string;
  type: string;
  default?: string;
  notes?: string;
}

export interface DocEntry {
  usage: string;
  props: PropDoc[];
}

export const DOCS: Record<string, DocEntry> = Object.assign(
  {},
  docs1,
  docs2,
  docs3,
  docs4,
  docs5,
  docs6,
  docs7,
  docs8,
  docs9,
  docs10,
  docs11,
  docs12,
  docs13,
);

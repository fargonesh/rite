# rite

`rite` — React component library. 179 components in a single package.

Single flat package — 179 components, one import:

```ts
import { Button, Card, DatePicker, LineChart, Schedule } from '@fargone/rite';
```

Categories organize components for browsing; they are not separate packages.

## Install

```bash
npm install @fargone/rite react react-dom
```

React and React DOM are peer dependencies. Components use inline styles and do not
require importing a library stylesheet.

```tsx
import { Button, Card } from '@fargone/rite';

export function Example() {
  return <Card><Button>Save</Button></Card>;
}
```

Each component page includes a live preview, usage example, and props table.

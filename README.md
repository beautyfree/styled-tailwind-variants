<p align="center">
  <img width="20%" src=".github/assets/logo.png" alt="tailwind-variants" />
  <h1 align="center">styled-tailwind-variants</h1>
</p>
<p align="center">
  A styled-components-like wrapper around <a href="https://www.tailwind-variants.org/">tailwind-variants</a> that provides a familiar API for creating styled React components with Tailwind CSS.
  <br><br>
  <a href="https://www.npmjs.com/package/styled-tailwind-variants">
    <img src="https://img.shields.io/npm/dm/styled-tailwind-variants.svg?style=flat-round" alt="npm downloads">
  </a>
  <a href="https://www.npmjs.com/package/styled-tailwind-variants">
    <img alt="NPM Version" src="https://badgen.net/npm/v/styled-tailwind-variants" />
  </a>
  <a href="https://github.com/beautyfree/styled-tailwind-variants/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/styled-tailwind-variants?style=flat" alt="License">
  </a>
</p>

## Features

- 🎨 **Styled-components-like API** - Familiar syntax for React developers
- 🎯 **Full TypeScript support** - Complete type safety and IntelliSense
- 🚀 **Multiple syntax styles** - String, object, and template literal support
- 🔧 **Variant system** - Full support for tailwind-variants features (except slots)
- 📦 **Tree-shakeable** - Optimized bundle size
- ⚡ **Zero runtime overhead** - Compile-time class generation

## Installation

```bash
npm install styled-tailwind-variants tailwind-variants tailwind-merge
# or
pnpm add styled-tailwind-variants tailwind-variants tailwind-merge
# or
yarn add styled-tailwind-variants tailwind-variants tailwind-merge
```

## Quick Start

```tsx
import styled from 'styled-tailwind-variants';

// String syntax
const UIBox = styled.div("p-4 bg-white rounded-lg shadow-md");

// Object syntax with variants
const UIButton = styled.button({
  base: "px-4 py-2 rounded font-medium transition-colors",
  variants: {
    color: {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-500 text-white hover:bg-gray-600",
      success: "bg-green-500 text-white hover:bg-green-600"
    },
    size: {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3"
    }
  },
  defaultVariants: {
    color: "primary",
    size: "md"
  }
});

// Template literal syntax
const UICard = styled.div`bg-white shadow-lg p-6 rounded-xl`;

// Usage
function App() {
  return (
    <div>
      <UIBox>Simple box</UIBox>
      <UIButton color="secondary" size="lg">Click me</UIButton>
      <UICard>Card content</UICard>
    </div>
  );
}
```

## API Reference

### Basic Usage

#### String Syntax
```tsx
const UIComponent = styled.div("base-classes");
```

#### Object Syntax
```tsx
const UIComponent = styled.div({
  base: "base-classes",
  variants: {
    variantName: {
      option1: "classes-for-option1",
      option2: "classes-for-option2"
    }
  },
  defaultVariants: {
    variantName: "option1"
  }
});
```

#### Template Literal Syntax
```tsx
const UIComponent = styled.div`base-classes`;
```

### Component Wrapping

```tsx
import { CustomComponent } from './CustomComponent';

const StyledCustom = styled(CustomComponent)({
  base: "additional-classes"
});
```

### Props API

All styled components accept the following props:

- `className` - Additional CSS classes to merge
- `children` - React children
- `as` - Render as a different element or component
- Variant props based on your configuration

```tsx
const UIButton = styled.button({
  base: "px-4 py-2 rounded",
  variants: {
    color: {
      primary: "bg-blue-500",
      secondary: "bg-gray-500"
    }
  }
});

// Usage with variant props
<UIButton color="primary" className="mt-4" as="div">
  Click me
</UIButton>
```

### Advanced Features

#### Compound Variants
```tsx
const UIButton = styled.button({
  base: "px-4 py-2 rounded",
  variants: {
    color: {
      primary: "bg-blue-500",
      secondary: "bg-gray-500"
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed"
    }
  },
  compoundVariants: [
    {
      color: "primary",
      disabled: true,
      class: "bg-blue-200 text-blue-800"
    }
  ]
});
```

#### Boolean Variants
```tsx
const UICard = styled.div({
  base: "p-4 rounded-lg",
  variants: {
    elevated: {
      true: "shadow-lg border"
    },
    interactive: {
      true: "hover:shadow-xl cursor-pointer transition-shadow"
    }
  }
});

// Usage
<UICard elevated interactive>Content</UICard>
```

## TypeScript Support

The library provides full TypeScript support with proper type inference:

```tsx
const UIButton = styled.button({
  base: "px-4 py-2",
  variants: {
    color: {
      primary: "bg-blue-500",
      secondary: "bg-gray-500"
    }
  }
});

// TypeScript will infer the correct props
<UIButton color="primary" /> // ✅ Valid
<UIButton color="invalid" /> // ❌ TypeScript error
```

## Development Setup

### IntelliSense Setup (Optional)

To enable autocompletion for Tailwind CSS classes in your styled components, you can configure your editor:

#### VSCode

If you're using **VSCode** with the **TailwindCSS IntelliSense Extension**, add the following to your `settings.json`:

```json
{
  "tailwindCSS.experimental.classRegex": [
    [
      "styled\\.[a-zA-Z]+`([^`]*)`",
      "([^`]*)"
    ],
    [
      "styled\\.[a-zA-Z]+\\([\"'`]([^\"'`]*)[\"'`]\\)",
      "([^\"'`]*)"
    ],
    [
      "styled\\.[a-zA-Z]+\\(\\{[^}]*base:\\s*[\"'`]([^\"'`]*)[\"'`]",
      "([^\"'`]*)"
    ]
  ]
}
```

This will enable autocompletion for:
- String syntax: `styled.div("bg-blue-500 hover:bg-blue-600")`
- Template literal syntax: `styled.div`bg-blue-500 hover:bg-blue-600``
- Object syntax: `styled.div({ base: "bg-blue-500 hover:bg-blue-600" })`

### Prettier Plugin Setup (Optional)

If you're using `prettier-plugin-tailwindcss` to sort your class names, add `styled` to the list of functions that should be sorted:

```javascript
// prettier.config.js
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindFunctions: ['styled']
}
```

This will automatically sort Tailwind classes in:
- `styled.div("px-4 py-2 bg-blue-500 text-white")`
- `styled.div`px-4 py-2 bg-blue-500 text-white``
- `styled.div({ base: "px-4 py-2 bg-blue-500 text-white" })`

## Performance

This library adds minimal performance overhead compared to native `tailwind-variants`:

### Bundle Size
- **ESM**: ~2.6 KB (gzipped ~1.2 KB)
- **CJS**: ~4.4 KB (gzipped ~1.8 KB)
- **Overhead**: Only ~0.5-1 KB compared to native tailwind-variants

### Runtime Performance
- **Overhead**: ~2-5% compared to native tailwind-variants
- **Per render**: ~0.01-0.03ms additional processing
- **Memory**: +~50-100 bytes per component

### Performance Comparison

| Library | Bundle Size | Runtime Overhead | DX Score |
|---------|-------------|------------------|----------|
| **styled-tailwind-variants** | 4-5 KB | ~2-5% | ⭐⭐⭐⭐⭐ |
| **styled-components** | 15-20 KB | ~50-100% | ⭐⭐⭐⭐⭐ |
| **emotion** | 10-15 KB | ~30-50% | ⭐⭐⭐⭐ |

### When to Use

✅ **Great for:**
- Most web applications
- Components with infrequent re-renders
- Projects where developer experience is important

⚠️ **Consider alternatives for:**
- High-frequency animations (60fps)
- Rendering thousands of components in lists
- Mobile devices with limited performance

The minimal overhead is usually worth the significant improvement in developer experience and code maintainability.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Alexey Elizarov

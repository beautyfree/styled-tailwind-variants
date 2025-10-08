import { ComponentType, ReactNode } from 'react'

// Import types directly from tailwind-variants
import type {
  ClassValue,
  OmitUndefined,
  StringToBoolean,
  TV,
  TVVariants,
  TVCompoundVariants,
  TVDefaultVariants,
  TVProps,
  TVReturnType,
  VariantProps as TVVariantProps,
} from 'tailwind-variants'

// Re-export the imported types
export type {
  ClassValue,
  OmitUndefined,
  StringToBoolean,
  TV,
  TVVariants,
  TVCompoundVariants,
  TVDefaultVariants,
  TVProps,
  TVReturnType,
  TVVariantProps,
}

// Use official config type for full compatibility including slots
export type TVConfig = Omit<Parameters<TV>[0], 'slots' | 'compoundSlots'>

// Create props type from variants using our own implementation
export type VariantProps<T extends TVConfig> = T extends { variants: infer V }
  ? V extends Record<string, any>
    ? {
        [K in keyof V]?: StringToBoolean<keyof V[K]> | undefined
      }
    : {}
  : {}

// Extract variant keys (for backwards compatibility)
export type VariantKeys<T extends TVConfig> = T extends { variants: infer V }
  ? V extends Record<string, any>
    ? keyof V
    : never
  : never

// Extract variant values for a specific key (for backwards compatibility)
export type VariantValues<
  T extends TVConfig,
  K extends VariantKeys<T>
> = T extends { variants: infer V }
  ? V extends Record<string, any>
    ? K extends keyof V
      ? V[K] extends Record<string, any>
        ? keyof V[K]
        : never
      : never
    : never
  : never

// Base props for styled components
export interface StyledComponentProps {
  className?: string
  children?: ReactNode
  as?: keyof JSX.IntrinsicElements | ComponentType<any>
}

// Styled component type
export type StyledComponent<TConfig extends TVConfig = TVConfig> =
  ComponentType<StyledComponentProps & VariantProps<TConfig> & any>

// Styled function that accepts template literals, objects, or strings
export type StyledFunction<TConfig extends TVConfig = TVConfig> = {
  (config: TConfig): StyledComponent<TConfig>
  (base: ClassValue): StyledComponent<{ base: ClassValue }>
  (strings: TemplateStringsArray, ...values: any[]): StyledComponent<{
    base: ClassValue
  }>
}

// HTML tag names
export type HTMLTags = keyof JSX.IntrinsicElements

// Styled tags interface
export type StyledTags = {
  [K in HTMLTags]: StyledFunction
}

// Main styled interface
export interface Styled extends StyledTags {
  <TComponent extends ComponentType<any>>(component: TComponent): StyledFunction
}

// Template literal parsing helper
export type TemplateLiteralConfig = {
  base: ClassValue
}

// Union of all possible config types
export type StyledConfig = TVConfig | string | TemplateStringsArray

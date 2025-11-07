import { ComponentType } from 'react'

import { TV, StringToBoolean, ClassValue } from 'tailwind-variants'

export type {
  ClassValue,
  OmitUndefined,
  StringToBoolean,
  TV,
  TVCompoundVariants,
  TVDefaultVariants,
  TVProps,
  TVReturnType,
  VariantProps as TVVariantProps,
  TVVariants,
} from 'tailwind-variants'

type TVConfig = Omit<Parameters<TV>[0], 'slots' | 'compoundSlots'>

type VariantProps<T extends TVConfig> = T extends {
  variants: infer V
}
  ? V extends Record<string, any>
    ? {
        [K in keyof V]?: StringToBoolean<keyof V[K]> | undefined
      }
    : {}
  : {}

type VariantKeys<T extends TVConfig> = T extends {
  variants: infer V
}
  ? V extends Record<string, any>
    ? keyof V
    : never
  : never

type VariantValues<T extends TVConfig, K extends VariantKeys<T>> = T extends {
  variants: infer V
}
  ? V extends Record<string, any>
    ? K extends keyof V
      ? V[K] extends Record<string, any>
        ? keyof V[K]
        : never
      : never
    : never
  : never

interface StyledComponentProps {
  className?: string

  as?: keyof JSX.IntrinsicElements | ComponentType<any>
}

type KnownTarget = keyof JSX.IntrinsicElements | ComponentType<any>

type StyledComponent<
  Target extends KnownTarget,
  TConfig extends TVConfig = TVConfig
> = ComponentType<
  StyledComponentProps &
    VariantProps<TConfig> &
    (Target extends ComponentType<infer P>
      ? P
      : Target extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[Target]
      : {})
>

type StyledFunction<Target extends KnownTarget> = {
  (config: TVConfig): StyledComponent<Target, typeof config>

  (base: ClassValue): StyledComponent<Target, { base: ClassValue }>

  (strings: TemplateStringsArray, ...values: any[]): StyledComponent<
    Target,
    { base: ClassValue }
  >
}

type HTMLTags = keyof JSX.IntrinsicElements

type StyledTags = {
  [K in HTMLTags]: StyledFunction<K>
}

interface Styled extends StyledTags {
  <Target extends KnownTarget>(component: Target): StyledFunction<Target>
}

declare function createStyled(): Styled

declare const styled: Styled

export {
  type HTMLTags,
  type KnownTarget,
  type Styled,
  type StyledComponent,
  type StyledComponentProps,
  type StyledFunction,
  type StyledTags,
  type TVConfig,
  type VariantKeys,
  type VariantProps,
  type VariantValues,
  createStyled,
  styled as default,
  styled,
}

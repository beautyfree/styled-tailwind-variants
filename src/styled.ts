import React, { ComponentType, forwardRef } from 'react'
import { tv } from 'tailwind-variants'
import { clsx } from 'clsx'
import type {
  Styled,
  StyledFunction,
  StyledComponent,
  StyledComponentProps,
  TVConfig,
  HTMLTags,
} from './types'

// Parse template literal to extract base classes
function parseTemplateLiteral(
  strings: TemplateStringsArray,
  values: any[]
): string {
  return strings.reduce((result, string, i) => {
    const value = values[i] || ''
    return result + string + value
  }, '')
}

// Create a styled component factory
function createStyledComponent<TConfig extends Omit<TVConfig, 'slots'>>(
  config: TConfig,
  element: keyof JSX.IntrinsicElements | ComponentType<any>
): StyledComponent<TConfig> {
  const tvFunction = tv(config)

  return forwardRef<any, StyledComponentProps & any>((props, ref) => {
    const { className, children, as, ...restProps } = props

    // Extract variant props
    const variantProps: Record<string, any> = {}
    const elementProps: Record<string, any> = {}

    // Get variant keys from the config
    const variantKeys = config.variants ? Object.keys(config.variants) : []

    // Separate variant props from element props
    Object.entries(restProps).forEach(([key, value]) => {
      if (variantKeys.includes(key)) {
        variantProps[key] = value
      } else {
        elementProps[key] = value
      }
    })

    // Generate classes using tailwind-variants
    const generatedClasses = tvFunction(variantProps)

    // Merge with className prop
    const finalClassName = clsx(generatedClasses, className)

    // Determine the element to render
    const Element = as || element

    // Handle both HTML elements and React components
    if (typeof Element === 'string') {
      return React.createElement(
        Element,
        {
          ref,
          className: finalClassName,
          ...elementProps,
        },
        children
      )
    } else {
      return React.createElement(
        Element,
        {
          ref,
          className: finalClassName,
          ...elementProps,
        },
        children
      )
    }
  }) as StyledComponent<TConfig>
}

// Create styled function for a specific element
function createStyledFunction<
  TElement extends keyof JSX.IntrinsicElements | ComponentType<any>
>(element: TElement): StyledFunction {
  return function styledFunction(configOrStrings: any, ...values: any[]) {
    // Handle different input types
    let tvConfig: TVConfig

    if (typeof configOrStrings === 'string') {
      // String syntax: "bg-blue-500 p-4"
      tvConfig = { base: configOrStrings }
    } else if (Array.isArray(configOrStrings) && 'raw' in configOrStrings) {
      // Template literal syntax: styled.div`bg-blue-500`
      const base = parseTemplateLiteral(
        configOrStrings as TemplateStringsArray,
        values
      )
      tvConfig = { base }
    } else if (configOrStrings && typeof configOrStrings === 'object') {
      // Object syntax: { base: "...", variants: {...} }
      tvConfig = configOrStrings
    } else {
      throw new Error('Invalid configuration provided to styled function')
    }

    return createStyledComponent(tvConfig, element)
  } as StyledFunction
}

// Create the main styled factory
export function createStyled(): Styled {
  const styled = function <TComponent extends ComponentType<any>>(
    component: TComponent
  ): StyledFunction {
    return createStyledFunction(component)
  } as Styled

  // Create proxy to intercept HTML tag access
  return new Proxy(styled, {
    get(target, prop) {
      if (typeof prop === 'string' && prop in target) {
        return target[prop as keyof Styled]
      }

      // Check if it's an HTML tag
      if (typeof prop === 'string') {
        return createStyledFunction(prop as HTMLTags)
      }

      return undefined
    },
  }) as Styled
}

// Export the default styled instance
export const styled = createStyled()

import { FrontJCreateElementOptions, FrontJElement } from '../types'
import { defaultCreateElementOptions } from '../constants'
import { createAttrString, hasOwnProperty, isArray } from '../functions'

export function createElement (
  name: string,
  createElementOptions: FrontJCreateElementOptions = defaultCreateElementOptions
): FrontJElement {
  function ret (...contents: (string | number)[]): string
  function ret (strings: TemplateStringsArray, ...values: (string | number)[]): (...contents: (string | number)[]) => string;
  function ret (...contents: unknown[]) {
    // contents[0]がTemplateStringsArrayの場合
    if (isArray(contents[0]) && hasOwnProperty(contents[0], 'raw')) {
      const [strings, ...values] = (contents as [TemplateStringsArray, ...(string | number)[]])
      // 入力されたstringsやvaluesを一つの文字列に結合
      const input = strings.reduce((prev, current, index) => {
        return prev + current + (values[index] ? values[index] : '')
      }, '')
      const attrs = input === '' ? '' : ` ${createAttrString(input)}`

      return (...contents: (string | number)[]) => {
        if (createElementOptions.children) {
          const content = contents.length ? contents.join('') : ''
          // children: trueの場合は閉じタグあり、そうでない場合は閉じタグなし
          return `${name === 'html' ? '<!DOCTYPE html>' : ''}<${name}${attrs}>${content}</${name}>`
        } else {
          return `<${name}${attrs}>`
        }
      }
    }

    if (createElementOptions.children) {
      const content = contents.length ? contents.join('') : ''
      // children: trueの場合は閉じタグあり、そうでない場合は閉じタグなし
      return `${name === 'html' ? '<!DOCTYPE html>' : ''}<${name}>${content}</${name}>`
    } else {
      return `<${name}>`
    }
  }

  return ret
}

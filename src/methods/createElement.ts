import { FrontJCreateElementOptions, FrontJElement } from '../types'
import { defaultCreateElementOptions } from '../constants'
import { createAttrString, isArrayOfTagFunctionArguments } from '../functions'

export function createElement (
  name: string,
  createElementOptions: FrontJCreateElementOptions = defaultCreateElementOptions
): FrontJElement {
  function ret (...contents: (string | number)[]): string
  function ret (strings: TemplateStringsArray, ...values: (string | number)[]): (...contents: (string | number)[]) => string;
  function ret (...contents: [TemplateStringsArray, ...(string | number)[]] | (string | number)[]) {
    // contentsがタグ関数の引数の配列の場合
    if (isArrayOfTagFunctionArguments(contents)) {
      const [strings, ...values] = contents
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

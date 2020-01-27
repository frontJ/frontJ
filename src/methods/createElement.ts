import { FrontJCreateElementOptions, FrontJElement } from '../types'
import { defaultCreateElementOptions } from '../constants'
import { createAttrString } from '../functions'

export function createElement (
  name: string,
  createElementOptions: FrontJCreateElementOptions = defaultCreateElementOptions
): FrontJElement {
  const ret: FrontJElement = (...contents) => {
    if (createElementOptions.children) {
      const content = contents.length ? contents.join('') : ''
      // children: trueの場合は閉じタグあり、そうでない場合は閉じタグなし
      return `${name === 'html' ? '<!DOCTYPE html>' : ''}<${name}>${content}</${name}>`
    } else {
      return `<${name}>`
    }
  }

  ret.$ = (strings, ...values) => {
    // 入力されたstringsやvaluesを一つの文字列に結合
    const input = strings.reduce((prev, current, index) => {
      return prev + current + (values[index] ? values[index] : '')
    }, '')
    const attrs = input === '' ? '' : ` ${createAttrString(input)}`

    return (...contents) => {
      if (createElementOptions.children) {
        const content = contents.length ? contents.join('') : ''
        // children: trueの場合は閉じタグあり、そうでない場合は閉じタグなし
        return `${name === 'html' ? '<!DOCTYPE html>' : ''}<${name}${attrs}>${content}</${name}>`
      } else {
        return `<${name}${attrs}>`
      }
    }
  }

  return ret
}

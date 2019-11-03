import { FrontJCreateElementOptions, FrontJElement } from '../types'
import { defaultCreateElementOptions } from '../constants'
import { createAttrString } from '../functions'

export function createElement (
  name: string,
  createElementOptions: FrontJCreateElementOptions = defaultCreateElementOptions
): FrontJElement {
  return (optionsOrContent, ...contents) => {
    // optionsOrContentにオプションが渡された場合
    if (
      typeof optionsOrContent === 'object' &&
      optionsOrContent !== null &&
      !Array.isArray(optionsOrContent)
    ) {
      const options = optionsOrContent
      const attrString = createAttrString(options && options.attrs)

      // children: trueの場合は子要素あり、そうでない場合は子要素なし(入力しても無視)かつ閉じタグなし
      if (createElementOptions.children) {
        const content = contents.join('')
        return `${name === 'html' ? '<!DOCTYPE html>' : ''}<${name}${attrString ? ` ${attrString}` : ''}>${content}</${name}>`
      } else {
        return `<${name}${attrString ? ` ${attrString}` : ''}>`
      }
    }

    // optionsOrContentに文字列が渡された場合
    if (typeof optionsOrContent === 'string') {
      // children: trueの場合は子要素あり、そうでない場合は子要素なし(入力しても無視)かつ閉じタグなし
      if (createElementOptions.children) {
        const content = optionsOrContent + contents.join('')
        return `${name === 'html' ? '<!DOCTYPE html>' : ''}<${name}>${content}</${name}>`
      } else {
        return `<${name}>`
      }
    }

    // 何も渡されなかった場合
    if (createElementOptions.children) {
      // children: trueの場合は閉じタグあり、そうでない場合は閉じタグなし
      return `${name === 'html' ? '<!DOCTYPE html>' : ''}<${name}></${name}>`
    } else {
      return `<${name}>`
    }
  }
}

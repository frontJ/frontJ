import { FrontJCreateElementOptions, FrontJElement } from '../types'
import { defaultCreateElementOptions } from '../constants'
import { createAttrString, isFrontJElementOptions, isString, isTemplateStringsArray } from '../functions'

export function createElement (
  name: string,
  createElementOptions: FrontJCreateElementOptions = defaultCreateElementOptions
): FrontJElement {
  const _FrontJElement: FrontJElement = (optionsOrContent, ...contents) => {
    // テンプレート文字列が渡された場合
    if (isTemplateStringsArray(optionsOrContent)) {
      const attrs = optionsOrContent.reduce((p, c, i) => p + c + (contents[i] ?? ''), '')
      return (_optionsOrContent, ..._contents) => {
        if (isFrontJElementOptions(_optionsOrContent)) {
          return _FrontJElement({ attrs, ..._optionsOrContent }, ..._contents)
        }
        return _FrontJElement({ attrs: attrs }, _optionsOrContent, ..._contents)
      }
    }

    // optionsOrContentにオプションが渡された場合
    if (isFrontJElementOptions(optionsOrContent)) {
      const options = optionsOrContent
      const attrString = createAttrString(options?.attrs)

      // children: trueの場合は子要素あり、そうでない場合は子要素なし(入力しても無視)かつ閉じタグなし
      if (createElementOptions.children) {
        const content = contents.join('')
        return `${name === 'html' ? '<!DOCTYPE html>' : ''}<${name}${attrString ? ` ${attrString}` : ''}>${content}</${name}>`
      } else {
        return `<${name}${attrString ? ` ${attrString}` : ''}>`
      }
    }

    // optionsOrContentに文字列が渡された場合
    if (isString(optionsOrContent)) {
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

  return _FrontJElement
}

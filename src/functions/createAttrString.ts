import { FrontJAttrsObject } from '../types'

export function createAttrString (attrs: FrontJAttrsObject = {}): string {
  const attrNames = Object.keys(attrs)

  if (attrNames.length === 0) return ''

  return attrNames.map((attrName) => {
    // attrs[attrName]だと型推論が効かなかったので一旦代入する
    const _attrValue = attrs[attrName]
    let attrValue: string

    // 属性の値が空文字の場合は属性名のみ返す(checked属性などを想定)
    if (_attrValue === '') {
      return `${attrName}`
    }

    if (Array.isArray(_attrValue)) {
      // 属性の値が空配列の場合も属性名のみ返す
      if (_attrValue.length === 0) {
        return `${attrName}`
      }
      attrValue = _attrValue.join(' ')
    } else {
      attrValue = _attrValue
    }

    return `${attrName}="${attrValue}"`
  }).join(' ')
}

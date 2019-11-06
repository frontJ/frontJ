import { FrontJAttrsObject, FrontJElementOptions } from '../types'
import { getAttrValuesFromFrontJCssSelector, isFrontJAttrsObject, isString } from './index'

export function createAttrString (attrs: FrontJElementOptions['attrs'] = {}): string {
  if (isFrontJAttrsObject(attrs)) {
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

  if (isString(attrs)) {
    const _attrs: FrontJAttrsObject = {}
    const idNames = getAttrValuesFromFrontJCssSelector('id', attrs)
    const classNames = getAttrValuesFromFrontJCssSelector('class', attrs)
    if (idNames.length !== 0) {
      _attrs.id = idNames
    }
    if (classNames.length !== 0) {
      _attrs.class = classNames
    }

    const attrNames = Object.keys(_attrs)

    return attrNames.map((attrName) => {
      // attrs[attrName]はここではstring[]型の値しかとらない(string型はとらない)
      const attrValue = (_attrs[attrName] as string[]).join(' ')
      if (attrValue.length !== 0) {
        return `${attrName}="${attrValue}"`
      } else {
        return ''
      }
    }).join(' ')
  }

  return ''
}

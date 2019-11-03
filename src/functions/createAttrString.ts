import { FrontJAttrsObject } from '../types'

export function createAttrString (attrs: FrontJAttrsObject = {}): string {
  const attrNames = Object.keys(attrs)

  if (attrNames.length === 0) return ''

  return attrNames.map((attrName) => {
    // attrs[attrName]だと型推論が効かなかったので一旦代入する
    const _attrValue = attrs[attrName]
    const attrValue = Array.isArray(_attrValue) ? _attrValue.join(' ') : _attrValue
    return `${attrName}="${attrValue}"`
  }).join(' ')
}

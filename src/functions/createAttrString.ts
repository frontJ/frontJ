import { FrontJAttrsObject } from '../types'
import {
  hasOwnProperty,
  isNull
} from './index'

// createAttrString()のreturn部分
function fromObject (attrs: FrontJAttrsObject): string {
  const attrNames = Object.keys(attrs)

  return attrNames.map((attrName) => {
    const _attrValues = attrs[attrName]

    // 属性の値が空配列の場合属性名のみ返す
    if (_attrValues.length === 0) {
      return `${attrName}`
    }
    const attrValue = _attrValues.join(' ')

    return `${attrName}="${attrValue}"`
  }).join(' ')
}

export function createAttrString (selector: string): string {
  const _attrs: FrontJAttrsObject = {}
  const attrRegExp = /\[.*?\](?=(\[|#|\.|$))/g

  // 属性値([])があれば先に取得し、元の文字列から取り除く
  const attrMatches = selector.match(attrRegExp)
  const _selector = selector.replace(attrRegExp, '')

  // 属性値([])があれば_attrsにセット
  if (!isNull(attrMatches)) {
    attrMatches.forEach((attr) => {
      const attrValueMatches = attr.match(/(?<=(=")).*(?=")/g)

      let attrName: string
      // nullにはなりえないのでstring[]型に変換
      if (!isNull(attrValueMatches)) {
        // 属性名と値がある場合
        attrName = (attr.match(/(?<=(\[)).*(?==")/g) as string[])[0]
      } else {
        // 属性名のみの場合
        attrName = (attr.match(/(?<=(\[)).*(?=\])/g) as string[])[0]
      }

      if (!hasOwnProperty(_attrs, attrName)) {
        _attrs[attrName] = attrValueMatches ?? []
      } else {
        _attrs[attrName].push(...(attrValueMatches ?? []))
      }
    })
  }

  // idを取得
  const idValueMatches = _selector.match(/(?<=#)[^#.]*/g)

  // classを取得
  const classValueMatches = _selector.match(/(?<=\.)[^#.]*/g)

  // idValueMatchesがnullでなければ_attrsにidをセット
  if (!isNull(idValueMatches)) {
    if (!hasOwnProperty(_attrs, 'id')) {
      _attrs.id = idValueMatches
    } else {
      _attrs.id.push(...idValueMatches)
    }
  }

  // classValueMatchesがnullでなければ_attrsにclassをセット
  if (!isNull(classValueMatches)) {
    if (!hasOwnProperty(_attrs, 'class')) {
      _attrs.class = classValueMatches
    } else {
      _attrs.class.push(...classValueMatches)
    }
  }

  return fromObject(_attrs)
}

import { FrontJAttrsObject } from '../types'
import {
  hasOwnProperty,
  isArray,
  isNull
} from './index'

// createAttrString()のreturn部分
function fromObject (attrs: FrontJAttrsObject): string {
  const attrNames = Object.keys(attrs)

  if (attrNames.length === 0) return ''

  return attrNames.map((attrName) => {
    const _attrValue = attrs[attrName]
    let attrValue: string

    // 属性の値が空文字の場合は属性名のみ返す(checked属性などを想定)
    if (_attrValue === '') {
      return `${attrName}`
    }

    if (isArray(_attrValue)) {
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

export function createAttrString (attrs: string): string {
  const _attrs: FrontJAttrsObject = {}

  // 変数名を変更
  const selector = attrs

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
        // この属性名のプロパティが存在しなければ作成
        _attrs[attrName] = attrValueMatches ?? []
      } else if (!isNull(attrValueMatches)) {
        // この属性名のプロパティが既に存在していればpush
        // 前のif文で_attrs[attrName]はstring[]になっているのでasを使う
        (_attrs[attrName] as string[]).push(attrValueMatches[0])
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
      (_attrs.id as string[]).push(idValueMatches[0])
    }
  }

  // classValueMatchesがnullでなければ_attrsにclassをセット
  if (!isNull(classValueMatches)) {
    if (!hasOwnProperty(_attrs, 'class')) {
      _attrs.class = classValueMatches
    } else {
      (_attrs.class as string[]).push(classValueMatches[0])
    }
  }

  return fromObject(_attrs)
}

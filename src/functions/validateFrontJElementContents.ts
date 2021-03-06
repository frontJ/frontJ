import { isNumber, isString } from './index'

export function validateFrontJElementContents (contents: unknown[]) {
  // find()では「undefinedが見つかった場合」と「対象が見つからなかった場合」の返り値がどちらもundefinedとなるため、filter()のlengthを調べる
  if (contents.filter((content) => !isString(content) && !isNumber(content)).length) {
    throw new Error('contents are must be string or number.')
  }
}

export function validateFrontJElementContentsType (contents: unknown[]) {
  // find()では「undefinedが見つかった場合」と「対象が見つからなかった場合」の返り値がどちらもundefinedとなるため、filter()のlengthを調べる
  if (contents.filter((content) => typeof content !== 'string' && typeof content !== 'number').length) {
    throw new Error('Contents are must be string or number.')
  }
}

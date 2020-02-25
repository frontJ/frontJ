export function validateFrontJElementAttrsValuesType (values: unknown[]) {
  // find()では「undefinedが見つかった場合」と「対象が見つからなかった場合」の返り値がどちらもundefinedとなるため、filter()のlengthを調べる
  if (values.filter((value) => typeof value !== 'string' && typeof value !== 'number').length) {
    throw new Error('attrs values are must be string or number.')
  }
}

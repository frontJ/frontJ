export function _if (condition: boolean, value: string, elseValue = ''): string {
  if (condition) {
    return value
  } else {
    return elseValue
  }
}

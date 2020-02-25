import { isNull, isUndefined } from './index'

export function isNullable (arg: unknown): arg is null | undefined {
  return isNull(arg) || isUndefined(arg)
}

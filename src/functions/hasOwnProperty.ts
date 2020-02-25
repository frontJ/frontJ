import { isNullable } from './index'

export function hasOwnProperty (arg: unknown, property: string | number | symbol): boolean {
  return !isNullable(arg) && Object.hasOwnProperty.call(arg, property)
}

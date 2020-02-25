import { hasOwnProperty, isArray } from './index'

export function isArrayOfTagFunctionArguments <T> (arg: unknown): arg is [TemplateStringsArray, ...T[]] {
  return isArray(arg) && hasOwnProperty(arg[0], 'raw')
}

import { hasOwnProperty, isArray } from './index'

export function isTemplateStringsArray (arg: unknown): arg is TemplateStringsArray {
  return isArray(arg) && hasOwnProperty(arg, 'raw')
}

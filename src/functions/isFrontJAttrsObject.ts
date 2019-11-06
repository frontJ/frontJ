import { FrontJAttrsObject } from '../types'
import { isArray, isNull } from './index'

export function isFrontJAttrsObject (arg: unknown): arg is FrontJAttrsObject {
  return (typeof arg === 'object') &&
    (!isNull(arg)) &&
    (!isArray(arg))
}

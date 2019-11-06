import { FrontJElementOptions } from '../types'
import { isArray, isNull } from './index'

export function isFrontJElementOptions (arg: unknown): arg is FrontJElementOptions {
  return (typeof arg === 'object') &&
    (!isNull(arg)) &&
    (!isArray(arg))
}

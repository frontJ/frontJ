import { isBoolean, isNumber, isString } from './index'

export function validate$ifArguments (condition: unknown, value: unknown, elseValue: unknown) {
  if (!isBoolean(condition)) {
    throw new Error('condition is must be boolean.')
  }
  if (!isString(value) && !isNumber(value)) {
    throw new Error('value is must be string or number.')
  }
  if (!isString(elseValue) && !isNumber(elseValue)) {
    throw new Error('elseValue is must be string or number.')
  }
}

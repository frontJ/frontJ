import { validate$ifArgumentsType } from '../functions'

export function $if (condition: boolean, value: string | number, elseValue: string | number = ''): string | number {
  validate$ifArgumentsType(condition, value, elseValue)

  return condition ? value : elseValue
}

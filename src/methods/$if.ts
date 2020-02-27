import { validate$ifArguments } from '../functions'

export function $if (condition: boolean, value: string | number, elseValue: string | number = ''): string | number {
  validate$ifArguments(condition, value, elseValue)

  return condition ? value : elseValue
}

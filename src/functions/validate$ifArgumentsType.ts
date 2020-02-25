export function validate$ifArgumentsType (condition: unknown, value: unknown, elseValue: unknown) {
  if (typeof condition !== 'boolean') {
    throw new Error('condition is must be boolean.')
  }
  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new Error('value is must be string or number.')
  }
  if (typeof elseValue !== 'string' && typeof elseValue !== 'number') {
    throw new Error('elseValue is must be string or number.')
  }
}

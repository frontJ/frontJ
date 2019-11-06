export function isArray <T> (arg: unknown): arg is Array<T> {
  return Array.isArray(arg)
}

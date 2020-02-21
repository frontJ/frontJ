export function hasOwnProperty (arg: unknown, property: string | number | symbol): boolean {
  return Object.hasOwnProperty.call(arg, property)
}

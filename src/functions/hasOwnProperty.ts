export function hasOwnProperty (object: {}, property: string | number | symbol): boolean {
  return Object.hasOwnProperty.call(object, property)
}

export function getAttrValuesFromFrontJCssSelector (attrName: string, selector: string): string[] {
  if (attrName !== 'id' && attrName !== 'class') return []

  let identifier = ''

  if (attrName === 'id') {
    identifier = '#'
  } else if (attrName === 'class') {
    identifier = '\\.'
  }

  const pattern = `(?<=${identifier})[^#.]*`
  const regexp = new RegExp(pattern, 'g')
  const matches = selector.match(regexp)

  return matches !== null ? matches : []
}

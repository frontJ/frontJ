import { $if } from '../../methods'

describe('$if', () => {
  it('with `true`', () => {
    expect($if(true, 'value')).toBe('value')
    expect($if(true, 'value', 'elseValue')).toBe('value')
    expect($if(true, 1, 2)).toBe(1)
  })

  it('with `false`', () => {
    expect($if(false, 'value')).toBe('')
    expect($if(false, 'value', 'elseValue')).toBe('elseValue')
    expect($if(false, 1, 2)).toBe(2)
  })

  it('invalid condition', () => {
    expect(() => {
      $if((null as unknown as boolean), 'value', 'elseValue')
    }).toThrowError(new Error('condition is must be boolean.'))
  })

  it('invalid value', () => {
    expect(() => {
      $if(true, (null as unknown as string), 'elseValue')
    }).toThrowError(new Error('value is must be string or number.'))
  })

  it('invalid elseValue', () => {
    expect(() => {
      $if(false, 'value', (null as unknown as string))
    }).toThrowError(new Error('elseValue is must be string or number.'))
  })
})

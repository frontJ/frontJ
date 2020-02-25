import { createElement } from '../../methods'

describe('createElement', () => {
  const div = createElement('div')
  const br = createElement('br', { children: false })
  const html = createElement('html')

  it('`div` element', () => {
    expect(div()).toBe('<div></div>')
  })

  it('`div` element with contents', () => {
    expect(div('Hello', '!', 100)).toBe('<div>Hello!100</div>')
  })

  it('`div` element with invalid contents', () => {
    expect(() => {
      div((null as unknown as string))
    }).toThrowError(new Error('contents are must be string or number.'))
  })

  it('`div` element with attrs', () => {
    expect(div`.class`()).toBe('<div class="class"></div>')
    expect(div`.class1.class2`()).toBe('<div class="class1 class2"></div>')
    expect(div`#id`()).toBe('<div id="id"></div>')
    expect(div`#id1#id2`()).toBe('<div id="id1 id2"></div>')
    expect(div`[attr="content"]`()).toBe('<div attr="content"></div>')
    expect(div`[attr="content1"][attr="content2"]`()).toBe('<div attr="content1 content2"></div>')
    expect(div`[attr]`()).toBe('<div attr></div>')
    expect(div`[attr][attr]`()).toBe('<div attr></div>')
    expect(div`.class#id[attr1="content"][attr2]`()).toBe('<div attr1="content" attr2 id="id" class="class"></div>')
    expect(div`.class1.class2#id1#id2[class="class3"][id="id3"]`()).toBe('<div class="class3 class1 class2" id="id3 id1 id2"></div>')
  })

  it('`div` element with attrs using `${}`', () => {
    expect(div`.class#id[attr${1}="${'text'}"][attr2]`()).toBe('<div attr1="text" attr2 id="id" class="class"></div>')
  })

  it('`div` element with empty attrs', () => {
    expect(div``()).toBe('<div></div>')
  })

  it('`div` element with invalid attrs', () => {
    expect(() => {
      div`${(null as unknown as string)}`()
    }).toThrowError(new Error('attrs values are must be string or number.'))
  })

  it('`div` element with contents and attrs', () => {
    expect(div`.class#id[attr${1}="${'text'}"][attr2]`('Hello', '!', 100)).toBe('<div attr1="text" attr2 id="id" class="class">Hello!100</div>')
  })

  it('`div` element with contents and empty attrs', () => {
    expect(div``('Hello', '!', 100)).toBe('<div>Hello!100</div>')
  })

  it('`div` element with contents and invalid attrs', () => {
    expect(() => {
      div`${(null as unknown as string)}`('Hello', '!', 100)
    }).toThrowError(new Error('attrs values are must be string or number.'))
  })

  it('`br` element', () => {
    expect(br()).toBe('<br>')
  })

  it('`br` element with contents', () => {
    expect(br('Hello', '!', 100)).toBe('<br>')
  })

  it('`br` element with attrs', () => {
    expect(br`.class#id[attr${1}="${'text'}"][attr2]`()).toBe('<br attr1="text" attr2 id="id" class="class">')
  })

  it('`br` element with contents and attrs', () => {
    expect(br`.class#id[attr${1}="${'text'}"][attr2]`('Hello', '!', 100)).toBe('<br attr1="text" attr2 id="id" class="class">')
  })

  it('`html` element', () => {
    expect(html()).toBe('<!DOCTYPE html><html></html>')
  })

  it('`html` element with empty attrs', () => {
    expect(html``()).toBe('<!DOCTYPE html><html></html>')
  })
})

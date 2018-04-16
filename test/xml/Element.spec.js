/* eslint-env jest */
import Element from '../../src/xml/Element'

describe('XML Element', () => {
  test('empty', () => {
    expect(new Element('br').toString()).toBe('<br></br>')
  })

  test('attributes', () => {
    expect(new Element('rect', { x: 0, y: 1, width: 2, height: 3 }).toString()).toBe('<rect x="0" y="1" width="2" height="3"></rect>')
  })

  test('children', () => {
    expect(new Element('p', undefined, 'hello world').toString()).toBe('<p>hello world</p>')
    expect(new Element('p', { style: 'color: red;' }, 'hello world').toString()).toBe('<p style="color: red;">hello world</p>')
    expect(new Element('p', { style: 'color: red;' }, ['before', new Element('span', null, 'hello world'), 'after']).toString()).toBe('<p style="color: red;">before<span>hello world</span>after</p>')
  })

  test('set attribute', () => {
    const element = new Element('div')
    expect(element.toString()).toBe('<div></div>')
    element.set('class', 'a')
    expect(element.toString()).toBe('<div class="a"></div>')
    element.set('style', 'color: red;')
    expect(element.toString()).toBe('<div class="a" style="color: red;"></div>')
  })

  test('update attributes', () => {
    const element = new Element('div')
    expect(element.toString()).toBe('<div></div>')
    element.update({ class: 'a', style: 'color: red;' })
    expect(element.toString()).toBe('<div class="a" style="color: red;"></div>')
  })

  test('append children', () => {
    const element = new Element('div')
    expect(element.toString()).toBe('<div></div>')
    element.append('hello')
    expect(element.toString()).toBe('<div>hello</div>')
    element.append(new Element('p', undefined, 'world'))
    expect(element.toString()).toBe('<div>hello<p>world</p></div>')
  })

  test('prepend children', () => {
    const element = new Element('div')
    expect(element.toString()).toBe('<div></div>')
    element.prepend('hello')
    expect(element.toString()).toBe('<div>hello</div>')
    element.prepend(new Element('p', undefined, 'world'))
    expect(element.toString()).toBe('<div><p>world</p>hello</div>')
  })
})

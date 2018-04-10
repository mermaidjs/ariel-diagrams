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
})

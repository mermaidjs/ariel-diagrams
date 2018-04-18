import * as R from 'ramda'

class Element {
  constructor (tagName, attributes, elementList) {
    this.tagName = tagName
    this.attributes = attributes
    this.elementList = elementList
  }

  _normalizeAttribues () {
    if (R.isNil(this.attributes)) {
      this.attributes = {}
    }
  }

  set (key, value) {
    this._normalizeAttribues()
    this.attributes[key] = value
    return this
  }

  get (key) {
    this._normalizeAttribues()
    return this.attributes[key]
  }

  update (attributes) {
    this._normalizeAttribues()
    this.attributes = R.merge(this.attributes, attributes)
    return this
  }

  delete (attributes) {
    this._normalizeAttribues()
    this.attributes = R.omit(Array.isArray(attributes) ? attributes : [attributes], this.attributes)
    return this
  }

  _normalizeElementList () {
    if (R.isNil(this.elementList)) {
      this.elementList = []
    }
    if (!Array.isArray(this.elementList)) {
      this.elementList = [this.elementList]
    }
  }

  append (element) {
    this._normalizeElementList()
    this.elementList.push(element)
    return this
  }

  prepend (element) {
    this._normalizeElementList()
    this.elementList.unshift(element)
    return this
  }

  shift () {
    this._normalizeElementList()
    this.elementList.shift()
    return this
  }

  _attributesString () {
    if (R.isNil(this.attributes) || R.isEmpty(this.attributes)) {
      return ''
    }
    if (typeof this.attributes !== 'object') {
      return ''
    }
    return ' ' + R.pipe(
      R.toPairs,
      R.map(pair => `${pair[0]}="${pair[1]}"`),
      R.join(' ')
    )(this.attributes)
  }

  _elementListString () {
    if (R.isNil(this.elementList) || R.isEmpty(this.elementList)) {
      return ''
    }
    return R.pipe(
      R.map(element => element.toString()),
      R.join('')
    )(Array.isArray(this.elementList) ? this.elementList : [this.elementList])
  }

  toString () {
    return `<${this.tagName}${this._attributesString()}>${this._elementListString()}</${this.tagName}>`
  }
}

export default Element

/*
Ref: http://www.jsonml.org/

element
= '[' tag-name ',' attributes ',' element-list ']'
| '[' tag-name ',' attributes ']'
| '[' tag-name ',' element-list ']'
| '[' tag-name ']'
| string
;
tag-name
= string
;
attributes
= '{' attribute-list '}'
| '{' '}'
;
attribute-list
= attribute ',' attribute-list
| attribute
;
attribute
= attribute-name ':' attribute-value
;
attribute-name
= string
;
attribute-value
= string
| number
| 'true'
| 'false'
| 'null'
;
element-list
= element ',' element-list
| element
;
*/

import * as R from 'ramda'

class Element {
  constructor (tagName, attributes, elementList) {
    this.tagName = tagName
    this.attributes = attributes
    this.elementList = elementList
  }

  attributesString () {
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

  elementListString () {
    if (R.isNil(this.elementList) || R.isEmpty(this.elementList)) {
      return ''
    }
    return R.pipe(
      R.map(element => element.toString()),
      R.join('')
    )(Array.isArray(this.elementList) ? this.elementList : [this.elementList])
  }

  toString () {
    return `<${this.tagName}${this.attributesString()}>${this.elementListString()}</${this.tagName}>`
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

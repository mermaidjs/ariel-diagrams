# todo

- performance matters, do benchmark
- intersection for arbitrary path: https://stackoverflow.com/questions/26490861/find-intersection-of-svg-path
- support shapes: ellipse, diamond, round corner rect(as rect's attribute?)
- allows shapes as extensions, so that every one can contribute
    - for example: an user shape, a database shape: http://c4model.com/
    - don't limit the system to some common shapes. allow any <path/> as shape.
    - so we should draw rect, circle...etc as path, in order to be generic??
- postprocess elkGraph, remove unnecessary props
- styleOptions, such as border color, dotted line edge


## How to enable log

```js
import * as logLevel from 'loglevel'

logLevel.getLogger('ariel/index').setLevel('DEBUG')
```

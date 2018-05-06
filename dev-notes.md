# todo

- performance matters, do benchmark
- intersection for arbitrary path: https://stackoverflow.com/questions/26490861/find-intersection-of-svg-path
- support shapes: ellipse, diamond, round corner rect(as rect's attribute?)
- allows shapes as extensions, so that every one can contribute
    - for example: an user shape, a database shape: http://c4model.com/
    - don't limit the system to some common shapes. allow any <path/> as shape.
    - so we should draw rect, circle...etc as path, in order to be generic??
- support dotted line and border
- 继承与覆盖
    - *Options 被 children 自动继承
    - children 可以定义 *Options 覆盖 继承来的 options

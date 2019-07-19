# React seed 
一个react的简单示例，包含react-router和动态部署项目.

## What you get

* React 15.0.1
* ES6和jsx语法
* webpack热部署，动态构建hash资源文件
* Sass样式文件


## Getting started

### 创建项目

```bash
git clone --depth=1 https://github.com/tianxiangbing/react-seed.git my-project
```

### 开始运行

1. `npm install i`
3. `npm start`  动态部署
4. `npm test`	联调模式
5. `webpack -p`	打包发布



## Examples

### Writing components:

```js
// Filename: Menu.jsx

'use strict';

import styles from './_Menu.scss';
import React from 'react';
import MenuItem from './MenuItem';

let { Component, PropTypes } = React;

export default class Menu extends Component {

  static defaultProps = {
    items: []
  };

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    return (
      <ul className={styles.menu}>
        {this.props.items.map((item) => {
          return (<MenuItem item={item} />);
        }, this)}
      </ul>
    );
  }
}
```

###Writing tests:

```js
// Filename: __tests__/Menu-test.jsx

'use strict';

import React from 'react/addons';
import { expect } from 'chai';

import Menu from '../Menu.jsx';
import MenuItem from '../MenuItem.jsx';

// Here we create a mocked MenuItem component.
class MockedMenuItem extends MenuItem {
  render() {
    return (
      <li className={'mocked-menu-item'}>{this.props.item.label}</li>
    );
  }
}

## Sass, CSS & webpack

`import` Sass and CSS files from within your JavaScript component files:

```js
// Filename: app.jsx
import 'normalize.css/normalize.css';
import styles from './scss/app.scss';
```

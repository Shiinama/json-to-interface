<!--
 * @Description:
 * @Date: 2022-12-25 16:25:01
-->

# **json to interface**

**json 转为 typescript 接口**

# 关于使用

`npm i js-to-interface`

[在线体验地址](http://www.wsy.yn.cn/tools/jstots)

```javascript
const jstots = require('js-to-interface');
let json = {
  a: 1,
  b: 2,
  arr: [
    { a: 1, b: 3 },
    { d: 5, h: 6 }
  ],
  c: { ca: 1, c: { f: 5 } },
  d: { f: 5 }
};
const data = jstots(json, { fKey: 'json' });
data.forEach(interFaceStr => {
  console.log(interFaceStr);
});
```

```javascript
const json = {
  phone: 12312312312,
  name: 'Hello',
  obj: {
    cc: 1,
    dd: 2
  },
  sOBj: {
    dd: 5,
    g: 7,
    e: {
      c: 'y'
    }
  },
  arr: [1, 23, 4, 5],
  list: [
    {
      cc: 1,
      dd: 2
    },
    {
      cc: 1,
      g: 3,
      bb: 5
    }
  ]
};
```

经过转换

```typescript
interface Obj {
  cc: number;
  dd: number;
}
interface E {
  c: string;
}
interface SOBj {
  dd: number;
  g: number;
  e: E;
}
interface List {
  cc: number;
  dd?: number;
  g?: number;
  bb?: number;
}
interface OriginKey {
  phone: number;
  name: string;
  obj: Obj;
  sOBj: SOBj;
  arr: number[];
  list: List[];
}
```

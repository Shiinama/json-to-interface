<!--
 * @Description:
 * @Date: 2022-12-12 16:21:55
-->

# json-to-interface

json 转为 typescript 接口

# 关于使用

npm i js-to-interface

这是属于 interface 基础 sdk

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
data.forEach(i => {
  console.log(i);
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
interface Test {
  test: Array<TestRow>;
}
interface TestRow {
  a: number;
  b: number;
}

interface Json {
  phone: number;
  name: string;
  objL: Obj;
  sObj: SObj;
  arr: (number | string)[];
  list: List[];
}
interface Obj {
  cc: number;
  dd: number;
}
interface SObj {
  dd: number;
  g: number;
  e: E;
}
interface E {
  c: string;
}

interface List {
  cc: number;
  dd?: number;
  g?: number;
  bb?: number;
}
```

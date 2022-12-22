<!--
 * @Description:
 * @Date: 2022-12-12 16:21:55
-->

# json-to-interface

json 转为 typescript 接口

# 关于使用

通常来说，越完善的文档，提供的信息就越详细。
npm i js-to-interface 基础包

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

## 2、

如果你的`need`为 3，可以选择你需要的组件配置项`needComponentsOptions`，那么我可能需要更详细的配置项（也就是你写的文档）。定制化功能，有需求可以找我。

```javascript
const list = [
  {
    key: 'phone',
    value: 12312312312, //示例value
    isruierd: 1,
    label: '手机号', //通常对应到api平台 为remark
    type: 'number'
  },
  {
    key: 'name',
    value: 'Hello',
    isruierd: 1,
    label: '名字',
    type: 'string'
  },
  {
    key: 'createDt',
    label: '时间',
    type: 'Date'
  }
];
```

生成详细 ts

```typescript
interface list {
  list: row[];
}
interface row {
  phone?: number;
  name?: string;
  createDt: Date;
}
```

生成表格配置项

```javascript
const TableColums = [
  {
    prop: 'phone',
    label: '姓名'
  },
  {
    prop: 'name'
    label: '手机号'
  },
  {
    prop: 'createDt'
    label: '时间'
  },
]
```

# 关于配置

```typescript
interface defaultOptions {
  fKey: string; //对应的是你传入初始的 key，列如 json
  canSkipDealJson?: boolean; //是否可以跳过处理 JSON 的阶段，直接去使用给我的东西，仅仅优化速度。
  need?: 1 | 2 | 3; //你需要什么东西，1 是 ts,2 是组件配置项,3 是都需要,完整程度取决于你提供的信息。
  needComponentsOptions?: 'table' | 'select';
}
```

/*
 * @Description:
 * @Date: 2022-12-12 17:41:07
 */
const JsonToTS = require('./build/packages/core/src/index').default;
const {
  switchQuoteType,
  out
} = require('./build/packages/core/src/ts-interface/create-interface.js');
// 如果我希望只处理TS类型的情况处理成这样
function dealTypeMap({ types, key, type }) {
  let typeStr = '';
  for (let i = 0; i < types.length; i++) {
    typeStr += `${
      types[i].value === null ? types[i].key + '?' : types[i].key
    } : ${
      types[i].type === 'Object' ? capitalize(types[i].key) : types[i].type
    }; \n`;
    if (types[i].type === 'Object') {
      dealTypeMap(types[i]);
    }
  }
  let interfaceString = `interface ${capitalize(key)} {\n`;
  interfaceString += typeStr;
  interfaceString += '}';
  outArr.push(interfaceString);
  return typeStr;
}
const json = {
  phone: 12312312312,
  name: 'Hello',
  obj: {
    cc: 1,
    dd: 2
  },
  list: [
    { a: 1, b: 2 },
    { c: 3, b: 5 }
  ]
};
const json1 = [{ a: 1, b: 2 }];
// 以id连接集合降低时间复杂度
const jsonFormmters1 = {
  rootTypeId: '3',
  types: [
    {
      id: '1',
      typeObj: {
        cc: 'number',
        dd: 'number'
      }
    },
    {
      id: '4',
      typeObj: {
        a: 'number',
        b: 'number'
      }
    },
    {
      id: '5',
      typeObj: {
        c: 'number',
        b: 'number'
      }
    },
    {
      id: '2',
      arrayOfTypes: ['4', '5']
    },
    {
      id: '3',
      typeObj: {
        phone: 'number',
        name: 'string',
        obj: '1',
        list: '2'
      }
    }
  ]
};
// 如果我希望处理后的配置项那么处理成这样，但是我一定是纯粹的想生成数组对象配置项（业务场景）
const jsonFormmters = [
  {
    key: 'phone',
    value: 12312312312, //示例value
    type: 'number'
  },
  {
    key: 'name',
    value: 'Hello',
    type: 'string'
  },
  {
    key: 'obj',
    type: 'Object',
    value: [
      {
        key: 'cc',
        value: 1,
        type: 'string'
      },
      {
        key: 'dd',
        value: 2,
        type: 'number'
      }
    ]
  },
  {
    ket: 'list',
    type: 'ArrayofObject',
    value: [
      [
        {
          key: 'a',
          value: 1,
          type: 'number'
        },
        {
          key: 'b',
          value: 2,
          type: 'number'
        }
      ],
      [
        {
          key: 'c',
          value: 3,
          type: 'number'
        },
        {
          key: 'b',
          value: 5,
          type: 'number'
        }
      ]
    ]
  }
];
debugger;
const data = out({
  type: 'Object',
  key: 'testJson',
  types: [
    {
      type: 'number',
      types: undefined,
      key: 'phone',
      value: 12312312312
    },
    {
      type: 'string',
      types: undefined,
      key: 'name',
      value: 'Hello'
    },
    {
      type: 'Object',
      types: [
        {
          type: 'number',
          types: undefined,
          key: 'cc',
          value: null
        },
        {
          type: 'number',
          types: undefined,
          key: 'dd',
          value: 2
        }
      ],
      key: 'obj',
      value: {
        cc: 1,
        dd: 2
      }
    }
  ]
});
console.log(data);
data.forEach(item => {
  console.log(item);
});

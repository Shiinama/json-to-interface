/*
 * @Description:
 * @Date: 2022-12-19 20:32:48
 */
import * as assert from 'assert';
import JsonToTS from '../packages/core/src/index';
const clearWhiteSpace = str => str.replace(/\s/g, '');
describe('对象interface测试', function () {
  it('常规对象', function () {
    const json = {
      a: {
        b: 42
      }
    };

    const testTypes = [
      `interface OriginKey {
        a: A;
      }`,
      `interface A {
        b: number;
      }`
    ].map(clearWhiteSpace);

    JsonToTS(json).forEach(i => {
      const noWhiteSpaceInterface = clearWhiteSpace(i);
      assert(testTypes.includes(noWhiteSpaceInterface));
    });
  });
  it('重复对象', function () {
    const json = {
      a: 1,
      b: 2,
      c: {
        d: 1
      },
      f: {
        d: 1
      }
    };

    const testTypes = [
      `interface OriginKey {
        a: number;
        b: number;
        c: C;
        f: C;
      }`,
      `interface C {
        d: number;
      }`
    ].map(clearWhiteSpace);
    JsonToTS(json).forEach(i => {
      const noWhiteSpaceInterface = clearWhiteSpace(i);
      assert(testTypes.includes(noWhiteSpaceInterface));
    });
  });

  it('重复对象,父子key重叠', function () {
    const json = {
      f: {
        f: {
          d: 1,
          g: 2,
          f: {
            d: 1,
            g: 2
          }
        }
      },
      h: {
        f: {
          d: 1,
          g: 2,
          f: {
            d: 1,
            g: 2
          }
        }
      }
    };

    const testTypes = [
      `interface OriginKey {
        f: F;
        h: F;
      }`,
      `interface F {
          f: F2;
      }`,
      `interface F2 {
          d: number;
          g: number;
          f: F3;
      }`,
      `interface F3 {
        d: number;
        g: number;
      }`
    ].map(clearWhiteSpace);
    JsonToTS(json).forEach(i => {
      const noWhiteSpaceInterface = clearWhiteSpace(i);
      assert(testTypes.includes(noWhiteSpaceInterface));
    });
  });
});

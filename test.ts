/*
 * @Description:
 * @Date: 2022-12-13 16:02:01
 */
// 这是期望
interface Json {
  phone?: number;
  name: string;
  list: List[];
}
interface List {
  cc: number;
  dd: number;
}

interface defaultOptions {
  fKey: string; //对应的是你传入初始的key，列如json
  canSkipDealJson?: boolean; //是否可以跳过处理JSON的阶段，直接去使用给我的东西
  onJson?: boolean; //只有json的初始配置
  hasJsonOption?: boolean; //如果你可以拥有更多的信息，那么我就可以做更多的处理，比如jsonFormmters
  need?: 1 | 2 | 3; //你需要什么东西，1是ts,2是组件配置项,3是都需要,完整程度取决于你提供的信息。
}

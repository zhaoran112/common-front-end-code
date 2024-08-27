// 目标对象 (to): 将被赋值的对象
// 源对象 (from): 包含原始数据
// 键映射
// 类型转换器
function copyProp(to, from, keyMap = {}, typeConverters = {}) {
  Object.keys(to).forEach((key) => {
    const mappedKey = keyMap[key] || key;
    if (typeConverters[key]) {
      to[key] = typeConverters[key](from[mappedKey]);
    } else {
      to[key] = from[mappedKey];
    }
  });
  return to;
}

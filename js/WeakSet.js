let ws = new WeakSet();
let obj = {
  a: 1
};
ws.add(obj);
console.log(ws.has(obj), "ws");
console.log(__dirname, "__dirname");

// 观察者模式
class Subject {
  // 主题
  constructor() {
    this.observers = []; // 观察者列表
  }
  addObservers(observer) {
    this.observers.push(observer);
  }
  removeObservers() {}
  notifyObservers(msg) {
    this.observers.forEach((observer) => observer.update(msg));
  }
}

// 观察者（Observer）
class Observer {
  constructor(name) {
    this.name = name;
  }
  update(msg) {
    console.log(this.name + msg);
  }
}
// createObserver和Observer实现的是同样的效果

// 创建观察者函数
function createObserver(name) {
  return {
    name: name,
    update: function (msg) {
      console.log(this.name + msg);
    }
  };
}

const sub = new Subject();
const obs1 = new Observer("zhang san");
const obs2 = new Observer("li si");
sub.addObservers(obs1);
sub.addObservers(obs2);
sub.notifyObservers("开始抢票了");

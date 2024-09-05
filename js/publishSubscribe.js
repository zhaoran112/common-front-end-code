class Broker {
  constructor() {
    this.topics = {}; //主题
  }
  // 订阅主题
  subscribe(topic, subscriber) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push(subscriber);
  }
  // 发布消息
  publish(topic, msg) {
    if (this.topics[topic]) {
      this.topics[topic].forEach((subscriber) => subscriber(msg));
    }
  }
}
const broker = new Broker();
const sub1 = (msg) => {
  console.log("sub1" + msg);
};
const sub2 = (msg) => {
  console.log("sub2" + msg);
};
broker.subscribe("topic1", sub1);
broker.subscribe("topic1", sub2);

broker.publish("topic1", "开始抢票了");

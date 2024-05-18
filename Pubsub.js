class Pubsub {
  constructor() {
    this.subscribers = {}; // {'eventName': [callback1, callback2, ...]}
  }

  /**
   * @param event It is a string denoting the unique event
   * @param callback for a subscriber what method should be called when the event is fired
   */
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      // currently no subscribers callback was registered for this event
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);

    return () => {
      this.unsubscribe(event, callback);
    };
  }

  unsubscribe(event, callback) {
    if (!this.subscribers[event]) return;
    this.subscribers[event] = this.subscribers[event].filter(
      (cb) => cb !== callback
    );
  }

  /**
   *
   * @param event It is a string denoting the unique event fired
   * @param data for the given event what data should be passed along with publishing the event
   */
  publish(event, data) {
    if (!this.subscribers[event]) return;
    this.subscribers[event].forEach((callback) => callback(data));
  }
}

const pb = new Pubsub();

const unsub1 = pb.subscribe("airforce", (data) => {
  console.log("Subscriber 1", data);
});

const unsub2 = pb.subscribe("airforce", (data) => {
  console.log("Subscriber 2", data);
});

pb.publish("airforce", { shoeName: "Airforce" });
unsub1();
pb.publish("airforce", { shoeName: "Airforce v2" });

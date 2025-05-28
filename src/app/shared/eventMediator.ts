import { EventEmitter } from "node:events";

class EventMediator {
  mediator = new EventEmitter();

  async publish(eventName: string, data: any): Promise<any> {
    let response;
    const listeners = this.mediator.listeners(eventName);

    for (const listener of listeners) {
      const listenerResponse = await listener(data);
      response = listenerResponse;
    }

    this.mediator.off(eventName, () => {});
    return response;
  }

  subscribe = (eventName: string, callback: (data: any) => void) => {
    this.mediator.on(eventName, callback);
    return null;
  };
}

const eventMediator = new EventMediator();

export { eventMediator };

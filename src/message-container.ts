import { Container } from './container';
import { Message } from './message';

export default class MessageContainer extends Container<Message> {
  constructor(filePath: string) {
    super(filePath);
  }

  async save(prod: Message) {
    try {
      const newProd = Message.parseMessage(prod as unknown as Record<string, unknown>);
      if (!newProd)
        throw new Error('Error parsing product');
      return await super.save(newProd);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

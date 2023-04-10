import { TStack } from '../types/stack';

export class Stack<T> implements TStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    return this.container[this.getSize() - 1];
  };

  getSize = () => this.container.length;

  show = () : T[] => {
    return [...this.container];
  }

  clear = (): void => {
    this.container = [];
  };
}

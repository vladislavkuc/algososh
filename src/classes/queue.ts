import { TQueue } from "../types/queue";

export class Queue<T> implements TQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.isFull()) {
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head % this.size] = null;
    this.length = this.length - 1;
    this.head = this.head + 1;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head];
  };

  takeTail = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[(this.tail - 1) % this.size];
  }

  clear = (): void => {
    this.container = Array(this.size);
    this.length = 0;
    this.tail = 0;
    this.head = 0;
  };

  show = (): (T | null)[] => [...this.container];
  getHead = () => this.head % this.size;
  getTail = () => (this.tail - 1) % this.size;
  isFull = () => this.length >= this.size;
  isEmpty = () => this.length === 0;
}

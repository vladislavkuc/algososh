import { TNode } from "../types/node";

export class Node<T> implements TNode<T> {
  value: T;
  next: TNode<T> | null;
  constructor(value: T, next: TNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

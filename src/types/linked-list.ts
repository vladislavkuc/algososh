import { TNode } from './node';

export type TLinkedList<T> = {
  push: (node: TNode<T>) => void;
  pop: () => T | null;
  shift: (node: TNode<T>) => void;
  unshift: () => T | null;
}

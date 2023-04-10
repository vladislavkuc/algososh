export type TNode<T> = {
  value: T;
  next: TNode<T> | null;
}

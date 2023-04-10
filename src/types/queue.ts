export type TQueue<T> = {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

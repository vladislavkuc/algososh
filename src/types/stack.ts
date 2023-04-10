export type TStack<T> = {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  show: () => T[];
  clear: () => void;
  getSize: () => number;
}

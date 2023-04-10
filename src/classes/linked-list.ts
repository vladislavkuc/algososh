import { TLinkedList } from "../types/linked-list";
import { Node } from "./node";

export class LinkedList<T> implements TLinkedList<T>{
  head: Node<T> | null;

  constructor(node: Node<T> | null) {
    this.head = node;
  }

  push(node: Node<T>) {
    if (this.head == null){
      this.head = node;
    } else {
      let curr = this.head;
      while (curr.next != null) {
        curr = curr.next;
      }
      curr.next = node;
    }
  }

  pop() {
    if (this.head == null){
      return null;
    } else if (this.head.next == null) {
      const res = this.head.value;
      this.head = null;
      return res;
    } else {
      let curr = this.head;
      while (curr.next != null && curr.next.next != null) {
        curr = curr.next;
      }

      const res = curr.next ? curr.next.value : null;
      curr.next = null;
      return res;
    }
  }

  shift(node: Node<T>) {
    node.next = this.head;
    this.head = node;
  }

  unshift() {
    if (this.head == null) {
      return null
    } else {
      const temp = this.head.value;
      this.head = this.head.next;
      return temp;
    }
  }

  insertAt(element: T, index: number) {
    if (index < 0) {
      return;
    } else {
      const node = new Node(element, null);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (curr && currIndex < index){
          currIndex++;
          if (currIndex !== index && curr.next){
            curr = curr.next;
          }
        }

        if (curr) {
          node.next = curr.next;
          curr.next = node;
        }
      }
    }
  }

  deleteAt(index: number) {
    if (index < 0 || this.head == null) {
      return null;
    } else {
      if (index === 0) {
        const res = this.head.value;
        this.head = this.head.next;
        return res;
      } else {
        let curr = this.head;
        let prev = null;
        let currIndex = 0;

        while (curr && currIndex < index){
          currIndex++;
          if (curr.next){
            prev = curr;
            curr = curr.next;
          }
        }

        if (curr && prev) {
          const res = curr.value;
          prev.next = curr.next;
          return res;
        }
      }
    }
    return null;
  }

  toArray () {
    const arr = [];
    if (this.head == null){
      return [];
    } else {
      let curr = this.head;
      while (curr.next != null) {
        arr.push(curr.value);
        curr = curr.next;
      }
      arr.push(curr.value);

      return arr
    }
  }
}

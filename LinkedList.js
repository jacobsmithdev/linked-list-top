import Node from './Node.js';

export default class LinkedList {
    constructor(startValue = new Node()) {
        this.head =
            startValue instanceof Node
                ? startValue
                : new Node(startValue, null);
    }

    get tail() {
        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }

        return current;
    }

    append(value) {
        const node = new Node(value);

        if (this.head === null) {
            this.head = node;
            return;
        }

        let current = this.head;

        while (current.next !== null) {
            current = current.next;
        }

        current.next = node;
    }

    prepend(value) {
        const newHead = new Node(value, this.head);
        this.head = newHead;
    }

    pop() {
        if (this.head === null) return;

        if (this.head.next === null) {
            const head = this.head;
            this.head = null;
            return head;
        }

        // get second-to-last node in list, e.g.:
        // ( current ) -> ( current.next ) -> null
        //                                      ^ current.next.next === null
        let current = this.head;
        while (current.next.next !== null) {
            current = current.next;
        }

        const tail = current.next;
        current.next = null;
        return tail;
    }

    toString() {
        let string = '';
        let current = this.head;

        while (current !== null) {
            const valueString = String(current.value);
            const nodeString = `( ${valueString} )`;
            string += nodeString;
            string += ' -> ';

            current = current.next;
        }
        string += 'null';

        return string;
    }
}

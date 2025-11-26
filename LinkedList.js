import Node from './Node.js';

export default class LinkedList {
    constructor(startValue) {
        this.head = startValue instanceof Node ? startValue : null;
    }

    get tail() {
        let current = this.head;
        if (current === null) return current;

        while (current.next !== null) {
            current = current.next;
        }

        return current;
    }

    get size() {
        let sum = 0;

        let current = this.head;
        while (current !== null) {
            current = current.next;
            sum++;
        }

        return sum;
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

    at(targetIndex) {
        let currentIndex = 0;
        let current = this.head;

        while (current !== null) {
            if (currentIndex === targetIndex) return current.value;
            currentIndex++;
            current = current.next;
        }

        return null;
    }

    contains(value) {
        let current = this.head;

        while (current !== null) {
            if (current.value === value) return true;
            current = current.next;
        }

        return false;
    }

    find(value) {
        let current = this.head;
        let index = 0;

        while (current !== null) {
            if (current.value === value) return index;
            current = current.next;
            index++;
        }

        return -1;
    }

    insertAt(value, index) {
        if (index === 0) {
            this.prepend(value);
            return;
        }

        let current = this.head;
        let currentIndex = 0;

        // Traverse list to node right before target index
        while (currentIndex < index - 1 && current.next !== null) {
            currentIndex++;
            current = current.next;
        }

        const nextNode = current.next;
        const prevNode = current;

        const newNode = new Node(value, nextNode);
        prevNode.next = newNode;
    }

    removeAt(index) {
        if (index === 0) {
            this.head = this.head.next;
            return;
        }

        if (index > this.size - 1) {
            this.pop();
            return;
        }

        let current = this.head;
        let currentIndex = 0;

        // Traverse list to node right before target index
        while (currentIndex < index - 1 && current.next !== null) {
            currentIndex++;
            current = current.next;
        }

        const isEndOfList = current.next === null;
        // If there are nodes after the one just removed, stitch them back together
        if (!isEndOfList) current.next = current.next.next;
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

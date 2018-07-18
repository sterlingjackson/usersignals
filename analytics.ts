import { Person, Leader } from './person';

const bob = new Person('Bob', 50);
const bill = new Leader('Bill', 30);

console.log(bob.greeting());
console.log(bill.greeting());

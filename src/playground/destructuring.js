// console.log('destructuring')

// const person = {
//     name: 'Andrew',
//     age: 26, 
//     location: {
//         city: 'Philadelphia',
//         temp: 92
//     }
// }

// //Object Destructuring
// const { name: firstName = 'Anonomous', age } = person;


// console.log(`${firstName} is ${age}.`)

// const {city, temp: temperature} = person.location

// console.log(`It's ${temperature} in ${city}`)

const book = {
    title: 'Ego is the Enemy', 
    author: 'Ryan Holiday',
    publisher: {
        //name: 'Penguin'
    }
};

const {name: publishername = 'Self Published'} = book.publisher

console.log(publishername)

// Array destructuring 

const address = ['1299 S Juniper St', 'Philadelphia', 'Pennsylvania', '12357']; 

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75']

const [, city, state] = address

const [coffee, , medium] = item

console.log(`You are ${city}, ${state}.`)
console.log(`A medium ${coffee} costs ${medium}`)
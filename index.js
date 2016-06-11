const PubSub = require('pubsub-js')

function mySubscriber(msg, data) {
  console.log('got new message', msg)
  console.log(data)
}
const token = PubSub.subscribe('MY TOPIC', mySubscriber)
const add = require('add')
const sum = add(2, 3)
console.log('2 + 3 =', sum)

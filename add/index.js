const PubSub = require('pubsub-js')

function add(a, b) {
  PubSub.publish('add', `adding ${a} to ${b}`)
  return a + b
}
module.exports = add

# pubsub for module communication

If we want to decouple notifications among modules, we can use centrsal
PubSub dispatcher. This repo shows how.

Top level repo has [pubsub-js](https://libraries.io/npm/pubsub-js) as
dependency and subscribes to "add" message.

```js
const PubSub = require('pubsub-js')
function mySubscriber(msg, data) {
  console.log('got new message', msg)
  console.log(data)
}
const token = PubSub.subscribe('add', mySubscriber)
```

The it calls a dependent module to add two numbers together

```js
const add = require('add')
const sum = add(2, 3)
```

The module `add` (defined in subfolder [add](./add)) also has `pubsub-js`
dependency and just published messages to the topic "add".

```js
const PubSub = require('pubsub-js')
function add(a, b) {
  PubSub.publish('add', `adding ${a} to ${b}`)
  return a + b
}
module.exports = add
```

The `PubSub` is the central message hub, and when running the program
correctly routes the message.

```sh
$ node index.js
2 + 3 = 5
got new message add
adding 2 to 3
```

Note that the message is delivered asynchronously.

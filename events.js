const events = require('events')

let usersLoggedIn = 0;

const eventEmitter = new events.EventEmitter();

eventEmitter.on('userLoggedIn',()=>{
    usersLoggedIn+=1;
    console.log(`There are ${usersLoggedIn} users logged in`);
})

eventEmitter.emit('userLoggedIn')
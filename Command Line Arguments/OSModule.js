const os = require('os');

console.log("User Info ->", os.userInfo())
console.log("Platform -> ",os.platform())
console.log("Release -> ",os.release())
console.log("CPUs -> ",os.cpus())
console.log(__dirname);
console.log(__filename);
console.log(process.env.KEY)

// We can create a new environment variable by using -> "export KEY=VALUE"
const { Worker } = require("worker_threads");

class Pool {
  constructor(threadCount) {
    this.threadCount = threadCount; //number of threads
    this.threads = []; //all of our workers threads
    this.scheduledTasks = []; //queue of tasks
    this.idleThreads = [];

    for (let index = 0; index < threadCount; index++) {
      this.spawnThread();
    }
  }

  spawnThread() {
    const worker = new Worker("./calc.js");

    worker.on("message", (result) => {
      const { callback } = worker.currentTask;
      if (callback) {
        callback(result);
      }

      this.idleThreads.push(worker);
      this.runNextTask();
    });

    this.threads.push(worker);
    this.idleThreads.push(worker);
  }

  runNextTask() {
    if (this.scheduledTasks.length > 0 && this.idleThreads.length > 0) {
      const worker = this.idleThreads.shift();
      const { taskName, options, callback } = this.scheduledTasks.shift();

      worker.currentTask = { taskName, options, callback };

      worker.postMessage({ taskName, options });
    }
  }

  submit(taskName, options, callback) {
    this.scheduledTasks.push({ taskName, options, callback });
    this.runNextTask();
  }
}

module.exports = Pool;

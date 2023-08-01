const fs = require('fs/promises');

(async ()=>{

    console.time("start");
    let file = await fs.open("test.txt",'w');
    
    for(let i=0;i<1000000;i++){
        file.write(`${i} `);
    }
    console.timeEnd("start")
}
)()

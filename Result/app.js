const axios = require("axios")
const fs = require("fs")

async function fetchResult(roll){
    let response = await axios.get(`https://csvtu.digivarsity.online/WebApp/Result/SemesterResult.aspx?S=7%20SEMESTER&E=NOV-DEC%202022&R=${roll}&T=Regular`)
    let html = response.data;
    try{
        let splittedHtml = html.split(`<span id="obtmarks">`)
        let marksInSpan = splittedHtml[1]
        let marks = marksInSpan.split("</span>")[0]

        let nameSplittedHtml = html.split(`<span id="NOC" style="line-height: 28px;">`)
        let nameInSpan = nameSplittedHtml[1]
        let name = nameInSpan.split("</span>")[0]
        let singleResult = `${name},${roll},${marks}\n`
        fs.appendFile("result.txt",singleResult,(err)=>{
            if(err){
                console.log(err)
            }
        })
        console.log(singleResult)
    }
    catch(err){
        console.log(err)
    }
}

start = 301302219001
end = 301302219159

for(let i = start;i<=end;i++){
    fetchResult(i)
}
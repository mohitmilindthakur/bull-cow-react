const fs = require("fs")



const words = JSON.parse(fs.readFileSync("./word-bank-1.json", "utf-8"))

const filteredWords = words.filter(item => item.length >= 4)

fs.writeFileSync("./word-bank.json", JSON.stringify(filteredWords), "utf-8")
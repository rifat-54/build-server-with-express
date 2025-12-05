import fs from "fs"
import path from "path"

export const writeLogger=(text:string)=>{
const filePath=path.join(process.cwd(),"./src/db/logger.txt")

// fs.writeFileSync(filePath,text)
fs.appendFileSync(filePath,text)

}
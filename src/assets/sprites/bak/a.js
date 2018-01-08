const fs = require('fs')

const dir = 'character'
fs.readdir(dir, (err, files) => {
    let i = 1
    files.forEach(f => {
        fs.stat(`${dir}/${f}`, (err, stats) => {
            if (stats.isFile() && f.includes('png')) {
                fs.renameSync(`${dir}/${f}`, `${dir}/${dir}.${i++}.png`)
            }
        })
    })
})

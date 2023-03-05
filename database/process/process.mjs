'use strict'

import path, {dirname} from 'path'
import {fileURLToPath} from 'url'

/* use built-in functions to abstract slashes ordeal. */
/* '__dirname' represents path of 'sanitize' directory. */

const url = import.meta.url
const normalized = fileURLToPath(url)
const __dirname = dirname(normalized)

const paths = {
    originals: {
        mice: path.join(__dirname, 'data', 'originals', 'mice.txt'),
        cages: path.join(__dirname, 'data', 'originals', 'cages.txt'),
    },
    new: {
        mice: path.join(__dirname, 'data', 'new', 'mice.sql'),
        cages: path.join(__dirname, 'data', 'new', 'cages.sql'),
    },
}

/* santitize rows from 'mice' and 'cages'. */

function sanitize(line) {

    /* replace " in columns with '. */
    
    line = line.replace(/"/g, "'")
    
    /* make array from first five columns. */
    
    const array = line.split(',', 5)

    /* if array does not have ' surrounding non-empty columns, add '. */

    for (let i = 0; i < 5; ++i) {
        
        /* if column empty, set it to null. */
        
        if (!array[i] || array[i].length === 1 && array[i][0] === "'") {
            array[i] = 'NULL'
            continue
        }

        /* otherwise, surround non-empty column with '. */

        const front = array[i][0]
    
        if (front && front !== "'")
            array[i] = `'${array[i]}`
    
        const back = array[i].slice(-1)
    
        if (back && back !== "'")
            array[i] = `${array[i]}'`
    }

    /* return array. */

    return array
}

/* main imports. */

import fs from 'fs'
import readline from 'readline'

function mice() {
    fs.writeFileSync(paths.new.mice, '')

    const stream = fs.createReadStream(paths.originals.mice, {encoding: 'utf8'})

    const aninterface = readline.createInterface({
        input: stream,
    })

    aninterface.on('line', line => {

        /* sanitize line. */

        const array = sanitize(line)

        /* craft instruction. */
        
        line = array.join(', ')
        const instruction = `INSERT INTO mice(stock, id, sex, birthday, "mating number") VALUES (${line});\n`

        /* append instruction to new file. */

        fs.appendFileSync(paths.new.mice, instruction)
    })
}

function cages() {
    fs.writeFileSync(paths.new.cages, '')

    const stream = fs.createReadStream(paths.originals.cages, {encoding: 'utf8'})

    const aninterface = readline.createInterface({
        input: stream,
    })

    aninterface.on('line', line => {

        /* sanitize line. */

        const array = sanitize(line)

        /* craft instruction. */
        
        line = array.join(', ')
        const instruction = `INSERT INTO mating_cages(stock, "mating number", dam, sire, "date of mating") VALUES (${line});\n`

        /* append instruction to new file. */

        fs.appendFileSync(paths.new.cages, instruction)
    })
}

mice()
cages()
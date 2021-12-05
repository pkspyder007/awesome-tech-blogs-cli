import { downloadData } from './utils/data.js';
import { createRequire } from "module";
import chalk from 'chalk';
import boxen from 'boxen';
const require = createRequire(import.meta.url);

const { bold, italic, dim, yellow, green, bgRed } = chalk;

const greenInverse = chalk.bold.inverse.green;
const cyanInverse = chalk.bold.inverse.cyan;
const yellowInverse = chalk.bold.inverse.yellow;
const whiteInverse = chalk.bold.inverse.white;
const pinkInverse = chalk.bold.inverse.magenta;
const blueInverse = chalk.bold.inverse.blue;
const blackInverse = chalk.bold.inverse.black;

const bgcolors = [greenInverse, blueInverse, cyanInverse, whiteInverse, yellowInverse, pinkInverse, blackInverse];


// Color utils
const rand = () => Math.floor(Math.random() * bgcolors.length);

let prevColor = null;

const randomBgColor = (msg) => {
    let color = rand();

    while (prevColor == color) {
        color = rand();
    }
    prevColor = color;

    return bgcolors[rand()](msg);
}

function print(blog) {
    // console.log(bold(italic(yellow((blog.name)))));
    // console.log();
    // console.log((italic(green((blog.description)))));
    // console.log();

    // let taglist = '';
    // blog.tags.forEach((item, i) => {
    //     let str = ((randomBgColor(' ' + item + ' ')));
    //     if (i == 0) {
    //         taglist += str;
    //     } else {
    //         taglist += ' - ' + str;
    //     }
    // });

    // console.log(taglist);
    // console.log();

    // console.log(dim(bold(blog.url)));
    // console.log();
    // console.log();

    let strToPrint = '';
    strToPrint += italic(yellow((blog.name))) + '\n';
    strToPrint += '\n';
    strToPrint += italic(green((blog.description))) + '\n';
    strToPrint += '\n';
    strToPrint += 'Tags: ';
    let taglist = '';
    blog.tags.forEach((item, i) => {
        taglist += ((randomBgColor(' ' + item + ' ')));
    })
    strToPrint += taglist + '\n';
    strToPrint += '\n';
    strToPrint += dim(bold(blog.url)) + '\n';

    console.log(boxen(strToPrint, {
        title: blog.url,
        textAlignment: 'left',
        margin: {
            top: 1,
            bottom: 1,
        },
        padding: 1,
        borderColor: `#${Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, 0)}`
    }));

}


export async function listBlogs() {
    await downloadData();
    const blogs = require('./data.cjs')
    for (let blog of blogs) {
        print(blog);
    }
    console.log();
    console.log(randomBgColor('Created By: Praveen. (https://praveeen.in)'));
    console.log();
}

export async function getBlogsFromTag(tag) {
    await downloadData();
    const blogs = require('./data.cjs')
    let flag = false;
    for (let blog of blogs) {
        for (let t of blog.tags) {
            if (!t) continue;
            if (t?.toLowerCase() === tag.toLowerCase()) {
                flag = true;
                print(blog);
            }
        }
    }

    if (!flag) {
        console.log(bgRed(whiteBright('No blogs found for tag: ' + tag)));
    }
    console.log();
    console.log(randomBgColor('Created By: Praveen. (https://praveeen.in)'));
    console.log();
}
import alfy from 'alfy';

import fse from 'fs-extra';
import { ImagePool } from '@squoosh/lib';
import { cpus } from 'os';
import path from 'path';

const codecsMap = {
    jpg: "mozjpeg",
    jpeg: "mozjpeg",
    webp: "webp",
    wp2: "wp2",
    png: "oxipng",
    jxl: "jxl",
    avif: "avif"
};

let [resolutions, imgFilePaths] = alfy.input.trim().split("|");
resolutions = resolutions.split(" ").map(val => val.trim());
imgFilePaths = imgFilePaths.split(",").map(val => val.trim())


if (imgFilePaths[0] === "") {
    alfy.output("empty")
} else {
    precessFiles()
}

async function precessFiles() {
    const imagePool = new ImagePool(cpus().length);

    for (const imgFilePath of imgFilePaths) {

        try {
            // alfy.log(imgFilePath)
            const [filename, fileExtension] = path.basename(imgFilePath).split('.');
            const codec = codecsMap[fileExtension] // ! check if exist
            const imgFile = await fse.readFile(imgFilePath);

            const image = imagePool.ingestImage(imgFile);


            // original dimensions
            const { width, height } = (await image.decoded).bitmap;
            // alfy.log(`${filename} width : ${width} height : ${height}`)

            for (let resoulutionString of resolutions) {

                let outputWidth;
                if (resoulutionString.endsWith("%")) {
                    const percent = Number(resoulutionString.slice(0, -1))
                    outputWidth = Math.round(width * percent / 100.0)
                } else {
                    if (resoulutionString.endsWith("px")) {
                        resoulutionString = resoulutionString.slice(0, -2);
                    }
                    outputWidth = Number(resoulutionString)
                }


                const preprocessOptions = {
                    resize: {
                        enabled: true,
                        width: outputWidth, // height will preserve ratio 
                    },
                };

                await image.preprocess(preprocessOptions);

                // const { resultWidth, resultHeight } = (await image.decoded).bitmap; // ? why it does not work

                const { extension, binary } = (await image.encode({
                    [codec]: {}
                }))[codec];


                // const { extension, binary } = await image.encodedWith[codec];
                // ${resultWidth}px_${resultHeight}px
                const outputFileName = `${filename}-${resoulutionString}.${fileExtension}`;
                const imageDir = path.dirname(imgFilePath);
                const dst = path.resolve(process.env.dest ?? imageDir, outputFileName);
                await fse.writeFile(dst, binary);
            }
        } catch (err) {
            console.error(err);
            continue;
        }
    }

    await imagePool.close(); // rquired to exit the program.
    alfy.output("success")

};

// A legacy app that needs migrated to docker
// Requires node 8.x and GraphicsMagick installed on OS
// It will pull images from a hardcoded dir and output
// to another hardcoded dir and exit

// TO RUN DOCKERIZED
// docker build -t imager .
// docker run -v $(pwd)/in:/app/in -v $(pwd)/out:/app/out --env CHARCOAL_FACTOR=0 imager

var fs = require('fs'),
    gm = require('gm'),
    isImage = require('is-image'),
    winston = require('winston');

var inDir = './in',
    outDir = './out',
    charcoalFactor = process.env.CHARCOAL_FACTOR || null, // ideally 0.1 to 1.0
    width = process.env.WIDTH || null, // leaving either null will preserve aspect ratio
    height = process.env.HEIGHT || null;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.Console({ level: 'error' }),
    ],
});

logger.log('info', 'about to start');

function findFiles(dir, output, cFactor) {
    logger.log('info', 'about to scan ' + dir);
    fs.readdir(dir, function(err, files) {
        if (err) {
            logger.log('error', err);
            return;
        }
        files.forEach(function(file) {
            if (isImage(file)) {
                logger.log('info', 'found file ' + dir + '/' + file);
                logger.log('info', "working on it, I'm old and slow");
                gm(dir + '/' + file)
                    // .charcoal(cFactor)
                    .gravity('Center') // Move the starting point to the center of the image before crop.
                    // .crop(width, height)
                    .resize(width, height)
                    .write(output + '/out-' + file, function(err) {
                        if (err) {
                            logger.log('error', err);
                            return;
                        }
                        if (!err)
                            logger.log('info', 'image ' + file + ' modified');
                    });
            }
        });
    });
}

findFiles(inDir, outDir, charcoalFactor);

// The gm.resize() method takes two main parameters, a width and a height. If either the width or the height is set as null, then the image is resized to the specified width or height, while maintaining the aspect ratio. However, if both width and height are provided, the resizing would break out of its aspect ratio and resize to the given width and height.

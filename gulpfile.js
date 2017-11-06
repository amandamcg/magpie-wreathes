
// https://github.com/gulpjs/gulp
let gulp = require('gulp');
// to rename files https://www.npmjs.com/package/gulp-rename/
var rename = require("gulp-rename");
var changeCase = require("change-case");

// https://www.npmjs.com/package/gulp-image-resize
let imageResize = require('gulp-image-resize');

let parallel = require("concurrent-transform");
let os = require("os");

const SOURCE_IMAGE_PATH     = 'images/original';
const RENAMED_IMAGE_PATH     = 'images/renamed';
const GENERATED_IMAGE_PATH  = 'images';

const SIZES = [384, 512, 768, 1024, 1536, 2048];  // These can be any numbers you like! These particular sizes were chosen since they’re
                                                  // device-agnostic and multiples of 256, which may make the maths easier for your processor.
let sizesCursor;



// Create a copy of each image, at the requested size
function generateImages(size) {
  let folder = GENERATED_IMAGE_PATH + "/" + size + "-wide";
  console.log('Generating images at size: ' + size + ' pixels, in the folder: ' + folder);

  gulp.src(RENAMED_IMAGE_PATH + "/*.jpg")
    .pipe(parallel(
      imageResize({ width : size }),
      os.cpus().length
    ))
    .pipe(gulp.dest(folder))
    .on('end', generateNext);
}


function generateNext() {
    console.log("ran gen next");
    if (sizesCursor < SIZES.length) {
        generateImages(SIZES[sizesCursor]);
        sizesCursor++;
    }
}

function changeImageCase(){
    return gulp.src(SOURCE_IMAGE_PATH + "/*.{jpg,png,JPG}")
        .pipe(rename(function(path) {
            // console.log(path);
               path.dirname = changeCase.lowerCase(path.dirname);
               path.basename = changeCase.lowerCase(path.basename);
               path.extname = changeCase.lowerCase(path.extname);

               console.log(path);

        }))
        .pipe(gulp.dest("images/renamed"))
        .on('end', generateNext)
}

gulp.task("default", function() {
    sizesCursor = 0;
    changeImageCase()
});

/* eslint-disable quote-props */

// Resize image:
// convert    logo.png   -thumbnail '128x128>'   -background transparent   -gravity center   -extent 128x128   -compose Copy_Opacity      original-resized.png

// List all available tasks
const organiser = require("gulp-organiser");
organiser.registerAll("./tasks", {
    "create-zip": {
        src: "./src",
        dest: "./dist"
    }
});

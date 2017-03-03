const gulp = require("gulp");
const organiser = require("gulp-organiser");
const path = require("path");
const shell = require("gulp-shell");

module.exports = organiser.register((task) => {
    const src = path.resolve(task.src[0]);
    const dest = path.resolve(task.dest);
    gulp.task(task.name, shell.task(`zip -r ${path.join(dest, "/build.zip")} ${path.join(src, "*")}`));
});

const gulp = require("gulp");
const organiser = require("gulp-organiser");
const path = require("path");
const shell = require("gulp-shell");

module.exports = organiser.register((task) => {
    const cwd = path.resolve(process.cwd());
    const src = path.resolve(task.src[0]);
    const dest = path.resolve(task.dest);
    gulp.task(task.name, shell.task(`cd ${src} && zip -r ${path.join(dest, "build.zip")} * && cd ${cwd}`));
});

const path = require("path");
const fs = require("fs");

module.exports = class DirList {
  static get(pathDir) {
    const dirArray = fs.readdirSync(pathDir);
    const pathRelative = path.relative(__dirname, pathDir);
    const catalogsList = dirArray.filter((dir) =>
      fs.lstatSync(path.join(pathDir, dir)).isDirectory()
    );

    const filesList = dirArray.filter((file) =>
      fs.lstatSync(path.join(pathDir, file)).isFile()
    );

    return { catalogsList, filesList };
  }
};

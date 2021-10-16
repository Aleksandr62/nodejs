const path = require("path");
const fs = require("fs");
const url = require("url");
const DirList = require("./dirList");

let baseDir = path.join(process.cwd());

module.exports = function postService(req, res) {
  try {
    let { catalog, file } = url.parse(req.url, true).query;
    if (!catalog) catalog = baseDir;
    else {
      baseDir = path.join(baseDir, catalog);
      catalog = baseDir;
    }

    const { catalogsList, filesList } = DirList.get(catalog);

    let fileHTML = "";
    if (file) {
      fileHTML = fs.readFileSync(path.join(baseDir, file), {
        encoding: "utf-8",
      });
    }

    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ catalogsList, filesList, fileHTML }));
  } catch (e) {
    console.log(e);
  }
};

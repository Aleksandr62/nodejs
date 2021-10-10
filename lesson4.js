const { createReadStream, createWriteStream } = require("fs");
const path = require("path");
const { Transform } = require("stream");

const pathToFile = path.join(__dirname, "./access.log");

const readStream = createReadStream(pathToFile);
const writeStreamByIp = {
  "89.123.1.41": createWriteStream("./89.123.1.41_requests.log"),
  "34.48.240.111": createWriteStream("./34.48.240.111_requests.log"),
};

readStream.on("data", (chunk) => {
  const findFirstIpInChunk = chunk.toString().match(/89\.123\.1\.41.*\n$/g);
  const findSecondIpInChunk = chunk.toString().match(/34\.48\.240\.111.*\n$/g);
  if (findFirstIpInChunk)
    writeStreamByIp["89.123.1.41"].write(findFirstIpInChunk.toString());
  if (findSecondIpInChunk)
    writeStreamByIp["34.48.240.111"].write(findSecondIpInChunk.toString());
});

readStream.on("error", (err) => console.log(err));

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const uploadDir = path.resolve(__dirname, "../uploads");

const archiver = require("archiver");

const fileZipper = (files) => {
  const id = "assignment_file_" + crypto.randomBytes(16).toString("hex");
  const zipFile = `${uploadDir}/${id}.zip`;

  const writeStream = fs.createWriteStream(zipFile);

  const archive = archiver("zip", {
    gzip: true,
    zlib: { level: 9 }, // Sets the compression level.
  });

  archive.on("error", function (err) {
    throw err;
  });

  // pipe archive data to the output file
  archive.pipe(writeStream);

  files.forEach(({ filename }) => {
    archive.file(`${uploadDir}/${filename}`, { name: filename });
    setTimeout(() => {
      fs.unlinkSync(`${uploadDir}/${filename}`);
    }, 5000);
  });

  archive.finalize();

  return zipFile;
};

module.exports = fileZipper;

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// ! Define the folder containing your media files
const mediaFolder = '/type/your/path';

// Function to select a random file from the folder
function selectRandomFile() {
  return new Promise((resolve, reject) => {
    fs.readdir(mediaFolder, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      const randomFile = files[Math.floor(Math.random() * files.length)];
      resolve(randomFile);
    });
  });
}

// Function to open the selected file with VLC player
function openFileWithVLC(fileName) {
  process.stdout.write("Opening file with VLC player:");
  console.log("\x1b[32m%s\x1b[0m", ` ${fileName}`);
  const filePath = path.join(mediaFolder, fileName);
  const vlcCommand = `vlc "${filePath}"`;
  exec(vlcCommand, (error, stdout, stderr) => {
    if (error) {
      console.error("\x1b[31m%s\x1b[0m", `Error executing command: ${error}`);
      return;
    }
    console.log("\x1b[32m%s\x1b[0m", "Done");
  });
}

// Select a random file and open it with VLC player
selectRandomFile()
  .then((fileName) => {
    openFileWithVLC(fileName);
  })
  .catch((error) => {
    console.error("\x1b[31m%s\x1b[0m", "Error selecting random file:", error);
  });

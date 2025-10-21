const {
  spawn
} = require("child_process");
const axios = require("axios");
const logger = require("./utils/log");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
app.get('/', function (_0x53dc08, _0x29d53f) {
  _0x29d53f.sendFile(path.join(__dirname, "/index.html"));
});
app.listen(port, () => {
  logger("Server is running on port " + port + "...", "[ Starting ]");
}).on("error", _0x5f4b66 => {
  if (_0x5f4b66.code === "EACCES") {
    logger("Permission denied. Cannot bind to port " + port + '.', "[ Error ]");
  } else {
    logger("Server error: " + _0x5f4b66.message, "[ Error ]");
  }
});
global.countRestart = global.countRestart || 0;
function startBot(_0x8cd26d) {
  if (_0x8cd26d) {
    logger(_0x8cd26d, "[ Starting ]");
  }
  const _0x1c9280 = spawn("node", ["--trace-warnings", "--async-stack-traces", "Main.js"], {
    'cwd': __dirname,
    'stdio': "inherit",
    'shell': true
  });
  _0x1c9280.on("close", _0x2ce859 => {
    if (_0x2ce859 !== 0 && global.countRestart < 5) {
      global.countRestart += 1;
      logger("Bot exited with code " + _0x2ce859 + ". Restarting... (" + global.countRestart + "/5)", "[ Restarting ]");
      startBot();
    } else {
      logger("Bot stopped after " + global.countRestart + " restarts.", "[ Stopped ]");
    }
  });
  _0x1c9280.on("error", _0x2ada96 => {
    logger("An error occurred: " + JSON.stringify(_0x2ada96), "[ Error ]");
  });
}
;
axios.get("https://raw.githubusercontent.com/shahadat-sahu/SHAHADAT-CHAT-BOT/main/package.json").then(_0x3a7ed9 => {
  logger(_0x3a7ed9.data.name, "[ NAME ]");
  logger("Version: " + _0x3a7ed9.data.version, "[ VERSION ]");
  logger(_0x3a7ed9.data.description, "[ DESCRIPTION ]");
})["catch"](_0x3823ae => {
  logger("Failed to fetch update info: " + _0x3823ae.message, "[ Update Error ]");
});
startBot();

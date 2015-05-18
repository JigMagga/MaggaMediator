module.exports = function () {
  if (typeof process !== 'undefined' && process.title.search("node") !== -1) {
    return require("./server.js");
  } else {
    return require("./client.js");

  }
}


crypto = require("crypto");
colors = require("./colors.js");

console.log(" ");
console.log( colors.fgGreen(), crypto.getCiphers(), colors.reset() );
console.log("");

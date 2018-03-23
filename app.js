const fs = require("fs");
const crypto = require("crypto");
const stdio =  require("stdio");
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);

function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}

//global variables


const delay = "40000" ;
const filePath = "/Apocalypto.2006.720p.BluRay.x264-[YTS.ME].mp4";
const rawDataPath = `RawData-${filePath.replace("/","")}`;
const cipheredFilePath = "/ciphered-" + filePath.replace("/","") + ".txt";
const decipheredFilePath = "/deciphered-" + filePath.replace("/","");

let _key = "cacnga153";
let _sourceFile = "";
let _destinationFile = "";

function cipher( file, key ){

	//variables
	let buffer = "";
	let cipheredData = "";
	let rawData = "";

	console.log(" ");
	console.log("CIPHERING initiated............");

	let cipher = crypto.createDecipher("aes-256-ctr", key);

	let streames = createStreames(file, _destinationFile);

	console.log(`Ciphering/Encryption streames => ${streames}`);

	streames.input.pipe(cipher).pipe(streames.output);

	console.log(".............CIPHERING will be done in a SHORT WHILE PLEASE WAIT...........");

}

function createStreames(inputReadStreamFilePath, outputWriteStreamFilePath){

	//CREATE READ AND WRITE STREAMS 
	//FOR THE INPUT AND OUTPUT SREAM RESPECTIVELY

	if(inputReadStreamFilePath && outputWriteStreamFilePath){

		let input = fs.createReadStream(inputReadStreamFilePath);
		let output = fs.createWriteStream(outputWriteStreamFilePath);

		return { "input" : input, "output" : output };

	}else{

		return console.error("Error: Parameters(files) missing ," 
				+ "cannot create input and output files for deciphering )");

	}



}

function decipher(file, key){

	//variables

	let buffer = "";
	let decipheredData = "";

	console.log(" ");
	console.log("DECIPHERING initiated...........");

	let decipher = crypto.createDecipher("aes-256-ctr", key);

	let streames = createStreames(file, _destinationFile);

	console.log(`Deciphering/Decryption Streames => ${streames}`);

	streames.input.pipe(decipher).pipe(streames.output);

	console.log(".............DECIPHERING will be done in a SHORT WHILE PLEASE WAIT...........");

 	
};

function recreate(file){

	console.prompt()

	var image = fs.readFile(file, function(err, data) {
	    fs.writeFile('output' + file.replace("/", ""), data, 'binary', function (err) {
	        if (err) {
	            console.log("There was an error writing the image");
	        }
	 
	        else {
	            console.log("There file was written");
	        }
	    });
	});

}

function config(action){

	stdio.question(`What file do you want to ${action}? (PLEASE INCUDE FILE EXTENSION EG. /file.txt)`, (err, sourceFile) => {

		action ? _sourceFile = sourceFile : console.error("Action not chosen.");

	    stdio.question(`What file do you want to ${action} to. (PLEASE INCUDE FILE EXTENSION EG. /file.txt)`, (err, destinationFile) => {

	    	action ? _destinationFile = destinationFile : console.error("Action not chosen.");

        	console.log(`The file ${sourceFile} will be ${action}ed and saved to ${destinationFile}`);

        	stdio.question("Enter your Key", (err, key) => {

        		//write key to key.txt file
        		fs.writeFile("key.txt", key, (err) => {

        			if(err){ console.error(`Error => ${err}`); return }

        			console.log("Key has been written to /key.txt");

        		});

        	 	//encrpt or decrypt file

        		if(key){

        			_key = key;

        			if(action === "Encrypt") { console.log( cipher( _sourceFile, key )); }
        		 	
        		 	if(action === "Decrypt") { console.log( decipher( _sourceFile, key )); }
        		 
        		
        		}else{

        			console.error("Key cannot be Empty");
        		}


        	 });

        });
    });

}

function run(){

	stdio.question('Do you want to Encrypt or Decrypt?', (err, action) => {


		if(action === "e" || action === "encrypt"){

			config("Encrypt");

		}else if(action === "d" || action === "decrypt"){

			config("Decrypt");

		}else{

			console.log("Pease Enter a valid answer/action to proceed or press [shift]+[C] to cancel.");

		}

	});
}

//Auto test  
//recreate(filePath);

run();
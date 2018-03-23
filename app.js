const fs = require("fs");
const crypto = require("crypto");
const stdio =  require("stdio");
const util = require('util');
const colors = require("./colors.js");
const cipherMethod = require("./cipherMethod.js");


//global variables

let _key = "cacnga153";
let _sourceFile = "";
let _destinationFile = "";


//Encipher the file
//Param: String "fullFilePath", String "password_key"

function cipher( file, key ){

	//variables
	let buffer = "";
	let cipheredData = "";

	log(" ");
	log("CIPHERING initiated............");

	log(`Cipher Method: ${cipherMethod}`);

	let cipher = crypto.createCipher(cipherMethod, key);

	let streames = createStreames(file, _destinationFile);

	log(`Ciphering/Encryption streames => ${streames}`);

	streames.input.pipe(cipher).pipe(streames.output);

	log(".............CIPHERING will be done in a SHORT WHILE PLEASE WAIT...........");

}


//CREATE READ AND WRITE STREAMS 
//FOR THE INPUT AND OUTPUT SREAM RESPECTIVELY
//Param: String, String

function createStreames(inputReadStreamFilePath, outputWriteStreamFilePath){



	if(inputReadStreamFilePath && outputWriteStreamFilePath){

		let input = fs.createReadStream(inputReadStreamFilePath);
		let output = fs.createWriteStream(outputWriteStreamFilePath);

		return { "input" : input, "output" : output };

	}else{

		return logErr("Error: Parameters(files) missing ," 
				+ "cannot create input and output files for deciphering )");

	}

}


//Decipher the file
//Param: String "fullFilePath", String "password_key"

function decipher(file, key){

	//variables

	let buffer = "";
	let decipheredData = "";

	log("DECIPHERING initiated...........");

	let decipher = crypto.createDecipher(cipherMethod, key);

	let streames = createStreames(file, _destinationFile);

	log(`Deciphering/Decryption Streames => ${streames}`);

	streames.input.pipe(decipher).pipe(streames.output);

	log(".............DECIPHERING will be done in a SHORT WHILE PLEASE WAIT...........");

};


//js efficient Object type checking
//Param: String, Object

function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;

}


//add empty row in console

function space(){

	console.log(` `);

}


//log out messages to the console
//Param: String

function log(msg){

	space();
	console.log(colors.fgCyan(), msg, colors.reset());
	space();

}


//logout errors to the console
//Param: String

function logErr(err){

		space();
		console.error(colors.fgMagenta(), err, colors.reset());
		space();

}


//parse urls with double quotation marks around them
//Param: String

function parseUrl(urlString){	

	if(urlString[0] === '"'){
		
		urlString = urlString.replace('"', "");

	}

	if(urlString[urlString.length-1] === '"'){

		urlString = urlString.replace('"', "");

	}

	log(`final parsed url => ${urlString}`);

	return urlString;

}


//user action configuration console wizard
//Para: action === String "Encrypt" / "Decrypt"

function startActionWizard(action){

	stdio.question(`What file do you want to ${action}? (PLEASE INCUDE FILE EXTENSION EG. FullFilePath.txt)`, (err, sourceFile) => {

		action ? _sourceFile = parseUrl(sourceFile) : logErr("Action not chosen.");

	    stdio.question(`What file do you want to ${action} to. (PLEASE INCUDE FILE EXTENSION EG. FullFilePath.txt)`, (err, destinationFile) => {

	    	action ? _destinationFile = parseUrl(destinationFile) : logErr("Action not chosen.");

        	log(`The file ${_sourceFile} will be ${action}ed and saved to ${_destinationFile}`);

        	stdio.question("Enter your Key", (err, key) => {

        		const keyFile = `${_destinationFile}___KEY.txt`;

        		//write key to key.txt file
        		fs.writeFile(keyFile, key, (err) => {

        			if(err){ logErr(`Error => ${err}`); return }

        			log(`Key has been written to ${keyFile}`);

        		});

        	 	//ENCRYPT or DECRYPT file

        		if(key){

        			_key = key;

        			if(action === "Encrypt") { log( cipher( _sourceFile, key )); }
        		 	
        		 	if(action === "Decrypt") { log( decipher( _sourceFile, key )); }
        		 
        		
        		}else{

        			logErr("Key cannot be Empty");
        		}


        	 });

        });
    });

}


//run the user action helper/wizard

function run(){

	stdio.question('Do you want to Encrypt or Decrypt?', (err, action) => {


		if(action === "e" || action === "encrypt"){

			startActionWizard("Encrypt");

		}else if(action === "d" || action === "decrypt"){

			startActionWizard("Decrypt");

		}else{

			log("Pease Enter a valid answer/action to proceed or press [shift]+[C] to cancel.");

		}

	});

}


run();
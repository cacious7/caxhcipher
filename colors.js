	
	//General 

	exports.reset 		= () => "\x1b[0m";
	exports.bright 		= () => "\x1b[1m";
	exports.dim 		= () => "\x1b[2m";
	exports.underscore 	= () => "\x1b[4m";
	exports.blink 		= () => "\x1b[5m";
	exports.reverse 	= () => "\x1b[7m";
	exports.Hidden 		= () => "\x1b[8m";


	//Foreground

	exports.fgBlack 	= () => "\x1b[30m";
	exports.fgRed 		= () => "\x1b[31m";
	exports.fgGreen 	= () => "\x1b[32m";
	exports.fgYellow 	= () => "\x1b[33m";
	exports.fgBlue 		= () => "\x1b[34m";
	exports.fgMagenta 	= () => "\x1b[35m";
	exports.fgCyan 		= () => "\x1b[36m";
	exports.fgWhite 	= () => "\x1b[37m";
	

	//Background

	exports.bgBlack 	= () =>	"\x1b[40m";
	exports.bgRed		= () => "\x1b[41m";
	exports.bgGreen 	= () => "\x1b[42m";
	exports.bgYellow 	= () => "\x1b[43m";
	exports.bgBlue 		= () => "\x1b[44m";
	exports.bgMagenta 	= () => "\x1b[45m";
	exports.bgCyan 		= () => "\x1b[46m";
	exports.bgWhite 	= () => "\x1b[47m";


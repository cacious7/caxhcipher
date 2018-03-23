
	const constant = /*"\x1b[0m" +*/ /*"%s"*/ " " ; 


	exports.reset 		= () => "\x1b[0m" + constant;
	exports.bright 		= () => "\x1b[1m" + constant;
	exports.dim 		= () => "\x1b[2m" + constant;
	exports.underscore 	= () => "\x1b[4m" + constant;
	exports.blink 		= () => "\x1b[5m" + constant;
	exports.reverse 	= () => "\x1b[7m" + constant;
	exports.Hidden 		= () => "\x1b[8m" + constant;

	exports.fgBlack 	= () => "\x1b[30m" + constant;
	exports.fgRed 		= () => "\x1b[31m" + constant;
	exports.fgGreen 	= () => "\x1b[32m" + constant;
	exports.fgYellow 	= () => "\x1b[33m" + constant;
	exports.fgBlue 		= () => "\x1b[34m" + constant;
	exports.fgMagenta 	= () => "\x1b[35m" + constant;
	exports.fgCyan 		= () => "\x1b[36m" + constant;
	exports.fgWhite 	= () => "\x1b[37m" + constant;

	exports.bgBlack 	= () =>	"\x1b[40m" + constant;
	exports.bgRed		= () => "\x1b[41m" + constant;
	exports.bgGreen 	= () => "\x1b[42m" + constant;
	exports.bgYellow 	= () => "\x1b[43m" + constant;
	exports.bgBlue 		= () => "\x1b[44m" + constant;
	exports.bgMagenta 	= () => "\x1b[45m" + constant;
	exports.bgCyan 		= () => "\x1b[46m" + constant;
	exports.bgWhite 	= () => "\x1b[47m" + constant;


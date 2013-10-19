var evaluate = require("../evaluate.js").evaluate;
var church_builtins = require("../church_builtins.js");

tests = [
	["\"unclosed", "1:1-1:1: Unclosed double quote"],
	["(", "1:1-1:1: Unclosed parens"],
	[" ( ", "1:2-1:2: Unclosed parens"],
	["(define x)", "1:1-1:10: Invalid define"],
	["define x 1", "1:1-1:6: Special form define cannot be used as an atom"],

	["(rejection-query true)", "1:1-1:22: rejection-query has the wrong number of arguments"],

	["undef", "1:1-1:5: undef is not defined"],
	["(+ (+ undef))", "1:7-1:11: undef is not defined", "1:7-1:11,1:4-1:12,1:1-1:13"],

	["(undef)", "1:2-1:6: undef is not defined", "1:2-1:6,1:1-1:7"],
	["(+ (+ (undef 1)))", "1:8-1:12: undef is not defined", "1:8-1:12,1:7-1:15,1:4-1:16,1:1-1:17"],

	["(+ 'a)", "1:2-1:2: \"a\" is not a number", "1:2-1:2,1:1-1:6"],
	["(second (pair 1 2))", "1:2-1:7: 2 does not have required pair structure", "1:2-1:7,1:1-1:19"]
]

for (var i = 0; i < tests.length; i++) {
	try {
		evaluate(tests[i][0]);
	} catch(err) {
		if (err.message != tests[i][1] || (tests[i].length == 3 && err.stack != tests[i][2])) {
			console.log("Failed:\n" +
						tests[i][0] +
						"\n\nGot error message:\n" +
						err.message +
						"\n\nExpected:\n" +
						tests[i][1] +
						"\n\nGot stack:\n" +
						err.stack +
						"\n\nExpected:\n" +
						tests[i][2] +
						"\n\n******\n");
	}
	

	}
}
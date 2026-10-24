import ast_default from "./ast.js";
import lib_default from "./lib.js";

// src/js/md/htm.js
var htm_default = (text) => {
	const [ast] = ast_default(text || "");
	for (const b of ast) b[1] = 2;
	return lib_default(ast);
};

export { htm_default as default };
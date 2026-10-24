import renderBlock from "./renderBlock.js";

// src/js/md/lib.js
var lib_default = (ast_li) => Array.isArray(ast_li) ? ast_li.map((b) => renderBlock(b, 0)).join("") : "";

export { lib_default as default };
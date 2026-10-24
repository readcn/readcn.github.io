import { newLi } from "../dom.js";

// src/js/dom/header.js
var header_default = () => {
	const [header, h1, b] = newLi("header", "h1", "b");
	header.className = "H1Txt";
	header.append(h1, b);
	return [
		header,
		h1,
		b
	];
};

export { header_default as default };
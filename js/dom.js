// src/js/dom.js
const D = document;
const B = D.body;
const css = (txt, root = D) => {
	const sheet = new CSSStyleSheet(), { adoptedStyleSheets: style } = root;
	sheet.replace(txt);
	if (!style.includes(sheet)) style.push(sheet);
	return sheet;
};
const newEl = D.createElement.bind(D);
const newLi = (...tag_li) => tag_li.map(newEl);
const clearDom = (dom) => dom.replaceChildren();
const cE = (name, cls) => {
	name = "c-" + name;
	customElements.define(name, cls);
};

export { B, D, cE, clearDom, css, newEl, newLi };
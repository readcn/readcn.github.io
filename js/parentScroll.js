// src/js/parentScroll.js
var parentScroll_default = (el) => {
	for (; el; el = el.parentElement || el.getRootNode() && el.getRootNode().host) if (el.tagName === "C-VS") return el.shadowRoot.firstChild;
};

export { parentScroll_default as default };
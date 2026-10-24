// src/js/md/htmD.js
const ENT_MAP = {
	amp: "&",
	quot: "\"",
	lt: "<",
	gt: ">",
	nbsp: "\xA0",
	copy: "©",
	AElig: "Æ",
	Dcaron: "Ď",
	frac34: "¾",
	HilbertSpace: "ℋ",
	DifferentialD: "ⅆ",
	ClockwiseContourIntegral: "∲",
	ngE: "≧̸",
	ouml: "ö",
	auml: "ä"
};
const isPunct = (c) => c > 32 && c < 127 && !/[a-zA-Z\d]/.test(String.fromCharCode(c));
const htmD = (str, decode_backslashes = 1) => str.replace(/\\([\s\S])|&(#[xX]?[0-9a-fA-F]+|\w+);/g, (m, esc, ent) => {
	if (esc) return decode_backslashes && isPunct(esc.charCodeAt(0)) ? esc : m;
	if (ent[0] === "#") {
		const code = +ent.replace("#", "0");
		return !isNaN(code) && code <= 1114111 ? String.fromCodePoint(code || 65533) : m;
	}
	return ENT_MAP[ent] || m;
});

export { htmD, isPunct };
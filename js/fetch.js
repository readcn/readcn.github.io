import { toastErr } from "./Toast.js";

// src/js/fetch.js
const tErr = (url, err) => setTimeout(() => toastErr((el) => el.textContent = url.slice(url.indexOf("//") + 2) + " " + err));
const F = async (url, opt) => {
	let r, status;
	try {
		r = await fetch(url, opt);
		status = r.status;
		if ([
			200,
			0,
			301,
			304
		].includes(status)) return r;
	} catch (e) {
		tErr(url, e);
		throw e;
	}
	tErr(url, status);
	throw r;
};
const f = (attr) => async (url, opt) => {
	return await (await F(url, opt))[attr]();
};
const fTxt = f("text");
const fJson = async (url, opt) => {
	const r = await fTxt(url, opt);
	if (r.length) return JSON.parse(r);
};
const fBin = async (url, opt) => new Uint8Array(await f("arrayBuffer")(url, opt));

export { F, f, fBin, fJson, fTxt };
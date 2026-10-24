import CODE_default from "./CODE.js";
import { split } from "../split.js";

// src/js/i18n/store.js
const KEY = "lang";
const get = () => {
	const local = localStorage[KEY];
	if (local !== void 0) return +local;
	const nav = navigator.language, idx = CODE_default.indexOf(nav);
	return idx >= 0 ? idx : Math.max(0, CODE_default.indexOf(split(nav, "-")[0]));
};
const set = (id) => {
	localStorage[KEY] = id;
};

export { get, set };
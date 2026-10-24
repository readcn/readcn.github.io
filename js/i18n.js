import CODE_default from "./i18n/CODE.js";
import { bc } from "./bc.js";

// src/js/i18n.js
let LANG;
let LANG_CODE;
const HOOK = /* @__PURE__ */ new Set(), [post, on] = bc("lang"), change = (id) => {
	LANG = id;
	LANG_CODE = CODE_default[id];
	HOOK.forEach((f) => f(LANG_CODE, LANG));
};
const LANG_LI = [];
const onLang = (func) => {
	if (LANG !== void 0) func(LANG_CODE, LANG);
	HOOK.add(func);
	return () => {
		HOOK.delete(func);
	};
};
const langSet = (id) => {
	if (id !== LANG) {
		post(id);
		change(id);
	}
};
on((id) => {
	if (id !== LANG) change(id);
});

export { LANG, LANG_CODE, LANG_LI, langSet, onLang };
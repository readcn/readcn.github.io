import { onLang } from "./i18n.js";

// src/js/fetchLang.js
const fetchLang = (getDict) => {
	let i18n, cur_code;
	const hook = /* @__PURE__ */ new Set();
	onLang(async (code) => {
		cur_code = code;
		i18n = await getDict(code);
		hook.forEach((f) => f(i18n, code));
	});
	return (refresh) => {
		hook.add(refresh);
		if (i18n) refresh(i18n, cur_code);
		return () => {
			hook.delete(refresh);
		};
	};
};

export { fetchLang };
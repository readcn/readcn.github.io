import { On } from "./On.js";
import { split } from "./split.js";

// src/js/route.js
let pre;
let hooks = [];
const HASH = "#";
const rm = (arr, item) => {
	const i = arr.indexOf(item);
	if (i > -1) arr.splice(i, 1);
};
const nowUrl = () => location.pathname.slice(1);
const route = (hook) => {
	hooks.push(hook);
	hook(nowUrl());
	return () => rm(hooks, hook);
};
const setPre = (url) => {
	pre = url;
};
const preUrl = () => pre;
const refresh = (url) => {
	url = url || nowUrl();
	hooks.forEach((f) => f(url, pre));
	setPre(url);
};
const removeSlash = (url) => url[0] == "/" ? url.slice(1) : url;
const setUrl = (url) => {
	url = removeSlash(url);
	if (url != pre) {
		const [path, hash = ""] = split(url, HASH), [p] = split(pre, HASH);
		setPre(url);
		if (path != p) {
			history.pushState(null, "", "/" + url);
			return 1;
		}
		if (location.hash.slice(1) != hash) {
			location.hash = hash;
			return;
		}
	}
	window.dispatchEvent(new HashChangeEvent("hashchange"));
};
const goto = (url) => {
	if (setUrl(url)) refresh(url);
};
pre = nowUrl();
if (location.hash) pre += location.hash;
On(window, { popstate: () => {
	const url = nowUrl();
	if (url != split(pre, HASH)[0]) refresh(url);
} });

export { goto, nowUrl, preUrl, refresh, removeSlash, route, setPre, setUrl };
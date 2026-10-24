import "./Scroll.js";
import { D, cE, css, newLi } from "./js/dom.js";
import "./Lg.js";
import "./js/a.js";
import "./Back.js";
import "./Blog.js";
import "./I18n.js";
import "./Nav.js";
import "./Toast.js";
import { On } from "./js/On.js";
import "./svg/yMNV4LRiATioRWWt0opQsw.js";
import { fetchLang } from "./js/fetchLang.js";
import { route } from "./js/route.js";
import "./js/rmWait.js";

// src/webc/Site/scroll.js
const KEEP_LI = ["", "blog"];
const pos_map = /* @__PURE__ */ new Map();
const scrollEl = (el) => el.shadowRoot.firstElementChild;
var scroll_default = (scroll, urlGet) => {
	let is_loading = false;
	const target = scrollEl(scroll), save = (url) => {
		if (!is_loading && KEEP_LI.includes(url)) pos_map.set(url, target.scrollTop);
	}, restore = (url) => {
		is_loading = false;
		const top = pos_map.get(url);
		target.scrollTop = KEEP_LI.includes(url) ? top || 0 : 0;
	}, leave = (old_url) => {
		save(old_url);
		is_loading = true;
	}, unScrollEvt = On(target, { scroll: () => save(urlGet()) }), unLoadedEvt = On(scroll, { loaded: () => restore(urlGet()) }), unScroll = () => {
		unScrollEvt();
		unLoadedEvt();
	};
	return [
		leave,
		restore,
		unScroll
	];
};

// src/webc/Site/I18N.js
var I18N_default = async (code) => (await import(`./i18n/${code}.js`)).default[4];

// src/webc/Site/_.styl
css("body{margin:0;overflow:hidden}.BtnC.rss{& .Ico{background-image:var(--yMNV4LRiATioRWWt0opQsw)}}c-site{width:100%;height:100dvh;display:flex;position:absolute;inset:0;&>c-vs{&>*{max-width:1648px}&>nav.Nav{align-self:center;width:100%}&>main.demo{box-sizing:border-box;flex-direction:column;width:calc(100% - 32px);max-width:800px;margin:0 auto 64px;display:flex}}}");

// src/webc/Site.js
const BLOG_PREFIX = "blog/";
const RSS_LABEL = "RSS";
const fLang = fetchLang(I18N_default);
const keyParse = (url) => {
	if (!url || url === "blog") return "";
	return url.startsWith(BLOG_PREFIX) ? url.slice(5) : url;
};
const rssUrl = (code) => "/rss/" + code + ".xml";
const domNew = (host) => {
	const [scroll, nav, nav_l, nav_r, back_el, rss_el, rss_ico, i18n_el, main_el, blog_el] = newLi("c-vs", "nav", "c-nav", "c-nav", "c-back", "a", "i", "c-i18n", "main", "c-blog");
	nav.className = "Nav";
	main_el.className = "demo Lg";
	back_el.setAttribute("href", "/");
	rss_el.className = "BtnC rss Lg";
	rss_el.href = "/rss.xml";
	rss_el.target = "_blank";
	rss_el.title = RSS_LABEL;
	rss_el.setAttribute("aria-label", RSS_LABEL);
	rss_ico.className = "Ico";
	rss_el.append(rss_ico);
	blog_el.prefix = "/";
	blog_el.mdUrl = (key, lang) => "/i18n/" + lang + "/" + key + ".md";
	nav_l.append(back_el);
	nav_r.append(rss_el, i18n_el);
	nav.append(nav_l, nav_r);
	main_el.append(blog_el);
	scroll.append(nav, main_el);
	host.append(scroll);
	return [
		scroll,
		back_el,
		rss_el,
		blog_el
	];
};
const siteMount = (host) => {
	const [scroll, back_el, rss_el, blog_el] = domNew(host), rss_link = D.getElementById("rss");
	let cur_url = "";
	const [scrollSave, scrollRestore, unScroll] = scroll_default(scroll, () => cur_url), unRoute = route((url) => {
		scrollSave(cur_url);
		cur_url = url;
		const sub_key = keyParse(url);
		back_el.style.display = sub_key ? "" : "none";
		blog_el.load(sub_key);
		scrollRestore(url);
	}), unLang = fLang(async (i18n, code) => {
		const title = i18n[0], feed_href = rssUrl(code);
		blog_el.title = title;
		rss_el.href = feed_href;
		if (rss_link) {
			rss_link.href = feed_href;
			rss_link.title = title;
		}
		const mod = await import(
			/* @vite-ignore */
			`./_/blog/${code}.js`
);
		blog_el._ = mod.default;
	});
	return () => {
		unRoute();
		unLang();
		unScroll();
	};
};
cE("site", class extends HTMLElement {
	connectedCallback() {
		this.$ = siteMount(this);
	}
	disconnectedCallback() {
		this.$();
	}
});

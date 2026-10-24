import { D, cE, clearDom, css, newEl, newLi } from "./js/dom.js";
import { fetchLang } from "./js/fetchLang.js";
import "./Btn.js";
import "./H1Txt.js";
import "./Md.js";
import "./O.js";
import "./svg/-nA-AlU7upHrVe4REIMkdw.js";
import headerNew from "./js/dom/header.js";
import { fTxt } from "./js/fetch.js";
import { LANG_CODE } from "./js/i18n.js";

// src/webc/Blog/I18N.js
var I18N_default = async (code) => (await import(`./i18n/${code}.js`)).default[1];

// src/webc/Blog/_.styl
css("c-blog{box-sizing:border-box;font-weight:inherit;flex-direction:column;gap:32px;width:100%;max-width:800px;margin:auto;padding:20px 16px 24px;display:flex;&>header.H1Txt{margin:6px 0}&>time{color:#999;letter-spacing:1px;text-align:right;font-size:14px}&>b{font-weight:inherit;flex-direction:column;gap:32px;display:flex;&>h2{color:#333;font-variation-settings:\"wght\" 250;margin:0;font-size:24px;font-weight:250;line-height:1.2}&>b{font-weight:inherit;flex-direction:column;gap:14px;display:flex;&>h3.O{font-size:18px;font-weight:inherit;margin:0;line-height:1.4;&>a{color:inherit;text-decoration:none;transition:color .2s;&:hover{color:#0071e3}}}&>c-md{font-size:14px;font-weight:inherit;line-height:1.65;display:block}&>b{color:#999;font-weight:inherit;align-items:center;gap:12px;margin-left:20px;display:flex;&:after{content:\"\";background-image:var(---nA-AlU7upHrVe4REIMkdw);background-repeat:repeat-x;flex:1;height:1px}&>.Btn{border-radius:16px;height:32px;min-height:32px;max-height:32px;padding:0 14px;font-size:13px}&>b{font-size:13px;font-weight:inherit;order:1}}}}}");

// src/webc/Blog.js
const PROP_LI = [
	"prefix",
	"_",
	"title"
];
const fLang = fetchLang(I18N_default);
const itemNode = ([, href, title, summary, month_day, btn_txt]) => {
	const [item, h3, a, md, foot, btn, b_date] = newLi("b", "h3", "a", "c-md", "b", "a", "b");
	h3.className = "O";
	a.href = btn.href = href;
	a.textContent = title;
	if (summary) md.value = summary;
	btn.className = "Btn";
	btn.textContent = btn_txt;
	b_date.textContent = month_day;
	h3.append(a);
	foot.append(btn, b_date);
	item.append(h3, md, foot);
	return item;
};
const yearNode = ([year, item_li]) => {
	const year_wrap = newEl("b");
	if (year) {
		const h2 = newEl("h2");
		h2.textContent = year;
		year_wrap.append(h2);
	}
	item_li.sort(([date_a = ""], [date_b = ""]) => date_b.localeCompare(date_a));
	year_wrap.append(...item_li.map(itemNode));
	return year_wrap;
};
const yearMapBuild = (data, prefix, read_more_txt) => {
	const year_map = /* @__PURE__ */ new Map();
	Object.entries(data).forEach(([key, val_li]) => {
		if (!Array.isArray(val_li)) return;
		const [title, summary, date, custom_btn_txt] = val_li, btn_txt = custom_btn_txt || read_more_txt, year = date ? date.slice(0, 4) : "", month_day = date ? date.slice(5) : "";
		let item_li = year_map.get(year);
		if (!item_li) year_map.set(year, item_li = []);
		item_li.push([
			date,
			prefix + key,
			title,
			summary,
			month_day,
			btn_txt
		]);
	});
	return year_map;
};
const h1Header = (txt) => {
	const [header, h1, b] = headerNew();
	h1.textContent = txt;
	b.remove();
	return header;
};
const listRender = (el, data, read_more_txt) => {
	clearDom(el);
	const { title: site_title, prefix = "/" } = el;
	if (site_title) {
		D.title = site_title;
		el.append(h1Header(site_title));
	}
	const year_map = yearMapBuild(data, prefix, read_more_txt), year_el_li = Array.from(year_map.entries()).sort(([year_a], [year_b]) => year_b.localeCompare(year_a)).map(yearNode);
	el.append(...year_el_li);
};
const mdStripH1 = (md) => {
	const full = "\n" + md.trimStart(), pos = full.indexOf("\n#");
	return (pos !== -1 ? full.slice(full.indexOf("\n", pos + 1) + 1) : md).trimStart();
};
const artRender = async (el, key) => {
	clearDom(el);
	if (!key) return;
	const { _: data, title: site_title, mdUrl } = el, [title = key, , date = ""] = data?.[key] || [], md_el = newEl("c-md");
	D.title = site_title ? title + " - " + site_title : title;
	el.append(h1Header(title), md_el);
	if (date) {
		const time = newEl("time");
		time.dateTime = time.textContent = date;
		el.append(time);
	}
	if (!mdUrl) return;
	const md = await fTxt(mdUrl(key, LANG_CODE));
	if (md) md_el.value = mdStripH1(md);
};
const blogRender = async (el) => {
	const { _key, _val, _read_more } = el;
	if (_key) await artRender(el, _key);
	else if (_val && _read_more) listRender(el, _val, _read_more);
	el.dispatchEvent(new Event("loaded", { bubbles: true }));
};
const blogMount = (el) => {
	const unLang = fLang((i18n) => {
		el._read_more = i18n[0];
		blogRender(el);
	});
	PROP_LI.forEach((k) => {
		if (Object.hasOwn(el, k)) {
			const val = el[k];
			delete el[k];
			el[k] = val;
		}
	});
	return unLang;
};
cE("blog", class extends HTMLElement {
	get mdUrl() {
		return this._md_url;
	}
	set mdUrl(fn) {
		this._md_url = fn;
	}
	get title() {
		return this._title;
	}
	set title(val) {
		if (this._title === val) return;
		this._title = val;
		blogRender(this);
	}
	get prefix() {
		return this._prefix;
	}
	set prefix(val) {
		if (this._prefix === val) return;
		this._prefix = val;
		blogRender(this);
	}
	get _() {
		return this._val;
	}
	set _(val) {
		this._val = val;
		blogRender(this);
	}
	load(key) {
		if (this._key === key) return;
		this._key = key;
		blogRender(this);
	}
	connectedCallback() {
		this.$ = blogMount(this);
	}
	disconnectedCallback() {
		this.$();
	}
});

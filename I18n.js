import "./Scroll.js";
import { cE, css, newEl, newLi } from "./js/dom.js";
import { On } from "./js/On.js";
import { fetchLang } from "./js/fetchLang.js";
import "./Btn.js";
import { LANG, LANG_LI, langSet } from "./js/i18n.js";
import BoxX from "./BoxX.js";
import { set } from "./js/i18n/store.js";
import "./svg/icnxqFCv5gDmE2qMWcuofA.js";
import "./js/i18n/init.js";

// src/webc/I18n/I18N.js
var I18N_default = async (code) => (await import(`./i18n/${code}.js`)).default[3];

// src/webc/I18n/open.js
const fLang$1 = fetchLang(I18N_default);
const open = () => {
	const BTN = "Btn", dialog = BoxX(), [main, title, con, con_inner] = newLi("main", "h6", "c-vs", "b"), cur_lang = LANG ?? 0;
	main.className = "I18n";
	On(dialog, { close: fLang$1((i18n) => {
		title.innerText = i18n[0];
	}) });
	con_inner.append(...LANG_LI.map(([name, id]) => {
		const btn = newEl("button");
		btn.innerText = name;
		btn.className = cur_lang == id ? "Btn Main" : BTN;
		On(btn, { click: () => {
			set(id);
			langSet(id);
			dialog.close();
		} });
		return btn;
	}));
	con.append(con_inner);
	main.append(title, con);
	dialog.append(main);
};

// src/webc/I18n/com.js
const fLang = fetchLang(I18N_default);
cE("i18n", class extends HTMLElement {
	connectedCallback() {
		if (this.firstChild) return;
		const [btn, icon] = newLi("button", "i");
		btn.className = "BtnC lang" + " Lg";
		btn.type = "button";
		this.$ = fLang((i18n) => {
			btn.setAttribute("aria-label", i18n[1]);
		});
		icon.className = "Ico";
		btn.append(icon);
		On(btn, {
			click: open,
			keydown: (e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					open();
				}
			}
		});
		this.append(btn);
	}
	disconnectedCallback() {
		if (this.$) {
			this.$();
			this.$ = null;
		}
	}
});

// src/webc/I18n/_.styl
css(".BtnC.lang{margin:auto;& .Ico{background-image:var(--icnxqFCv5gDmE2qMWcuofA)}}.I18n{min-width:300px;overflow:hidden;&>h6{color:#222;text-align:center;margin:0 0 12px;font-size:16px;font-weight:600}&>c-vs{flex:1;height:0;min-height:0;max-height:80dvh;margin-top:8px;&>b{flex-wrap:wrap;justify-content:center;gap:6px 8px;display:flex;@media (width<=600px){gap:4px 6px}}& .Btn{border-radius:6px;height:28px;min-height:28px;max-height:28px;padding:0 8px;font-size:12px;font-weight:300;@media (width<=600px){box-shadow:none;color:#333;height:auto;min-height:0;max-height:none;padding:2px 4px;transform:none;&:before,&:after{display:none}&:hover,&:active{box-shadow:none;color:#0071e3;transform:none}&.Main{color:#000;border-bottom:1px solid;border-radius:0;&:hover,&:active{color:#0071e3}}}}}}dialog.Box:has(>.I18n){max-width:640px}");

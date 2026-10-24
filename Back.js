import { cE, css, newLi } from "./js/dom.js";
import { fetchLang } from "./js/fetchLang.js";
import "./svg/yLywm34NhXqeNsG3Jj4l9g.js";

// src/webc/Back/I18N.js
var I18N_default = async (code) => (await import(`./i18n/${code}.js`)).default[0];

// src/webc/Back/_.styl
css(".BtnC.back{&:after{content:none}& .Ico{background-image:var(--yLywm34NhXqeNsG3Jj4l9g)}&.Big{background-color:#fff9;flex-shrink:0}}");

// src/webc/Back.js
const fLang = fetchLang(I18N_default);
cE("back", class extends HTMLElement {
	static get observedAttributes() {
		return ["href"];
	}
	attributeChangedCallback(name, _, new_val) {
		if (name === "href") {
			const btn = this.querySelector("a");
			if (btn) btn.href = new_val || "";
		}
	}
	connectedCallback() {
		if (this.firstChild) return;
		const href = this.getAttribute("href"), [btn, icon] = newLi("a", "i");
		btn.className = "BtnC back";
		if (href) btn.href = href;
		icon.className = "Ico";
		btn.append(icon);
		this.append(btn);
		this.$ = fLang((i18n) => {
			const val = i18n[0];
			btn.title = val;
			btn.setAttribute("aria-label", val);
		});
	}
	disconnectedCallback() {
		this.$();
	}
});

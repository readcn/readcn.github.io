import "./Scroll.js";
import { cE, css } from "./js/dom.js";
import navScroll from "./js/navScroll.js";

// src/webc/Nav/_.styl
css("nav.Nav{box-sizing:border-box;pointer-events:none;top:var(--top);z-index:9999;justify-content:space-between;align-items:center;width:100%;margin:0 auto;display:flex;position:sticky;&.D,&.I{transition:top .3s}&.D{top:0}&>c-nav{pointer-events:auto}}c-nav{box-sizing:border-box;align-items:center;gap:12px;padding:16px;display:flex;&>*{display:flex}}");

// src/webc/Nav.js
cE("nav", class extends HTMLElement {
	connectedCallback() {
		const el = this.closest("nav.Nav") || this;
		if (!el.$) el.$ = navScroll(el);
		el._navC = (el._navC || 0) + 1;
		this._scrollEl = el;
	}
	disconnectedCallback() {
		const el = this._scrollEl;
		if (el) {
			el._navC = (el._navC || 1) - 1;
			if (el._navC <= 0 && el.$) {
				el.$();
				el.$ = null;
			}
			this._scrollEl = null;
		}
	}
});

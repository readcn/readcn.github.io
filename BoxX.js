import { B, css, newEl } from "./js/dom.js";
import { On } from "./js/On.js";
import { fetchLang } from "./js/fetchLang.js";
import Box from "./Box.js";
import "./svg/nRuFuKrYvSRvrlp-S_4hMQ.js";

// src/webc/BoxX/I18N.js
var I18N_default = async (code) => (await import(`./i18n/${code}.js`)).default[2];

// src/webc/BoxX/_.styl
css("dialog.Box.X>a.X{backdrop-filter:blur(16px);cursor:pointer;z-index:1;background:#ffffffd9;border:none;border-radius:50%;justify-content:center;align-items:center;width:32px;height:32px;margin-left:-16px;transition:transform .3s,background .3s,box-shadow .3s,opacity .3s;display:flex;position:absolute;bottom:-64px;left:50%;box-shadow:0 8px 20px #0000000f,0 0 0 1px #0000000a;&:before{content:\"\";opacity:.6;pointer-events:none;background:var(--nRuFuKrYvSRvrlp-S_4hMQ) 50%/18px no-repeat;transition:opacity .3s;position:absolute;inset:0}&:hover{backdrop-filter:blur(16px);background:#ffffffe0;transform:rotate(90deg);box-shadow:0 8px 20px #0000000f,0 0 0 1px #0000000a,inset 0 0 3px #666;&:before{opacity:1}}&:active{background:#ffffffa6;box-shadow:0 2px 4px #0000000f,0 0 0 1px #0000000a,inset 0 2px 4px #0002;&:before{opacity:.7}}}@media (height<=900px){dialog.Box.X{transform:translateY(-32px)}}");

// src/webc/BoxX.js
const fLang = fetchLang(I18N_default);
const xClose = (dialog) => {
	const x_btn = newEl("a");
	x_btn.className = "X";
	dialog.prepend(x_btn);
	On(x_btn, { click: () => dialog.close() });
	On(dialog, { close: fLang((i18n) => {
		x_btn.title = i18n[0];
	}) });
	return dialog;
};
const escClose = (dialog) => {
	On(dialog, { close: On(B, { keyup: (e) => {
		if (27 === e.keyCode) {
			const { target } = e;
			if (["INPUT", "TEXTAREA"].includes(target.tagName)) {
				target.blur();
				return;
			}
			dialog.close();
		}
	} }) });
	return dialog;
};
const BoxX = () => {
	const dialog = Box();
	dialog.classList.add("X");
	return xClose(escClose(dialog));
};
var BoxX_default = () => {
	const dialog = BoxX();
	dialog.classList.add("FFF");
	return dialog;
};

export { BoxX, BoxX_default as default };
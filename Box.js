import { B, css, newEl } from "./js/dom.js";
import { On } from "./js/On.js";

// src/webc/Box/_.styl
css("dialog.Box{z-index:2147483647;background:0 0;border:none;outline:none;width:100%;max-width:min(100vw - 32px,360px);margin:auto;padding:0;position:fixed;inset:0;overflow:visible;&.FFF>:not(a.X){backdrop-filter:blur(16px);box-sizing:border-box;user-select:none;background:#ffffffe6;border-radius:24px;flex-direction:column;align-items:stretch;width:100%;min-width:280px;max-height:80dvh;margin:0 auto;padding:24px 20px;display:flex;box-shadow:0 20px 40px #0000001a,0 1px 3px #00000005}&>.Lg{box-sizing:border-box;text-align:center;background-color:#ffffffe0;border-radius:24px;flex-direction:column;align-items:stretch;gap:16px;max-height:80dvh;margin:0 auto;padding:24px;display:flex;box-shadow:0 20px 40px #0000001a,0 1px 3px #00000005;& h3{color:#333;margin:0;font-size:20px}& p{color:#666}}&::backdrop{backdrop-filter:blur(4px);background-color:#00000020}}");

// src/webc/Box.js
var Box_default = () => {
	const dialog = newEl("dialog");
	dialog.className = "Box";
	On(dialog, {
		close: () => B.removeChild(dialog),
		cancel: (e) => e.preventDefault()
	});
	B.prepend(dialog);
	setTimeout(() => dialog.showModal());
	return dialog;
};

export { Box_default as default };
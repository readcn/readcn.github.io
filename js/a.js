import { B } from "./dom.js";
import { goto } from "./route.js";
import { selfA } from "./selfA.js";

// src/js/a.js
B.addEventListener("click", (e) => {
	if (e.defaultPrevented) return;
	let p = e.target;
	while (p) {
		const { nodeName } = p;
		if (nodeName == "A") {
			const { href } = p;
			if (href) {
				const url = selfA(p, e);
				if (url != void 0) goto(url);
				else if (!p.target) p.target = "_blank";
			}
			break;
		} else if (nodeName == "BODY") break;
		p = p.parentNode;
	}
});

// src/js/md/safe.js
const WHITESPACE = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;
const PROTO_PATTERN = /^[a-z0-9./+-]+$/;
const BAD_TAGS = /* @__PURE__ */ new Set([
	"SCRIPT",
	"IFRAME",
	"OBJECT",
	"EMBED",
	"FRAME",
	"FRAMESET",
	"NOEMBED",
	"NOSCRIPT",
	"STYLE",
	"TEMPLATE",
	"LINK",
	"META",
	"BASE"
]);
const URI_ATTR = /* @__PURE__ */ new Set([
	"href",
	"src",
	"action",
	"formaction",
	"poster",
	"xlink:href"
]);
var safe_default = (html) => {
	const doc = new DOMParser().parseFromString(html, "text/html"), walk = (node) => {
		for (const el of Array.from(node.childNodes)) {
			const { nodeType, tagName } = el;
			if (nodeType === 1) {
				if (BAD_TAGS.has(tagName)) {
					el.remove();
					continue;
				}
				for (const attr of Array.from(el.attributes)) {
					const { name, value } = attr, attr_name = name.toLowerCase();
					if (attr_name.startsWith("on")) {
						el.removeAttribute(name);
						continue;
					}
					if (URI_ATTR.has(attr_name)) {
						const val = value.replace(WHITESPACE, "").toLowerCase(), idx = val.indexOf(":");
						if (idx !== -1) {
							const proto = val.slice(0, idx);
							if (!val.startsWith(".") && !val.startsWith("/") && !PROTO_PATTERN.test(proto) || ["javascript", "vbscript"].includes(proto) || proto === "data" && !val.startsWith("data:image/")) {
								el.removeAttribute(name);
								continue;
							}
						}
					}
				}
				walk(el);
			}
		}
	};
	walk(doc.body);
	return doc.body.innerHTML;
};

export { safe_default as default };
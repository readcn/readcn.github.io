import { I_ATTR1, I_ATTR2, I_ATTR3, I_CONTENT, I_TYPE, T_BLOCKQUOTE, T_BR, T_CODE, T_CODE_BLOCK, T_DEL, T_EM, T_H, T_HTML, T_IMG, T_LINK, T_LIST, T_LIST_ITEM, T_MATH_BLOCK, T_MATH_INLINE, T_P, T_STRONG, T_TABLE, T_TEXT, T_THEMATIC_BREAK } from "./ast.js";
import htmE_default from "./htmE.js";

// src/js/md/renderBlock.js
const safeEncodeURI = (str) => str.replace(/%[0-9a-fA-F]{2}|./g, (m) => m.length === 3 || /[\w.\-~!*'();:@&=+$,/?#]/.test(m) ? m : encodeURIComponent(m));
const safeUrl = (x) => htmE_default(safeEncodeURI(x || ""));
const titleAttr = (t) => t ? " title=\"" + htmE_default(t) + "\"" : "";
const renderChildren = (child_li, is_tight) => Array.isArray(child_li) ? child_li.map((c) => renderBlock(c, is_tight)).join("") : "";
const renderInlines = (inline_li) => {
	if (typeof inline_li === "string") return htmE_default(inline_li);
	if (!Array.isArray(inline_li)) return "";
	let html = "";
	for (const node of inline_li) {
		const type = node[0];
		switch (type) {
			case 12:
				html += htmE_default(node[2]);
				break;
			case 13:
			case 14:
			case 18:
			case 15: {
				const t = type === 13 ? "strong" : type === 14 ? "em" : type === 18 ? "del" : "code";
				html += "<" + t + ">" + renderInlines(node[2]) + "</" + t + ">";
				break;
			}
			case 16:
				html += "<a href=\"" + safeUrl(node[3]) + "\"" + titleAttr(node[4]) + ">" + renderInlines(node[2]) + "</a>";
				break;
			case 17:
				html += "<img src=\"" + safeUrl(node[3]) + "\" alt=\"" + htmE_default(node[2] || "") + "\"" + titleAttr(node[4]) + ">";
				break;
			case 19:
				html += "<br>";
				break;
			case 10:
				html += node[2] || "";
				break;
			case 20: html += "<c-math>" + node[2] + "</c-math>";
		}
	}
	return html;
};
const renderRow = (cell_li, tag, align_li) => "<tr>" + cell_li.map((cell, i) => "<" + tag + (align_li[i] ? " class=\"" + align_li[i] + "\"" : "") + ">" + renderInlines(cell) + "</" + tag + ">").join("") + "</tr>";
const renderBlock = (node, is_tight_parent = 0) => {
	switch (node[0]) {
		case 3: return is_tight_parent ? renderInlines(node[2]) : "<p>" + renderInlines(node[2]) + "</p>";
		case 2: {
			const level = node[3];
			return "<h" + level + ">" + renderInlines(node[2]) + "</h" + level + ">";
		}
		case 4: {
			const lang = node[5], code = node[2];
			return "<pre><code" + (lang ? " class=\"language-" + lang + "\"" : "") + ">" + htmE_default(code || "") + "</code></pre>";
		}
		case 5: {
			const is_alert = node[3], alert_type = node[4], b_html = renderChildren(node[2], 0);
			return is_alert ? "<blockquote class=\"q " + alert_type.toLowerCase() + "\"><b class=\"qt\"><i class=\"qi\"></i>" + alert_type + "</b>" + b_html + "</blockquote>" : "<blockquote>" + b_html + "</blockquote>";
		}
		case 6: {
			const list_type = node[3], start_num = node[4], tight = node[5], l_html = renderChildren(node[2], tight === 1);
			return list_type === 2 ? "<ol" + (start_num !== 1 ? " start=\"" + start_num + "\"" : "") + ">" + l_html + "</ol>" : "<ul>" + l_html + "</ul>";
		}
		case 7: {
			const is_task = node[3], is_checked = node[4], li_html = renderChildren(node[2], is_tight_parent);
			return is_task ? "<li><input type=\"checkbox\" disabled" + (is_checked ? " checked" : "") + "> " + li_html + "</li>" : "<li>" + li_html + "</li>";
		}
		case 8: return "<hr>";
		case 9: {
			const align_li = node[3] || [], row_li = node[2] || [];
			if (!row_li.length) return "";
			let html = "<table><thead>" + renderRow(row_li[0], "th", align_li) + "</thead>";
			if (row_li.length > 1) {
				html += "<tbody>";
				for (let r = 1; r < row_li.length; ++r) html += renderRow(row_li[r], "td", align_li);
				html += "</tbody>";
			}
			return html + "</table>";
		}
		case 10: return node[2] || "";
		case 11: return "<c-math>\n" + node[2] + "\n</c-math>";
		default: return "";
	}
};

export { renderBlock as default };
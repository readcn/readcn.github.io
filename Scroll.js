import { D, cE, css, newEl } from "./js/dom.js";
import { On } from "./js/On.js";
import "./svg/giUzPhnYmbjOG3VzqseH5g.js";
import "./svg/yhI9x3s8u28j5vUN45useQ.js";
import "./svg/sgoOOaKyF_KnkUoRKxWczw.js";

// src/webc/Scroll/_.styl
css("c-vs,c-hs{display:block;position:relative;&::part(scroll){scrollbar-width:none;width:100%;height:100%;display:flex;position:relative;overflow:auto}&::part(bar){user-select:none;z-index:13000;--si-anim:none;--si-bg:#7d7d7d99;transition:all .2s,opacity 1s,box-shadow 1s;display:block;position:absolute;bottom:0}&::part(bar):hover,&::part(drag){--si-bg:#7d7d7dcc;background:#0001;box-shadow:inset 0 1px 6px #fffc,inset 0 0 3px #0003;opacity:1!important}&::part(si){animation:var(--si-anim);background:var(--si-bg);border-radius:3px;margin:auto;transition:all .2s,opacity 1s,box-shadow 1s;display:block;position:absolute}}c-vs{--sh:inset 3px 0 3px -3px #00000020, inset -3px 0 3px -3px #0002;flex-direction:column;width:100%;height:100%;display:flex;&::part(i){flex-direction:column;width:100%;min-height:100%;display:flex}&::part(scroll){flex:1;min-height:0;display:block;overflow-x:hidden}&::part(bar){width:13px;height:100%;top:0;right:0}&::part(bar):hover,&::part(drag){cursor:var(--cursorScrollvSvg);width:21px}&::part(si){cursor:var(--cursorScrollvSvg);width:7px;left:0;right:0}}c-hs{--sh:inset 0 3px 3px -3px #00000020, inset 0 -3px 3px -3px #0002;width:100%;&::part(i){width:max-content;min-width:100%;height:100%;display:flex}&::part(scroll){width:100%;display:block;overflow-y:hidden}&::part(bar){width:100%;height:13px;left:0;right:0}&::part(bar):hover,&::part(drag){cursor:var(--cursorScrollhSvg);height:21px}&::part(si){cursor:var(--cursorScrollhSvg);height:7px;top:0;bottom:0}}body.drag{cursor:var(--giUzPhnYmbjOG3VzqseH5g) 8 7,grabbing}:root{--cursorScrollhSvg:var(--yhI9x3s8u28j5vUN45useQ) 10 10, ew-resize;--cursorScrollvSvg:var(--sgoOOaKyF_KnkUoRKxWczw) 10 10, ns-resize}");

// src/webc/Scroll.js
(() => {
	const supports_none = CSS.supports("scrollbar-width", "none"), { round, max, min } = Math, CLIENT = "client", SCROLL = "scroll", DRAG = "drag", PX = "px", mk = (tag, part, ...kids) => {
		const e = newEl(tag);
		if (part) e.setAttribute("part", part);
		e.append(...kids);
		return e;
	}, init = (size, pos, axis) => {
		if (!supports_none) return;
		const style_size = size.toLowerCase(), style_pos = pos.toLowerCase(), client_size = CLIENT + size, scroll_size = SCROLL + size, scroll_pos = SCROLL + pos, client_pos = CLIENT + axis;
		return (ct) => {
			let timer_bar, ptr_unbind, timer_resize, pre_st = -1;
			const inner = ct.firstElementChild, si = mk("i", "si"), bar = mk("b", "bar", si), geo = (sih = si[client_size]) => {
				const ch = ct[client_size], sh = inner[scroll_size];
				return [
					sh - ch,
					max(1, ch - sih - 6),
					sih,
					ch,
					sh
				];
			}, up = (h) => {
				const [ds, db, , ch, sh] = geo(h);
				if (ds <= 0) return;
				const parent = ct.parentNode;
				if (!bar.parentNode) {
					parent.appendChild(bar);
					si.style[style_size] = max(16, round(ch * ch / sh)) + PX;
				}
				const st = max(0, min(ct[scroll_pos], ds));
				if (pre_st != -1 && pre_st != st) {
					bar.style.opacity = 1;
					clearTimeout(timer_bar);
					timer_bar = setTimeout(() => bar.style.opacity = 0, 1e3);
				}
				pre_st = st;
				si.style[style_pos] = 3 + round(db * st / ds) + PX;
			}, onDown = (e) => {
				if (ptr_unbind) return;
				const bd = D.body;
				bd.setPointerCapture(e.pointerId);
				bd.classList.add(DRAG);
				bar.part.add(DRAG);
				let pre = e[client_pos];
				const detach = () => {
					bd.classList.remove(DRAG);
					bar.part.remove(DRAG);
					un_ptr();
					ptr_unbind = null;
				}, un_ptr = On(bd, {
					pointermove: (evt) => {
						const [ds, db] = geo();
						ct[scroll_pos] += round(ds * (evt[client_pos] - pre) / db);
						pre = evt[client_pos];
					},
					pointerup: detach,
					lostpointercapture: detach
				});
				ptr_unbind = detach;
			}, onClick = (e) => {
				const top = bar.getBoundingClientRect()[style_pos], [ds, db, sih] = geo();
				ct[scroll_pos] = round(ds * max(min((e[client_pos] - top - 3 - sih / 2) / db, 1), 0));
				onDown(e);
			}, ob = new ResizeObserver(() => {
				clearTimeout(timer_resize);
				timer_resize = setTimeout(() => {
					const [, , , ch, sh] = geo();
					if (ch < sh) {
						const parent = ct.parentNode;
						if (bar.parentNode != parent) parent.appendChild(bar);
						const h = max(16, round(ch * ch / sh));
						si.style[style_size] = h + PX;
						up(h);
					} else if (bar.parentNode) bar.remove();
				}, 200);
			}), unbind = [
				On(bar, { pointerdown: onClick }),
				On(si, { pointerdown: (e) => {
					e.stopPropagation();
					onDown(e);
				} }),
				On(ct, { scroll: up.bind(null, void 0) })
			], destroy = () => {
				clearTimeout(timer_bar);
				clearTimeout(timer_resize);
				unbind.forEach((f) => f());
				if (ptr_unbind) ptr_unbind();
				ob.disconnect();
				if (bar.parentNode) bar.remove();
			};
			bar.style.opacity = 0;
			ob.observe(ct);
			ob.observe(inner);
			return destroy;
		};
	}, UNBIND = Symbol();
	[[
		"vs",
		"Height",
		"Top",
		"Y"
	], [
		"hs",
		"Width",
		"Left",
		"X"
	]].map(([prefix, size, pos, axis]) => {
		const setup = init(size, pos, axis);
		cE(prefix, class extends HTMLElement {
			connectedCallback() {
				if (this.shadowRoot) return;
				const shadow = this.attachShadow({ mode: "open" }), wrapper = mk("b", SCROLL, mk("b", "i", mk("slot")));
				shadow.append(wrapper);
				if (supports_none) {
					wrapper.style.scrollbarWidth = "none";
					this[UNBIND] = setup(wrapper);
				}
			}
			disconnectedCallback() {
				if (this[UNBIND]) this[UNBIND]();
			}
		});
	});
})();

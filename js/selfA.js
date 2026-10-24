// src/js/selfA.js
const selfA = (a_el, evt) => {
	const { target, host, pathname, search, hash } = a_el;
	if (!target && host == location.host) {
		evt.preventDefault();
		return pathname.slice(1) + search + hash;
	}
};

export { selfA };
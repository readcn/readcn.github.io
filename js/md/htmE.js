// src/js/md/htmE.js
var htmE_default = (t) => t.replace(/[&<>"]/g, (c) => "&#" + c.charCodeAt() + ";");

export { htmE_default as default };
import htm_default from "./htm.js";
import safe_default from "./safe.js";

// src/js/md/safeHtm.js
var safeHtm_default = (val) => safe_default(htm_default(val || ""));

export { safeHtm_default as default };
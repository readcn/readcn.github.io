import { LANG_LI, langSet } from "../i18n.js";
import NAME_default from "./NAME.js";
import { get } from "./store.js";

// src/js/i18n/init.js
LANG_LI.splice(0, LANG_LI.length, ...NAME_default.map((name, id) => [name, id]));
langSet(get());

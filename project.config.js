// @ts-check
const BASE = 'src';
const RELATIVE_BASE = './..';
const INPUT_CONTENT = `${BASE}/content`;
const OUTPUT_DIR = "_site";
const CLIENT_DIR = `${BASE}/client`;
const PATH_PREFIX = '/';
// const DIST_DIR = '_site';
// const MANIFEST = 'manifest.json';
const TEMPLATES = `${RELATIVE_BASE}/templates`;
const INCLUDES = `${TEMPLATES}/_includes`;
const LAYOUTS = TEMPLATES;
const DATA_DIR = `${RELATIVE_BASE}/_data`;
const ENTRY_FILE = `${CLIENT_DIR}/main.ts`;
const TEMPLATE_ENGINE = 'njk';
const HOSTNAME_DEV = 'localhost';
const PORT_VITE = 3000;
const HOST_VITE = `http://${HOSTNAME_DEV}:${PORT_VITE}`;
const PROJECT_SLUG = "item-helpers";
const LOGO = 'logo.svg';
const MENU_ICON = 'burger.svg';
const PROJECT_NAME = 'Item Helpers';
const CONFIG_ID = 'itemshelper';


module.exports = {
    CONFIG_ID: CONFIG_ID,
    LOGO: LOGO,
    MENU_ICON: MENU_ICON,
    PROJECT_SLUG: PROJECT_SLUG,
    PROJECT_NAME: PROJECT_NAME,
    OUTPUT_DIR: OUTPUT_DIR,
    // CLIENT_DIR: CLIENT_DIR,
    PATH_PREFIX: PATH_PREFIX,
    // MANIFEST: MANIFEST,
    INCLUDES: INCLUDES,
    DATA_DIR: DATA_DIR,
    ENTRY_FILE: ENTRY_FILE,
    TEMPLATE_ENGINE: TEMPLATE_ENGINE,
    // HOSTNAME_DEV: HOSTNAME_DEV,
    PORT_VITE: PORT_VITE,
    HOST_VITE: HOST_VITE,
    INPUT_CONTENT: INPUT_CONTENT,
    LAYOUTS: LAYOUTS
}
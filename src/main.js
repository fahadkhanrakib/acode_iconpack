import plugin from "../plugin.json";
import style from "./style.css";
import folderIcon from "./folderIcon.css";
import json from "./material-icons";

const Url = acode.require("Url");
const helpers = acode.require("helpers");

function getFileType(filename) {
  const regex = {
    ".babelrc": /\.babelrc$/i,
    "js.map": /\.js\.map$/i,
    "yarn.lock": /^yarn\.lock$/i,
    "test.js": /\.test\.js$/i,
    "test.ts": /\.test\.ts$/i,
    "css.map": /\.css\.map$/i,
    "d.ts": /\.d\.ts$/i,
    ".hintrc": /\.hintrc$/i,
    "pnpm-lock.yaml":
      /^(pnpm-lock\.yaml|pnpm-workspace\.yaml|\.pnpmfile\.cjs)$/i,
    vsix: /\.(vsix|code-workplace|code-workspace|code-profile|code-snippets|vscodeignore|vsixmanifest)$/i,
    cljs: /\.cljs$/i,
    hh: /\.(hh|hpp)$/i,
    "jsconfig.json": /^jsconfig.json$/i,
    "tsconfig.json": /^tsconfig.json$/i,
    ".jsbeautifyrc": /^\.jsbeautifyrc$/i,
    "webpack.config.js": /^webpack\.config\.js$/i,
    ".gitignore": /(^\.gitignore$)|(^\.gitmodules$)|(^\.gitattributes)/i,
    ".npmignore": /(^package\.json$)|(^package\-lock\.json$)/i,
    ".eslintrc.js":
   /(\.eslintrc(\.(json5?|ya?ml|toml|cjs))?$|eslint\.config\.(c?js|json)|\.eslintignore)$/i,
    "postcss.config.js":
      /(^\.postcssrc(\.(json5?|ya?ml|toml))?$|postcss\.config\.(c?js|json)$)/i,
    ".prettierrc":
      /(^\.prettierrc(\.(json5?|ya?ml|toml))?$|prettier\.config\.(c?js|json)$)/i,
    ".replit": /^\.replit$/i, // .replit
    env: /^\.env$/i, // .env
    license: /^(license|LICENSE|License)$/i, // License
    procfile: /^Procfile$/i, // Procfile
    "tailwind.js":
      /tailwind\.config(\.(c?js|json|yaml|yml|ts|tsx))?$|\.tailwindrc(\.(c?js|json|yaml|yml|ts|tsx))?$/i, // Tailwindcss config
    tauri: /tauri\.config(\.(c?js|json|yaml|yml|ts|tsx))?$/i, // Tauri config
    "vite.config.js": /vite\.config(\.(c?js|json|ts|tsx))?$/i, // Vite config
  };

  const fileType = Object.keys(regex).find((type) =>
    regex[type].test(filename)
  );

  if (fileType) return json.filetypes[fileType];

  return json.filetypes[Url.extname(filename).substring(1)];
}

helpers.getIconForFile = (filename) => {
  const type = getFileType(filename);

  return `file file_type_default file_type_${type}`;
};

class IconPack {
  async init() {
    try {
      this.$style = tag("style", {
        textContent: style,
      });
      this.$folderIcon = tag("style", {
        textContent: folderIcon,
      });

      document.head.append(this.$style, this.$folderIcon);
    } catch {}
  }

  async destroy() {}
}

if (window.acode) {
  const acodePlugin = new IconPack();
  acode.setPluginInit(
    plugin.id,
    async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
      if (!baseUrl.endsWith("/")) {
        baseUrl += "/";
      }
      acodePlugin.baseUrl = baseUrl;
      await acodePlugin.init($page, cacheFile, cacheFileUrl);
    }
  );
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}

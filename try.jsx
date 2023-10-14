// main.js

import plugin from "../plugin.json";
import style from "./style.css";

const Url = acode.require("Url");
const helpers = acode.require("helpers");

function getFileType(filename) {
  
}

function generateDynamicCSS(filename) {
  const fileType = getFileType(filename);
  const iconUrl = `https://localhost/__cdvfile_files-external__/plugins/acode.iconpack/icons/${fileType}.svg`;

  const styleElement = document.createElement("style");
  styleElement.textContent = `
    .file_type_${fileType}:before {
        display: inline-block;
        content: '';
        background-image: url('${iconUrl}');
        background-size: contain;
        background-repeat: no-repeat;
        height: 1em;
        width: 1em;
    }
  `;

  document.head.appendChild(styleElement);
}

helpers.getIconForFile = (filename) => {
  const { getModeForPath } = ace.require("ace/ext/modelist");
  const { name } = getModeForPath(filename);

  generateDynamicCSS(name); // Generate CSS rules based on the file name

  return `file file_type_default file_type_${name}`;
};

// Rest of your code...

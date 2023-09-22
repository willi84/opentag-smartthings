import { getProjects } from "./result/result";
// import { config } from "./../../project.config.js"
const config = require("./../../project.config.js");

// import 'vite/modulepreload-polyfill'
export {}
const fs = require('fs');
 
(async () => {
    // code goes here
    const projects = await getProjects();
    fs.writeFileSync("src/_data/geo.json", JSON.stringify(projects));
})();
// TODO: make watch just re-cycle once
// fs.writeFileSync("src/_data/projects.json", JSON.stringify(projects));
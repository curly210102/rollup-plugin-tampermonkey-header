// transform 从 AST 提取需要的信息
// banner 生成并加上 UserScript Header
import path from "path";
import { readFile } from "fs/promises";
import { promisify } from "util";
import { exec as originalExec } from "child_process";
import { URL } from "url";

import getPkgRepo from "get-pkg-repo";
import { walk } from "estree-walker";
import is_reference from "is-reference";
import { attachScopes } from "@rollup/pluginutils";
import GMAPIs from "./interface";

const exec = promisify(originalExec);

const getPkgAuthor = (pkg) => {
  const author = pkg?.author;
  if (typeof author === "string") {
    return author;
  } else if (typeof author === "object") {
    return `${author.name}`;
  }
};

const getCurrentBranch = async () => {
  const { stdout } = await exec("git branch --show-current").catch();
  return stdout?.trim();
};

const cwd = process.cwd();

module.exports = function (metaPath = path.resolve(cwd, "meta.json")) {
  const headerMap = new Map();
  return {
    name: "tampermonkey-header",
    transform(code, id) {
      const ast = this.parse(code);
      let scope = attachScopes(ast, "scope");
      const grantSet = new Set();
      const connectSet = new Set();
      walk(ast, {
        enter(node, parent) {
          if (node.scope) scope = node.scope;
          if (
            node.type === "Identifier" &&
            is_reference(node, parent)
          ) {
            const nodeName = node.name;
            if (GMAPIs.includes(nodeName)) {
              grantSet.add(nodeName);

              if (nodeName === "GM_xmlhttpRequest" && parent.callee === node) {
                const urlNode = parent?.arguments?.properties?.find(
                  ({ key }) => key.type === "Identifier" && key.name === "url"
                );
                if (urlNode && urlNode.value.type === "Literal") {
                  connectSet.add(new URL(urlNode.value.value).host);
                }
              }
            }
          }
        },
        leave(node) {
          if (node.scope) scope = scope.parent;
        },
      });

      headerMap.set(id, {
        grantSet,
        connectSet,
      });
    },
    async banner() {
      try {
        const pkgPath = path.resolve(cwd, "package.json");
        const pkg = JSON.parse(await readFile(pkgPath));
        const pkgRepo = pkg.repository && getPkgRepo(pkg);
        const repoUrl = pkgRepo?.browse();
        const repoRelatedMeta = {};
        if (pkgRepo) {
          const branch = await getCurrentBranch();
          const rawURL =
            pkgRepo.type === "github"
              ? repoUrl.replace(pkgRepo.domain, "raw.githubusercontent.com") +
                `/${branch}/user.js`
              : "";
          Object.assign(repoRelatedMeta, {
            "@homepage": `${repoUrl}#readme`,
            "@supportURL": `${repoUrl}/issue`,
            "@updateURL": rawURL,
            "@downloadURL": rawURL,
          });
        }
        const metaData = {
          "@name": pkg.name,
          "@namespace": repoUrl ?? pkg.name,
          "@version": pkg.version,
          "@author": getPkgAuthor(pkg),
          "@description": pkg.description,
          "@icon": pkg.icon,
          ...repoRelatedMeta,
        };

        try {
          const userMetaFile = await readFile(metaPath);
          const userMetaData = JSON.parse(userMetaFile);
          Object.assign(metaData, userMetaData);
        } catch (err) {}

        const itemEntries = Object.entries(metaData).filter(
          ([_name, value]) => !!value
        );
        const maxLength = Math.max(...itemEntries.map(([name]) => name.length));
        const grants = new Set();
        const connects = new Set();

        const moduleIds = this.getModuleIds();

        for (const id of moduleIds) {
          const moduleHeader = headerMap.get(id);
          if (moduleHeader) {
            const { grantSet, connectSet } = moduleHeader;
            grantSet && grants.add(...grantSet);
            connectSet && connects.add(...connectSet);
          }
        }

        console.log(grants, connects);
        for (const v of grants) {
          itemEntries.push(["@grant", v]);
        }
        for (const v of connects) {
          itemEntries.push(["@connect", v]);
        }
        const headerContent = itemEntries.map(
          ([name, value]) => `// ${name.padEnd(maxLength + 4)}${value}`
        );
        const userScriptHeader = [
          "// ==UserScript==",
          ...headerContent,
          "// ==/UserScript==",
        ].join("\n");

        return userScriptHeader;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

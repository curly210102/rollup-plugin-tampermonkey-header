const { build, analyzeMetafile } = require("esbuild");
const minimist = require("minimist");

const convertBytes = function (bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  if (bytes == 0) {
    return "n/a";
  }

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

  if (i == 0) {
    return bytes + " " + sizes[i];
  }

  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
};

const common = {
  entryPoints: ["./src/index.js"],
  platform: "node",
  target: ["node14.0"],
  bundle: true,
};

const output = [
  {
    format: "cjs",
    outfile: "plugin.cjs",
  },
  {
    format: "esm",
    outfile: "plugin.esm.js",
  },
];

(async function () {
  const argv = minimist(process.argv.slice(2));
  if (argv["development"]) {
    const format = argv["format"];
    const specifyOutput = output.find((item) => item.format === format);
    build({
      ...common,
      ...(specifyOutput ?? output[0] ?? {}),
    });
  } else {
    await Promise.all(
      output.map((config) =>
        build({
          ...common,
          ...config,
          minify: true,
          metafile: true,
        }).then(async (result) => {
          const { metafile } = result;
          if (argv["analyze"]) {
            const text = await analyzeMetafile(metafile);
            console.log(text);
          } else {
            Object.entries(metafile.outputs).forEach(([name, { bytes }]) =>
              console.log(
                "  \x1b[1m%s\t  \x1b[36m%s\x1b[0m",
                name,
                convertBytes(bytes)
              )
            );
          }
        })
      )
    ).catch(() => process.exit(1));
  }
})();

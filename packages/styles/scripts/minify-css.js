const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { join, extname, basename } = require('path');
const { transform } = require('lightningcss');

const args = process.argv.slice(2);
const mode = args[0];

const srcDir = "dist/css";
const files = readdirSync(srcDir).filter(file => {
    if (mode === "main") return extname(file) === ".css" && !file.includes(".min") && !file.includes("rtl");
    if (mode === "rtl") return extname(file) === ".css" && file.includes("rtl") && !file.includes(".min");
    return false;
});

files.forEach(file => {
    const filePath = join(srcDir, file);
    const css = readFileSync(filePath, "utf8");

    const { code, map } = transform({
        filename: filePath,
        code: Buffer.from(css),
        minify: true,
        sourceMap: true,
    });

    const minFilePath = join(srcDir, `${basename(file, ".css")}.min.css`);
    writeFileSync(minFilePath, code);
    writeFileSync(`${minFilePath}.map`, map);

    console.log(`Minified: ${file} -> ${minFilePath}`);
});

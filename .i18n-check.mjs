import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

function loadPart(file) {
  const source = fs.readFileSync(file, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2019,
    },
  });
  const module = { exports: {} };
  new Function('exports', 'module', outputText)(module.exports, module);
  return module.exports.default;
}

const dir = path.join('lib', 'i18n');
const dict = ['bn-1.ts', 'bn-2.ts', 'bn-3.ts', 'bn-4.ts'].reduce(
  (all, file) => Object.assign(all, loadPart(path.join(dir, file))),
  {},
);

const strings = JSON.parse(fs.readFileSync('.strings.json', 'utf8'));

const missing = strings.filter(key => !(key in dict));
const unused = Object.keys(dict).filter(key => !strings.includes(key));

console.log(`dictionary entries : ${Object.keys(dict).length}`);
console.log(`rendered strings   : ${strings.length}`);
console.log(`missing            : ${missing.length}`);
console.log(`unused keys        : ${unused.length}`);

if (missing.length) {
  console.log('\n--- MISSING ---');
  for (const key of missing) console.log(JSON.stringify(key));
}

if (unused.length) {
  console.log('\n--- UNUSED ---');
  for (const key of unused) console.log(JSON.stringify(key));
}

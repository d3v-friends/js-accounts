CJS="./config/tsconfig.cjs.json"
MJS="./config/tsconfig.mjs.json"
rm -rf ./dist
tsc -p "$CJS" && tsc-alias -p "$CJS"
tsc -p "$MJS" && tsc-alias -p "$MJS"
git add ./dist --all

rm -rf cjs
rm -rf esm
tsc -p ./tsconfig.cjs.json
tsc -p ./tsconfig.esm.json
git add . --all

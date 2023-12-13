rm -rf esm
rm -rf cjs
tsc -p ./config/cjs.json || { exit 1; }
tsc -p ./config/esm.json || { exit 1; }
git add . --all

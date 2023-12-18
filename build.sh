#!/bin/bash
set -e

for JS in "mjs" "cjs"; do
   rm -rf "$JS"
   echo ">> tsc "$JS""
   tsc -p tsconfig.$JS.json
   echo ">> tsc-alias $JS"
   tsc-alias -p tsconfig.$JS.json
   find "./$JS" -type f -name '*.js' -exec rename "s/\.js/\.$JS/" "{}" \;
   git add $JS --all
done

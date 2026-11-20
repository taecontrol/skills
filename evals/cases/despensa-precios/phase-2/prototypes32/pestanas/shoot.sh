#!/usr/bin/env bash
# Usage: ./shoot.sh <name> <query> [phone|desktop|both]
set -u
OUT="$(dirname "$0")/shots"; mkdir -p "$OUT"
BUILD=/tmp/despensa16-proto/k-pestanas/index.html
name=$1; query=$2; which=${3:-both}
shot() {
  local size=$1 file=$2
  chromium --headless=new --disable-gpu --no-first-run --no-default-browser-check \
    --user-data-dir=/tmp/despensa32-pestanas-chrome/$(basename "$file" .png) --hide-scrollbars \
    --window-size="$size" --virtual-time-budget=12000 --run-all-compositor-stages-before-draw \
    --screenshot="$file" "file://$BUILD?$query&shot=1" >/dev/null 2>&1
}
[[ $which != desktop ]] && shot 390,844 "$OUT/$name-phone.png"
[[ $which != phone ]] && shot 1440,900 "$OUT/$name-desktop.png"
true

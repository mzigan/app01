rm -rd out/
cp -r src out
cp -r assets out
cp assets/package.json out
(cd out && npm install)
npx electron-builder --project out

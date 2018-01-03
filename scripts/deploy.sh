set -e
rm -fr dist
npm run build
cd dist
git init
git add .
git commit -m 'Auto deploy to github-pages'
git push -f git@github.com:safish/trip.git master:gh-pages

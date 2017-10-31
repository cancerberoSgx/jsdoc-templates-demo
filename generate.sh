npm install



# default
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json
rm -rf demo/default
mv output demo/default


# ink-docstrap
npm install ink-docstrap
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/ink-docstrap/template
rm -rf demo/ink-docstrap
mv output demo/ink-docstrap

# tui-jsdoc-template I like this !
npm install tui-jsdoc-template
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/tui-jsdoc-template
rm -rf demo/tui-jsdoc-template
mv output demo/tui-jsdoc-template

# jaguarjs-jsdoc I like this !
npm install jaguarjs-jsdoc
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/jaguarjs-jsdoc
rm -rf demo/jaguarjs-jsdoc
mv output demo/jaguarjs-jsdoc

# base-line I like this!
npm install  https://github.com/hegemonic/baseline/tarball/master
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/jsdoc-baseline/
rm -rf demo/baseline
mv output demo/baseline

# I like this!
npm install ub-jsdoc
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/ub-jsdoc/
mv output demo/ub-jsdoc

# docdash What I dont like from this is that events get separated from classes
npm install docdash
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/docdash
rm -rf demo/docdash
mv output demo/docdash

# minami - i dont like this
npm install minami
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/minami
rm -rf demo/minami
mv output demo/minami

git clone https://github.com/alivedise/jsdoc3-bootstrap.git
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t jsdoc3-bootstrap/
rm -rf demo/jsdoc3-bootstrap
mv output demo/jsdoc3-bootstrap
rm -rf jsdoc3-bootstrap/

npm install jsdoc-react
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/jsdoc-react/
rm -rf demo/jsdoc-react
mv output demo/jsdoc-react

git clone https://github.com/Astro36/Materialize-JSDoc.git
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t Materialize-JSDoc/
rm -rf demo/Materialize-JSDoc
mv output demo/Materialize-JSDoc
rm -rf Materialize-JSDoc

npm install https://github.com/openfin/jsdoc-template
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/jsdoc-template/
rm -rf demo/openfin-jsdoc-template
mv output demo/openfin-jsdoc-template

npm install https://github.com/braintree/jsdoc-template
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/jsdoc-template/
rm -rf demo/braintree-jsdoc-template
mv output demo/braintree-jsdoc-template

npm install https://github.com/Smolations/jsdoc-bootstrap-template
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/jsdoc-bootstrap-template/
rm -rf  demo/jsdoc-bootstrap-template
mv output/ demo/jsdoc-bootstrap-template


npm install @pixi/jsdoc-template
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/\@pixi/jsdoc-template/
rm -rf demo/pixi-jsdoc-template
mv output demo/pixi-jsdoc-template

git clone https://github.com/ibm-js/jsdoc-amddcl
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t jsdoc-amddcl/templates/amddcl/
rm -rf demo/amddcl
rm -rf  jsdoc-amddcl
mv output/ demo/amddcl

npm install https://github.com/hungluu2106/namis
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/namis/
rm -rf demo/namis
mv output demo/namis


npm install 

# default
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json
mv output demo/default


# ink-docstrap
npm install ink-docstrap
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/ink-docstrap/template
mv output demo/ink-docstrap

# tui-jsdoc-template I like this !
npm install tui-jsdoc-template
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/tui-jsdoc-template
mv output demo/tui-jsdoc-template

# jaguarjs-jsdoc I like this !
npm install jaguarjs-jsdoc
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/jaguarjs-jsdoc
mv output demo/jaguarjs-jsdoc

# base-line I like this!
npm install  https://github.com/hegemonic/baseline/tarball/master
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/jsdoc-baseline/
mv output demo/baseline

# I like this!
npm install ub-jsdoc
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/ub-jsdoc/
mv output demo/ub-jsdoc

# docdash What I dont like from this is that events get separated from classes 
npm install docdash
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/docdash
mv output demo/docdash

# minami - i dont like this
npm install minami
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/minami
mv output demo/minami

git clone https://github.com/alivedise/jsdoc3-bootstrap.git
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t jsdoc3-bootstrap/
mv output demo/jsdoc3-bootstrap

npm install jsdoc-react
node node_modules/jsdoc/jsdoc.js -c jsdoc-config.json -t node_modules/jsdoc-react/
mv output demo/jsdoc-react

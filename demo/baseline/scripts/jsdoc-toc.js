(function($) {
    // TODO: make the node ID configurable
    var treeNode = $('#jsdoc-toc-nav');

    // initialize the tree
    treeNode.tree({
        autoEscape: false,
        closedIcon: '&#x21e2;',
        data: [{"label":"<a href=\"global.html\">Globals</a>","id":"global","children":[]},{"label":"<a href=\"Alive.html\">Alive</a>","id":"Alive","children":[]},{"label":"<a href=\"Apple.html\">Apple</a>","id":"Apple","children":[]},{"label":"<a href=\"Energy.html\">Energy</a>","id":"Energy","children":[]},{"label":"<a href=\"Environment.html\">Environment</a>","id":"Environment","children":[]},{"label":"<a href=\"Tree.html\">Tree</a>","id":"Tree","children":[]}],
        openedIcon: ' &#x21e3;',
        saveState: true,
        useContextMenu: false
    });

    // add event handlers
    // TODO
})(jQuery);

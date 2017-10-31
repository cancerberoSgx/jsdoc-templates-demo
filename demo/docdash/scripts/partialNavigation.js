(function(){
	var idDiv = document.getElementById('main');

    function getPartial(originalHref){
        var partialHref = 'partials/' + originalHref;
        var currentPageURN = document.location.pathname.split('/').pop();
        var targetURI = originalHref.split('#')[0];
        var scrollToElmID = originalHref.split('#')[1];
        var fetched;

        if (currentPageURN === targetURI) { //already loaded
            fetched = Promise.resolve()
        } else {
            fetched = window.fetch(partialHref)
                .then(function(resp){
                    return resp.text()
                })
                .then(function(pageText){
                    idDiv.innerHTML = pageText;
                    window.prettyPrint();
                });
        }
        fetched.then(function scrollTo(){
            var elm;
            if (scrollToElmID){
                elm = document.getElementById(scrollToElmID);
            } else {
                elm = idDiv;
            }
            if (elm) elm.scrollIntoView();
            if (needUpdateURL) {
                history.pushState({href: originalHref}, "", originalHref);
            }
        });
    }

    function isPartial(href){
		var res = Boolean(href);
		if (res) res = (href.indexOf('.js.html') === -1) 
			&& (href.indexOf('http://') === -1)
			&& (href.indexOf('https://') === -1)
			&& (href.charAt(0) !== '/');
		return res;
	}
	var needUpdateURL = false;

	if (window && window.fetch && window.history && history.pushState) {
		document.body.onclick = function( e ) {
			var evt = e || window.event,
				target = evt.target || evt.srcElement,
				originalHref;

			// If the element clicked is an anchor
			if ( target.nodeName === 'A' ) {
				originalHref = target.getAttribute('href');
				if (isPartial(originalHref)){
					needUpdateURL = true;
					getPartial(originalHref);
					e.preventDefault();
				}
                document.getElementById('search-trigger').checked = false;
                document.getElementById('nav-trigger').checked = false;
			}
		};
		window.onpopstate = function(event) {
			needUpdateURL = false;
			if (event.state && event.state.href){
				getPartial(event.state.href);
			}
		}	
	}

if (!window.exports) window.exports = {};
    /**
     * Set a position of source to line, specified as a URL hash tag
     */
window.exports["gotoLine"] = function() {
    var source = document.getElementsByClassName('prettyprint source linenums');
    var i = 0;
    var lineNumber = 0;
    var lineId;
    var lines;
    var totalLines;
    var anchorHash;

    if (source && source[0]) {
        anchorHash = document.location.hash.substring(1);
        lines = source[0].getElementsByTagName('li');
        totalLines = lines.length;

        for (; i < totalLines; i++) {
            lineNumber++;
            lineId = 'line' + lineNumber;
            lines[i].id = lineId;
            if (lineId === anchorHash) {
                lines[i].className += ' selected';
            }
        }
    }
};

var ftsData = null, searchInProgress = false;
function buildSearchResultHTML(data, level){
    var result='', keys, i, l;
    keys = Object.keys(data);
    for (i=0, l=keys.length; i<l; i++) {
        if (typeof data[keys[i]] === 'string') {
            result +='<li>' + data[keys[i]] + '</li>';
        } else {
            result += '<ul><h' + level + '>' + keys[i] + '</h' + level + '>';
            result += buildSearchResultHTML(data[keys[i]], keys[i], level + 1);
            result += '</ul>';
        }
    }
    return result;
}
function fullTextSearch(textToSearch){
    var searchData;
    if (searchInProgress) return;
    if (!textToSearch){
        document.getElementById('search-trigger').checked = false;
        return;
    }
    searchInProgress = true;
    if (!ftsData) { //fetch data
        searchData = Promise.all([window.fetch('ftsIndex.json'), window.fetch('ftsData.json')])
            .then(function(values) {
                return Promise.all([values[0].json(), values[1].json()]);
            })
            .then(function(valuesInJSON){
                ftsData = {
                    ftsIndex: lunr.Index.load(valuesInJSON[0]),
                    ftsData: valuesInJSON[1]
                };
                return ftsData;
            })
    } else {
        searchData = Promise.resolve(ftsData)
    }
    searchData.then(function(data){
        var search = data.ftsIndex.search(textToSearch),
            allData = data.ftsData,
            res = {},
            pathSplitRe = /[:~#\.]/,
            member, memberPath, currentNode, i, j, l, jl, resHTML;
        for(i= 0, l=search.length; i<l && search[i].score > 0.001; i++){
            member = allData[search[i].ref];
            memberPath = member.path.split(pathSplitRe);
            if (memberPath[0] === 'module'){ // almost all element are inside module, so let's remove a `module` keyword
                memberPath.shift();
            }
            if (memberPath.length<2){ // add a grouping
                memberPath.unshift(member.group);
            }
            currentNode = res;
            for(j=0, jl = memberPath.length; j < jl-1; j++){ // without leaf
                if (!currentNode[memberPath[j]]){
                    currentNode[memberPath[j]] = {}
                }
                currentNode = currentNode[memberPath[j]];
            }
            currentNode[memberPath[j]] = '<a href="' + member.href + '" style="opacity:' +  Math.max(search[i].score*100, 0.3)+ '">' + memberPath[j] + '</a>';
        }
        if (search.length) {
            resHTML = buildSearchResultHTML(res, 2)
        } else {
            resHTML = 'Not found'
        }
        var sElm = document.getElementById('search-result-inner');
        sElm.innerHTML = resHTML;
        var trigger = document.getElementById('search-trigger');
        trigger.checked = true;
    }).then(function(){
        searchInProgress = false;
    })
}
window.exports["fullTextSearch"] = fullTextSearch;

/** realisation of debounce from lodash */
function debounce(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime = 0,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    wait = wait || 0;
    if (typeof options === 'object') {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ?  Math.max(options.maxWait || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }

    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            result = wait - timeSinceLastCall;

        return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
    }

    function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (!lastCallTime || (timeSinceLastCall >= wait) ||
        (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }

    function timerExpired() {
        var time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
        clearTimeout(timerId);
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
    }

    function cancel() {
        if (timerId !== undefined) {
            clearTimeout(timerId);
        }
        lastCallTime = lastInvokeTime = 0;
        lastArgs = lastThis = timerId = undefined;
    }

    function flush() {
        return timerId === undefined ? result : trailingEdge(Date.now());
    }

    function debounced() {
        var time =  Date.now(),
            isInvoking = shouldInvoke(time);

        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxing) {
                // Handle invocations in a tight loop.
                clearTimeout(timerId);
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) {
            timerId = setTimeout(timerExpired, wait);
        }
        return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
}

var searchInput = document.getElementById('search-input');
function doFTS(){
  var textToSearch = searchInput.value;
  fullTextSearch(textToSearch);
}
var debouncedFTS = debounce(doFTS, 300);

function clearOnEsc(evt) {
    var code = evt.charCode || evt.keyCode;
    if (code == 27) {
        evt.target.value = '';
        debouncedFTS();
    }
}
searchInput.addEventListener('input', debouncedFTS);
searchInput.addEventListener('keydown', clearOnEsc);
searchInput.addEventListener('focus', debouncedFTS);

})();

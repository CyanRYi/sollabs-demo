/*  Super Search
    Author: Kushagra Gour (http://kushagragour.in)
    MIT Licensed
*/

// Changes XML to JSON
// Modified version from here: http://davidwalsh.name/convert-xml-json
function xmlToJson(xml) {

    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    // If all text nodes inside, get concatenated text from them.
    var textNodes = [].slice.call(xml.childNodes).filter(function (node) { return node.nodeType === 3; });
    if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
        obj = [].slice.call(xml.childNodes).reduce(function (text, node) { return text + node.nodeValue; }, '');
    }
    else if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}

var posts = {

    // get all post list from sitemap
    init: function() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET","/sitemap.xml");
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState != 4) return;
            if (xmlhttp.status != 200 && xmlhttp.status != 304) { return; }
            var node = (new DOMParser).parseFromString(xmlhttp.responseText, 'text/xml');
            node = node.children[0];
            this.contents = xmlToJson(node).channel.item;

            console.log(posts);
            if (contents.title !== undefined) {
                this.contents = [this.contents];
            }
        }
        xmlhttp.send();
    },

    getMatchedPosts: function(param) {
        var result = contents.filter(function (post) {
            if (post.title.toLowerCase().indexOf(param) !== -1
                || post.description.toLowerCase().indexOf(param) !== -1) {
                return true;
            }
        });

        if (!result) {
            return;
        } else if (result.title !== undefined) {
            return [result];
        } else {
            return result;
        }
    }
};

(function () {

    var postContainer = Object.create(posts);

    var searchEl = document.getElementById('js-search'),
        searchInputEl = document.getElementById('search__input'),
        searchResultsEl = document.getElementById('search__results'),
        searchResultsOutline = document.getElementById('search__outline'),
        searchClearEl = document.getElementById('search__clear');

    window.toggleSearch = function toggleSearch() {
        //_gaq.push(['_trackEvent', 'supersearch', searchEl.classList.contains('is-active')]);
        searchEl.classList.toggle('is-active');
        if (searchEl.classList.contains('is-active')) {
            // while opening
            searchInputEl.value = '';
        } else {
            // while closing
            searchResultsEl.classList.add('is-hidden');
        }
        setTimeout(function () {
            searchInputEl.focus();
        }, 210);
    }

    window.addEventListener('keyup', function onKeyPress(e) {
        if (e.which === 27) {
            toggleSearch();
        }
    });
    window.addEventListener('keypress', function onKeyPress(e) {
        if (e.which === 47 && !searchEl.classList.contains('is-active')) {
            toggleSearch();
        }
    });

    searchClearEl.addEventListener('click', resetComponent);

    var lastSearchResultHash = '';
    searchInputEl.addEventListener('input', function onInputChange() {
        var currentInputValue = (searchInputEl.value + '').toLowerCase();
        if (currentInputValue.length < 3) {
            resetComponent();
            return;
        }

        var matchingPosts = postContainer.getMatchedPosts(currentInputValue);

        console.log(matchingPosts);
        if (matchingPosts.length === 0) {
            resetComponent();
            return;
        }

        var currentResultHash = matchingPosts.reduce(function(hash, post) { return post.title + hash; }, '');
        if (currentResultHash !== lastSearchResultHash) {
            searchResultsEl.classList.remove('is-hidden');
            searchResultsOutline.classList.remove('is-hidden');
            searchResultsEl.innerHTML = matchingPosts.map(function (post) {
                var d = new Date(post.pubDate);
                return '<li><a href="' + post.link + '">' + post.title + '<span class="search__result-date">' + d.toUTCString().replace(/.*(\d{2})\s+(\w{3})\s+(\d{4}).*/,'$2 $1, $3') + '</span></a></li>';
            }).join('');
        }
        lastSearchResultHash = currentResultHash;
    });

    function resetComponent() {
        lastSearchResultHash = '';
        searchResultsEl.classList.add('is-hidden');
        searchResultsOutline.classList.add('is-hidden');
    }

})();

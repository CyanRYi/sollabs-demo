(function () {
    var checkboxes = document.getElementsByClassName('mdl-checkbox__input');

    for(var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', function() {
            var posts = document.getElementsByClassName(checkboxes.id);

            for(var j = 0; j < posts.length; j++) {
                if (checkboxes[i].checked) {
                    posts[j].style.visibility = 'visible';
                } else {
                    posts[j].style.visibility = 'hidden';
                }
            }
        })
    }
})();

(function () {
    var checkboxes = document.getElementsByClassName('mdl-checkbox__input');

    for(var i = 0; i < checkboxes.length; i++) {

        checkboxes[i].addEventListener('change', function() {

            var posts = document.getElementsByClassName(this.id);

            for(var j = 0; j < posts.length; j++) {
                if (this.checked) {
                    posts[j].style.display = 'block';
                } else {
                    posts[j].style.display = 'none';
                }
            }
        })
    }

    function setDefault(pageType, pageName) {

        if (pageType && pageName) {
            var resetCheckboxes = document.querySelector('input[type=checkbox][id^=#tag_]');

            for(var i = 0; i < resetCheckboxes.length; i++) {

                if (resetCheckboxes[i].id !== 'tag_' + pageName) {
                    resetCheckboxes[i].checked = false;
                }
            }
        }
    }
})();

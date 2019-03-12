(function () {
    var checkboxes = document.getElementsByClassName('mdl-checkbox__input');

    for(var i = 0; i < checkboxes.length; i++) {

        console.log("target checkboxes : " + checkboxes.length);
        checkboxes[i].addEventListener('change', function() {

            console.log(checkboxes[i] + 'changed ' + checkboxes[i].checked);
            var posts = document.getElementsByClassName(checkboxes[i].id);

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

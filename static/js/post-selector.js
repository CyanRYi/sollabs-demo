(function () {
    var checkboxes = document.getElementsByClassName('mdl-checkbox__input');

    for(var i = 0; i < checkboxes.length; i++) {

        console.log("target checkboxes : " + checkboxes.length);
        checkboxes[i].addEventListener('change', function() {

            console.log(this + 'changed ' + this.checked);
            var posts = document.getElementsByClassName(this.id);

            for(var j = 0; j < posts.length; j++) {
                if (this.checked) {
                    posts[j].style.display = 'block';
                } else {
                    posts[j].style.visibility = 'none';
                }
            }
        })
    }
})();

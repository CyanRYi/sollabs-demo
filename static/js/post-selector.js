(function () {
    $(".mdl-checkbox__input").change(function () {
        if (this.checked) {
            $("." + this.id).css('visibility', 'visible');
        } else {
            $("." + this.id).css('visibility', 'hidden');
        }
    });
})();

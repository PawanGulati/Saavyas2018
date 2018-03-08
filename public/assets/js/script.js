function openNav() {
    document.getElementById("myNav").style.height = "100%";
    document.getElementById("myNav").style.opacity = "1";
        $(".nav").css("opacity", 0.1);
         $(".home").css("opacity", 0.4);

}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("myNav").style.opacity = "0";

        $(".nav").css("opacity", 1);
         $(".home").css("opacity", 1);
}

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

function ocultar() {
    document.getElementById('cod1').style.display = "none";
    var intro = document.getElementById('cod1');
    intro.style.backgroundColor = 'blue';
}
function preload(status) {
    if (status) {
        document.getElementById("preloadLogin").style.display = "block";
        return;
    }
    document.getElementById("preloadLogin").style.display = "none";
}
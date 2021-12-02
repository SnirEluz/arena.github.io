const mainContainer = document.querySelector(".mainContainer")
const menuHeaderIcon = document.querySelector(".menuHeaderIcon")
const menu = document.querySelector(".menu")
const header = document.querySelector(".header")


let darkModeLocalStorage = []

// menuHeader --------------------------------------------------->
menuHeaderIcon.addEventListener("click", () => {
    //display
    menu.style.display = "block"
    menuHeaderIcon.style.display = "none"
    //creat
    const exitMenuIcon = document.createElement("img")
    //appendChild
    header.appendChild(exitMenuIcon)
    //src
    exitMenuIcon.src = "/image/close.png"
    //className
    exitMenuIcon.className = "exitMenu"
    //assemble
    document.body.style.overflow = "hidden";
    mainContainer.style.pointerEvents = "none";
    menu.style.pointerEvents = "auto";
    header.style.pointerEvents = "auto";
    exitMenuIcon.addEventListener("click", () => {
        menu.style.display = "none"
        mainContainer.style.pointerEvents = "auto";
        menuHeaderIcon.style.display = "block"
        exitMenuIcon.style.display = "none"
        document.body.style.overflow = "auto";

    })
    document.addEventListener("click", (e) => {
        if (e.target.closest(".lightbox")) {
            menu.style.display = "none"
            mainContainer.style.pointerEvents = "auto";
            menuHeaderIcon.style.display = "block"
            exitMenuIcon.style.display = "none"
            document.body.style.overflow = "auto";
        };

    });
})
$('.btnDownArrow, .btnDown').click(()=>{
    $(".companyMenu").slideToggle();
})//
// darkModd --------------------------------------------------->
const btnDarkMode = document.querySelector(".btnDarkMode")
const btnDarkModeIcon = document.querySelector(".btnDarkModeIcon")
btnDarkMode.addEventListener("click", darkMode)
btnDarkModeIcon.addEventListener("click", darkMode)
if (localStorage.getItem("darkModeLocalStorage")) {
    darkMode()
}else{
    btnDarkModeIcon.src = "/image/sun.png"
}
function darkMode() {
    darkModeLocalStorage.push({ LS: true })
    localStorage.setItem("darkModeLocalStorage", JSON.stringify(darkModeLocalStorage))
    const html = document.querySelector("html")
    html.classList.toggle("darkMode");
    btnDarkMode.style.background = "rgb(0, 153, 255)"
    darkLight = "dark"
    if (btnDarkMode.style.filter == "invert(1)") {
        btnDarkMode.style.filter = ""
        btnDarkMode.style.background = ""
        localStorage.clear("darkModeLocalStorage")
        btnDarkModeIcon.src = "/image/sun.png"
    } else {
        btnDarkMode.style.filter = "invert(1)"
        btnDarkModeIcon.src = "/image/night-mode.png"
    }
}
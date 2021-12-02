const apiKey = {
    key: "d9b02f17-a168-4ef7-acf3-08fbc413b142"
    // key: "fe405b4f-deab-45ec-8ef0-2539bf6cee94"
    // key: "8a98211b-7093-4f17-9547-e70386f2269c"
    // key: "5f586b3d-9722-43a9-89a6-b1a5953d63a7"

}
// querySelector ------------------------------------------------>
const mainContainer = document.querySelector(".mainContainer")
const header = document.querySelector(".header")
const menuHeaderIcon = document.querySelector(".menuHeaderIcon")
const menu = document.querySelector(".menu")
const market = document.querySelector(".market")
const coins = document.querySelector(".coins")
const tools = document.querySelector(".tools")
const footer = document.querySelector(".footer")
// appendChild -------------------------------------------------->
document.body.appendChild(mainContainer)
mainContainer.appendChild(market)
market.appendChild(coins)
// market.appendChild(tools)
mainContainer.appendChild(footer)
// cryptoApi ---------------------------------------------------->
let darkModeLocalStorage = []
const cryptoApi = async () => {
    let numberOfCoins = 10
    try {
        // getApi ------------------------------------------ >>
        const array = []
        const bitcoinData = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=${numberOfCoins}&CMC_PRO_API_KEY=${apiKey.key}`)
        const bitcoinD = await bitcoinData.json()
        for (let i = 0; i < numberOfCoins; i++) {
            array.push(bitcoinD.data[i].id)
        }
        const bitcoinInfo = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${array}&CMC_PRO_API_KEY=${apiKey.key}`)
        const bitcoinI = await bitcoinInfo.json()
        const bitcoinMarket = await fetch(`https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=${apiKey.key}`)
        const bitcoinM = await bitcoinMarket.json()
        console.log(bitcoinI)
        //#region marketData
        const totalCryptocurrencies = document.querySelector(".totalCryptocurrencies")
        const activeExchanges = document.querySelector(".activeExchanges")
        const totalMarketCap = document.querySelector(".totalMarketCap")
        const totalVolume24h = document.querySelector(".totalVolume24h")
        const totalMarketCapYesterdayPercentageChange = document.querySelector(".totalMarketCapYesterdayPercentageChange")

        totalCryptocurrencies.textContent = `${new Number(bitcoinM.data.total_cryptocurrencies).toLocaleString("en-GB")}`
        activeExchanges.textContent = `${new Number(bitcoinM.data.active_exchanges).toLocaleString("en-GB")}`
        totalMarketCap.textContent = `$${new Number(bitcoinM.data.quote.USD.total_market_cap).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`
        totalVolume24h.textContent = `$${new Number(bitcoinM.data.quote.USD.total_volume_24h).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`
        totalMarketCapYesterdayPercentageChange.textContent = `${bitcoinM.data.quote.USD.total_market_cap_yesterday_percentage_change.toFixed(2)}%`
        //#endregion
        for (let i = 0; i < numberOfCoins; i++) {
            // createElement ------------------------------------------ >>
            const coinDiv = document.createElement("div")
            // left
            const coinDivLeft = document.createElement("div")
            const coinDivLeftRank = document.createElement("h2")
            const coinDivLeftImg = document.createElement("img")
            const coinDivLeftName = document.createElement("h2")
            const coinDivLeftSymbol = document.createElement("h3")
            // right
            const coinDivRight = document.createElement("div")
            const coinDivRightPrice = document.createElement("h2")
            const coinDivRight24Volume = document.createElement("h3")
            const coinDivRight7daysVolume = document.createElement("h3")
            // className ---------------------------------------------- >>
            coinDiv.className = "coinDiv"
            // left
            coinDivLeft.className = "coinDivLeft"
            coinDivLeftRank.className = "coinDivLeftRank"
            coinDivLeftImg.className = "coinDivLeftImg"
            coinDivLeftName.className = "coinDivLeftName"
            coinDivLeftSymbol.className = "coinDivLeftSymbol"
            coinDivLeftImg.src = bitcoinI.data[array[i]].logo
            // right
            coinDivRight.className = "coinDivRight"
            coinDivRightPrice.className = "coinDivRightPrice"
            coinDivRight24Volume.className = "coinDivRight24Volume"
            coinDivRight7daysVolume.className = "coinDivRight7daysVolume"
            // contentInfromationLefr ------------------------------------ >>
            coinDivLeftRank.textContent = bitcoinD.data[i].cmc_rank
            coinDivLeftName.textContent = bitcoinD.data[i].name
            coinDivLeftSymbol.textContent = bitcoinD.data[i].symbol
            // textContentRight ------------------------------------ >>
            coinDivRightPrice.textContent = `$${new Number (bitcoinD.data[i].quote.USD.price).toLocaleString("en-GB",{maximumFractionDigits:2})}`
            coinDivRightPrice.title = `$${new Number (bitcoinD.data[i].quote.USD.price).toLocaleString("en-GB",{maximumFractionDigits:5})}`
            coinDivRight24Volume.textContent = `${bitcoinD.data[i].quote.USD.percent_change_24h.toFixed(2)}%`
            coinDivRight7daysVolume.textContent = `${bitcoinD.data[i].quote.USD.percent_change_7d.toFixed(2)}% `
            // appendChild ------------------------------------------- >>
            coins.appendChild(coinDiv)
            // left
            coinDiv.appendChild(coinDivLeft)
            coinDivLeft.appendChild(coinDivLeftRank)
            coinDivLeft.appendChild(coinDivLeftImg)
            coinDivLeft.appendChild(coinDivLeftName)
            coinDivLeft.appendChild(coinDivLeftSymbol)
            // right
            coinDiv.appendChild(coinDivRight)
            coinDivRight.appendChild(coinDivRightPrice)
            coinDivRight.appendChild(coinDivRight24Volume)
            coinDivRight.appendChild(coinDivRight7daysVolume)
            //#region ifElse / Green / Red
            if (bitcoinD.data[i].quote.USD.percent_change_24h.toFixed(2) <= 0) {
                coinDivRight24Volume.style.color = "red"
            } else {
                coinDivRight24Volume.textContent = `+${bitcoinD.data[i].quote.USD.percent_change_24h.toFixed(2)}%`
            }
            if (bitcoinD.data[i].quote.USD.percent_change_7d.toFixed(2) <= 0) {
                coinDivRight7daysVolume.style.color = "red"
            } else {
                coinDivRight7daysVolume.textContent = `+${bitcoinD.data[i].quote.USD.percent_change_7d.toFixed(2)}%`
            }
            //#endregion
            coinDiv.addEventListener("click", function () {
                location.href = "/Market/market-api.html"
            })
        }
    } catch (error) {

    }
}
cryptoApi()
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
            $(".companyMenu").css("display", "none");
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
        btnDarkMode.style.background = "black"
        localStorage.clear("darkModeLocalStorage")
        btnDarkModeIcon.src = "/image/sun.png"
    } else {
        btnDarkMode.style.filter = "invert(1)"
        btnDarkModeIcon.src = "/image/night-mode.png"
    }

}



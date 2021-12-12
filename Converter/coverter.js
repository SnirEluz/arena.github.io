const apiKey = {
    key: "d9b02f17-a168-4ef7-acf3-08fbc413b142"
}
const apiKeyCurrency = {
    key: "e6758da0-52fe-11ec-8570-bd5ad7263055"
}
// querySelector ------------------------------------------------>
const mainContainer = document.querySelector(".mainContainer")
const header = document.querySelector(".header")
const menuHeaderIcon = document.querySelector(".menuHeaderIcon")
const menu = document.querySelector(".menu")
const market = document.querySelector(".market")
const coins = document.querySelector(".coins")

const arrowDown = document.querySelector(".arrowDown")
const coinSymbolImageConverter = document.querySelector(".coinSymbolImageConverter")
const coinNameConverter = document.querySelector(".coinNameConverter")
const coinSymbolConverter = document.querySelector(".coinSymbolConverter")
const coinPriceConverter = document.querySelector(".coinPriceConverter")
const coinPriceAmountConverter = document.querySelector(".coinPriceAmountConverter")
const inputAmountConverter = document.querySelector(".inputAmountConverter")
const coverterPageFrom = document.querySelector(".coverterPageFrom")
const currencySelect = document.querySelector(".currencySelect")

const inpSearch = document.querySelector(".inpSearch")//
// appendChild -------------------------------------------------->
document.body.appendChild(mainContainer)
mainContainer.appendChild(market)
market.appendChild(coins)//
// array [] ---------------------------------------------------->
let darkModeLocalStorage = []
let array = []
let arrayCoinsLs = []
let marketG = []
let arrayCoinsI = []


$(".coverterPageFrom").click(() => {
    console.log("work")
    cryptoApi()//
    $(".lightboxCoins").css("display", "block")
    $(".market").css("display", "block")
    document.body.style.overflow = "hidden";
    $(document).click((e) => {
        if (e.target.closest(".lightboxCoins")) {
            $(".lightboxCoins").css("display", "none")
            $(".market").css("display", "none")
            document.body.style.overflow = "auto";
        };
    })

})
$(".closeMarket").click(() => {
    $(".lightboxCoins").css("display", "none")
    $(".market").css("display", "none")
    document.body.style.overflow = "auto";

})
// function ()=> ---------------------------------------------------->
function createCoinDiv(marketG,currencyD) {
    console.log("1")

    coins.innerHTML = ""
    for (let i = 0; i < marketG.length; i++) {
        console.log(marketG.length)
        // console.log(newArray)
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
        const coinDivRightNext = document.createElement("img")
        // className ---------------------------------------------- >>
        coinDiv.className = "coinDiv"
        // left
        coinDivLeft.className = "coinDivLeft"
        coinDivLeftRank.className = "coinDivLeftRank"
        coinDivLeftImg.className = "coinDivLeftImg"
        coinDivLeftName.className = "coinDivLeftName"
        coinDivLeftSymbol.className = "coinDivLeftSymbol"
        coinDivLeftImg.src = marketG[i].image.small
        // right
        coinDivRight.className = "coinDivRight"
        coinDivRightNext.className = "coinDivRightNext"
        coinDivRightNext.src = "/arena.github.io/image/right.png"
        // textContentLeft ------------------------------------ >>
        coinDivLeftRank.textContent = marketG[i].market_data.market_cap_rank
        coinDivLeftName.textContent = marketG[i].name
        coinDivLeftSymbol.textContent = marketG[i].symbol.toUpperCase()
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
        coinDivRight.appendChild(coinDivRightNext)
        $(document).click((e) => {
            if (e.target.closest(".lightboxCoins")) {
                $(".lightboxCoins").css("display", "none")
                $(".market").css("display", "none")
                document.body.style.overflow = "auto";
            };
        })
        coinDiv.addEventListener("click", function () {
            const curencyArray = [
                { currentPrice: 1, currenctName: "USD $" },
                { currentPrice: currencyD.data.AED, currenctName: "AED د.إ" },
                { currentPrice: currencyD.data.AFN, currenctName: "AFN ؋" },
                { currentPrice: currencyD.data.ALL, currenctName: "ALL L" },
                { currentPrice: currencyD.data.AMD, currenctName: "AMD ֏" },
                { currentPrice: currencyD.data.ILS, currenctName: "ILS ₪" },
                { currentPrice: currencyD.data.EUR, currenctName: "EUR €" }
            ]
            $(".lightboxCoins").css("display", "none")
            market.style.display = "none"
            document.body.style.overflow = "auto";
            coinSymbolImageConverter.src = marketG[i].image.small
            coinNameConverter.textContent = marketG[i].name
            coinSymbolConverter.textContent = marketG[i].symbol
            let newPrice = inputAmountConverter.value * (marketG[i].market_data.current_price.usd.toFixed(2) * curencyArray[currencySelect.value].currentPrice)
            coinPriceAmountConverter.textContent = `${inputAmountConverter.value + " " + marketG[i].symbol + " ="}`
            coinPriceConverter.textContent = newPrice.toLocaleString("en-GB", { maximumFractionDigits: 2 }) + " " + curencyArray[currencySelect.value].currenctName
            coinPriceAmountConverter.textContent = `${inputAmountConverter.value + " " + marketG[i].symbol} =`

            // -------------------------Converter--------------------------//
            inputAmountConverter.addEventListener("keyup", function () {
                let newPrice = inputAmountConverter.value * (marketG[i].market_data.current_price.usd.toFixed(2) * curencyArray[currencySelect.value].currentPrice)
                coinPriceAmountConverter.textContent = `${inputAmountConverter.value + " " + marketG[i].symbol + " ="}`
                coinPriceConverter.textContent = newPrice.toLocaleString("en-GB", { maximumFractionDigits: 2 }) + " " + curencyArray[currencySelect.value].currenctName
            })
            currencySelect.addEventListener("change", function () {
                let newPrice = inputAmountConverter.value * (marketG[i].market_data.current_price.usd.toFixed(2) * curencyArray[currencySelect.value].currentPrice)
                coinPriceConverter.textContent = newPrice.toLocaleString("en-GB", { maximumFractionDigits: 2 }) + " " + curencyArray[currencySelect.value].currenctName

            })


        })
    }
}//
const cryptoApi = async () => {
    try {
        // getApi ------------------------------------------ >>
        const marketGeco = await fetch(`https://api.coingecko.com/api/v3/coins?per_page=250`)
        const marketG = await marketGeco.json()
        const currencyData = await fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=${apiKeyCurrency.key}`)
        const currencyD = await currencyData.json()
        newmarketG = marketG
        // console.log(arrayCoinsD[0].quote.USD.price)
        $(".loading").css("display", "none")
        inpSearch.addEventListener("keyup", function (e) {
            const newArrayD = marketG.filter(coin => coin.name.toLowerCase().includes(inpSearch.value.toLowerCase()))
            createCoinDiv(newArrayD,currencyD)
        })
        // createDivCoin ------------------------------------------ >>
        createCoinDiv(marketG,currencyD)
    } catch (error) {
    }
}//

// cryptoApiNarket --------------------------------------------------->
const cryptoApiNarket = async () => {
    try {
        const bitcoinMarket = await fetch(`https://api.coingecko.com/api/v3/global`)
        const bitcoinM = await bitcoinMarket.json()
        console.log(bitcoinM)
        const marketGeco = await fetch(`https://api.coingecko.com/api/v3/coins?per_page=250`)
        const marketG = await marketGeco.json()
        const currencyData = await fetch(`https://freecurrencyapi.net/api/v2/latest?apikey=${apiKeyCurrency.key}`)
        const currencyD = await currencyData.json()
        const totalCryptocurrencies = document.querySelector(".totalCryptocurrencies")
        const activeExchanges = document.querySelector(".activeExchanges")
        const totalMarketCap = document.querySelector(".totalMarketCap")
        const totalVolume24h = document.querySelector(".totalVolume24h")
        const totalMarketCapYesterdayPercentageChange = document.querySelector(".totalMarketCapYesterdayPercentageChange")
        totalCryptocurrencies.textContent = `${new Number(bitcoinM.data.active_cryptocurrencies).toLocaleString("en-GB")}`
        activeExchanges.textContent = `${new Number(bitcoinM.data.markets).toLocaleString("en-GB")}`
        totalMarketCap.textContent = `$${new Number(bitcoinM.data.total_market_cap.usd).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`
        totalVolume24h.textContent = `$${new Number(bitcoinM.data.total_volume.usd).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`
        totalMarketCapYesterdayPercentageChange.textContent = `${bitcoinM.data.market_cap_percentage.usdc.toFixed(2)}%`


        console.log(currencyD)

        // -------------------------Converter--------------------------//
        const curencyArray = [
            { currentPrice: 1, currenctName: "USD $" },
            { currentPrice: currencyD.data.AED, currenctName: "AED د.إ" },
            { currentPrice: currencyD.data.AFN, currenctName: "AFN ؋" },
            { currentPrice: currencyD.data.ALL, currenctName: "ALL L" },
            { currentPrice: currencyD.data.AMD, currenctName: "AMD ֏" },
            { currentPrice: currencyD.data.ILS, currenctName: "ILS ₪" },
            { currentPrice: currencyD.data.EUR, currenctName: "EUR €" }
        ]
        coinPriceConverter.textContent = `${new Number(marketG[0].market_data.current_price.usd).toLocaleString("en-GB", { maximumFractionDigits: 2 })} USD`
        inputAmountConverter.addEventListener("keyup", function () {
            let newPrice = inputAmountConverter.value * (marketG[0].market_data.current_price.usd.toFixed(2) * curencyArray[currencySelect.value].currentPrice)
            coinPriceAmountConverter.textContent = `${inputAmountConverter.value + " " + marketG[0].symbol + " ="}`
            coinPriceConverter.textContent = newPrice.toLocaleString("en-GB", { maximumFractionDigits: 2 }) + " " + curencyArray[currencySelect.value].currenctName
        })
        currencySelect.addEventListener("change", function () {
            let newPrice = inputAmountConverter.value * (marketG[0].market_data.current_price.usd.toFixed(2) * curencyArray[currencySelect.value].currentPrice)
            coinPriceConverter.textContent = newPrice.toLocaleString("en-GB", { maximumFractionDigits: 2 }) + " " + curencyArray[currencySelect.value].currenctName

        })
    } catch {
    }
}
cryptoApiNarket()//

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
    exitMenuIcon.src = "/arena.github.io/image/close.png"
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
$('.btnDownArrow, .btnDown').click(() => {
    $(".companyMenu").slideToggle();
})//
// darkModd --------------------------------------------------->
const btnDarkMode = document.querySelector(".btnDarkMode")
const btnDarkModeIcon = document.querySelector(".btnDarkModeIcon")
btnDarkMode.addEventListener("click", darkMode)
btnDarkModeIcon.addEventListener("click", darkMode)
if (localStorage.getItem("darkModeLocalStorage")) {
    darkMode()
} else {
    btnDarkModeIcon.src = "/arena.github.io/image/sun.png"
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
        btnDarkModeIcon.src = "/arena.github.io/image/sun.png"
    } else {
        btnDarkMode.style.filter = "invert(1)"
        btnDarkModeIcon.src = "/arena.github.io/image/night-mode.png"
    }
}





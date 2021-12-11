const apiKey = {
    // "snireluztttt"
    key: "d9b02f17-a168-4ef7-acf3-08fbc413b142"
    // "zomereytan"
    // key: "fe405b4f-deab-45ec-8ef0-2539bf6cee94"
    // "snireluzttt"
    // key: "8a98211b-7093-4f17-9547-e70386f2269c"
    // "snireluz555"
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
// getApiTradingCoins ------------- >>
for (let i = 0; i < 7; i++) {
    $(".tredingCoins").html($(".tredingCoins").html() + `
        <a href="/Market/market-api.html">
            <div class="tredingCoinsDiv">
                <h2 class="tredingCoinsDivSymbol">..... / .....</h2>
                <h2 class="tredingCoinsDivPrice">0.00</h2>
                <h2 class="tredingCoinsDivName">Bitcoin</h2>
            </div>
        </a>
    `)
}
const array = []
let darkModeLocalStorage = []
const cryptoApi = async () => {
    let numberOfCoins = 10
    try {
        // getApi ------------------------------------------ >>
        // const bitcoinData = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=${numberOfCoins}&convert=USD&CMC_PRO_API_KEY=${apiKey.key}`)
        // const bitcoinD = await bitcoinData.json()
        // for (let i = 0; i < numberOfCoins; i++) {
        //     array.push(bitcoinD.data[i].id)
        // }
        // const bitcoinInfo = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${array}&CMC_PRO_API_KEY=${apiKey.key}`)
        // const bitcoinI = await bitcoinInfo.json()
        // console.log(bitcoinI)
        // const bitcoinMarket = await fetch(`https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=${apiKey.key}`)
        // const bitcoinM = await bitcoinMarket.json()
        const bitcoinMarket = await fetch(`https://api.coingecko.com/api/v3/global`)
        const bitcoinM = await bitcoinMarket.json()
        console.log(bitcoinM)
        const marketGeco = await fetch(`https://api.coingecko.com/api/v3/coins?per_page=10`)
        const marketG = await marketGeco.json()
        console.log(marketG)
        // getApiTradingCoins ------------------------------------------ >>
        $.get("https://api.coingecko.com/api/v3/search/trending", (status) => {
            console.log(status)
            $(".tredingCoinsDiv").remove()
            for (let i = 0; i < status.coins.length; i++) {
                $(".tredingCoins").html($(".tredingCoins").html() + `
                    <a href="/Market/market-api.html">
                        <div class="tredingCoinsDiv">
                            <h2 class="tredingCoinsDivSymbol">${status.coins[i].item.symbol}/USD</h2>
                            <h2 class="tredingCoinsDivPrice">$${(status.coins[i].item.price_btc * marketG[0].market_data.current_price.usd).toLocaleString("en-GB", { maximumFractionDigits: 2 })}</h2>
                            <h2 class="tredingCoinsDivName">${status.coins[i].item.name}</h2>
                        </div>
                    </a>
                `)
            }
        });
        //#region marketData
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
            coinDivLeftImg.src = marketG[i].image.small
            // coinDivLeftImg.src = bitcoinI.data[array[i]].logo
            // right
            coinDivRight.className = "coinDivRight"
            coinDivRightPrice.className = "coinDivRightPrice"
            coinDivRight24Volume.className = "coinDivRight24Volume"
            coinDivRight7daysVolume.className = "coinDivRight7daysVolume"
            // contentInfromationLefr ------------------------------------ >>
            coinDivLeftRank.textContent = marketG[i].market_data.market_cap_rank
            coinDivLeftName.textContent = marketG[i].name
            coinDivLeftSymbol.textContent = marketG[i].symbol.toUpperCase()
            // coinDivLeftRank.textContent = bitcoinD.data[i].cmc_rank
            // coinDivLeftName.textContent = bitcoinD.data[i].name
            // coinDivLeftSymbol.textContent = bitcoinD.data[i].symbol
            // textContentRight ------------------------------------ >>
            // {
            //     "id": "bitcoin",
            //     "symbol": "btc",
            //     "name": "Bitcoin",
            //     "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
            //     "current_price": 48505,
            //     "market_cap": 916658208212,
            //     "market_cap_rank": 1,
            //     "fully_diluted_valuation": 1018595727820,
            //     "total_volume": 24322196615,
            //     "high_24h": 49336,
            //     "low_24h": 47033,
            //     "price_change_24h": 407.64,
            //     "price_change_percentage_24h": 0.84753,
            //     "market_cap_change_24h": 3734436152,
            //     "market_cap_change_percentage_24h": 0.40906,
            //     "circulating_supply": 18898393,
            //     "total_supply": 21000000,
            //     "max_supply": 21000000,
            //     "ath": 69045,
            //     "ath_change_percentage": -29.69992,
            //     "ath_date": "2021-11-10T14:24:11.849Z",
            //     "atl": 67.81,
            //     "atl_change_percentage": 71481.24787,
            //     "atl_date": "2013-07-06T00:00:00.000Z",
            //     "roi": null,
            //     "last_updated": "2021-12-11T21:49:38.684Z"
            // }
            coinDivRightPrice.textContent = `$${new Number(marketG[i].market_data.current_price.usd).toLocaleString("en-GB", { maximumFractionDigits: 2 })}`
            coinDivRightPrice.title = `$${new Number(marketG[i].market_data.current_price.usd).toLocaleString("en-GB", { maximumFractionDigits: 5 })}`
            coinDivRight24Volume.textContent = `${marketG[i].market_data.price_change_percentage_24h.toFixed(2)}%`
            coinDivRight7daysVolume.textContent = `${marketG[i].market_data.price_change_percentage_7d.toFixed(2)}% `
            // coinDivRightPrice.textContent = `$${new Number(bitcoinD.data[i].quote.USD.price).toLocaleString("en-GB", { maximumFractionDigits: 2 })}`
            // coinDivRightPrice.title = `$${new Number(bitcoinD.data[i].quote.USD.price).toLocaleString("en-GB", { maximumFractionDigits: 5 })}`
            // coinDivRight24Volume.textContent = `${bitcoinD.data[i].quote.USD.percent_change_24h.toFixed(2)}%`
            // coinDivRight7daysVolume.textContent = `${bitcoinD.data[i].quote.USD.percent_change_7d.toFixed(2)}% `
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
            if (marketG[i].market_data.price_change_percentage_24h.toFixed(2) <= 0) {
                coinDivRight24Volume.style.color = "red"
            } else {
                coinDivRight24Volume.textContent = `+${marketG[i].market_data.price_change_percentage_24h.toFixed(2)}%`
            }
            if (marketG[i].market_data.price_change_percentage_7d.toFixed(2) <= 0) {
                coinDivRight7daysVolume.style.color = "red"
            } else {
                coinDivRight7daysVolume.textContent = `+${marketG[i].market_data.price_change_percentage_7d.toFixed(2)}%`
            }
            //#endregion
            coinDiv.addEventListener("click", function () {
                location.href = "/arena.github.io/Market/market-api.html"
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
})
// goToFaq`
setTimeout(() => { $(".goToFaq").css("display", "flex"); }, 2000);
$(".closeGoToFaq").click(() => { $(".goToFaq").hide() })//
// darkModd --------------------------------------------------->
const btnDarkMode = document.querySelector(".btnDarkMode")
const btnDarkModeIcon = document.querySelector(".btnDarkModeIcon")
btnDarkMode.addEventListener("click", darkMode)
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
        btnDarkMode.style.background = "black"
        localStorage.clear("darkModeLocalStorage")
        btnDarkModeIcon.src = "/arena.github.io/image/sun.png"
    } else {
        btnDarkMode.style.filter = "invert(1)"
        btnDarkModeIcon.src = "/arena.github.io/image/night-mode.png"
    }

}





// News[5] --------------------------------------------------->
const newsApi = async () => {
    try {
        const newsData = await fetch(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN`)
        const newsD = await newsData.json()
        const container002NewsBaner = document.querySelector(".container002NewsBaner")
        const container002News = document.querySelector(".container002News")
        console.log(newsD)
        for (let i = 0; i < 5; i++) {
            container002News.innerHTML +=`
                <div class="container002NewsBaner">
                    <img class="container002NewsBanerImg" src=${newsD.Data[i].imageurl} alt="">
                    <h3 class="container002NewsBanerTitle">${(newsD.Data[i].title.substring(0, 25) + "...")}</h3>
                    <img class="creditImgBanner" src="/arena.github.io/image/bitcoin.png" alt="">
                    <h6 class="creditNameBanner">${newsD.Data[i].source} - 16h ago</h6>
                </div>
            `
        }
    } catch (error) { }
}
newsApi()

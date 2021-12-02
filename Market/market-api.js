const apiKey = {
    key: "d9b02f17-a168-4ef7-acf3-08fbc413b142"
}

// querySelector ------------------------------------------------>
const mainContainer = document.querySelector(".mainContainer")
const header = document.querySelector(".header")
const menuHeaderIcon = document.querySelector(".menuHeaderIcon")
const menu = document.querySelector(".menu")
const market = document.querySelector(".market")
const inpSearch = document.querySelector(".inpSearch")
const coins = document.querySelector(".coins")
const pages = document.querySelector(".pages")
const footer = document.querySelector(".footer")//
// appendChild -------------------------------------------------->
document.body.appendChild(mainContainer)
mainContainer.appendChild(market)
mainContainer.appendChild(footer)
market.appendChild(pages)
market.appendChild(coins)
//
const btn1 = document.querySelector(".btn1")
const btn2 = document.querySelector(".btn2")
btn1.style.display = "none"
btn2.style.display = "none"
btn1.style.pointerEvents = "none";
let num = 1
btn1.addEventListener("click", function () {
    num = num - 50
    coins.innerHTML = ""
    inpSearch.value = ""
    cryptoApi()
    console.log(num)
    if (num < 5) {
        btn1.style.display = "none"
        btn1.style.pointerEvents = "none";
    }
})
btn2.addEventListener("click", function () {
    num = num + 50
    btn1.style.display = "block"
    btn1.style.pointerEvents = "auto";
    coins.innerHTML = ""
    inpSearch.value = ""
    colorsValueMenu("spot", "gainers", "losers")
    cryptoApi()
    console.log(num)
})
// cryptoApi ---------------------------------------------------->
let darkModeLocalStorage = []
let array = []
let arrayCoinsD = []
let arrayCoinsI = []
// marketValue --------------------------------------------------->
function colorsValueMenu(spot, gainers, losers) {
    $(`.${spot}`).css("background-color", "rgb(235, 235, 235)")
    $(`.${gainers}`).css("background-color", "rgb(251, 251, 251)")
    $(`.${losers}`).css("background-color", "rgb(251, 251, 251)")
}
function opacity(zeroFourOpacity, oneOpacity) {
    $(`.${zeroFourOpacity}`).css('opacity', '0.4')
    $(`.${oneOpacity}`).css('opacity', '1')
}
$(".spot").css("background-color", "rgb(235, 235, 235)")
$(".spot").click(() => {
    colorsValueMenu("spot", "gainers", "losers")
    $(".coinInfromation2").css("display", "none")
    $(".loading").css("display", "none")
    $(".headerCoins").css("display", "flex")
    $(".coins").css("display", "block")
    $(".coinInfromationHeader").css("display", "flex")
    rank = arrayCoinsD.sort(function (a, b) { return a.cmc_rank - b.cmc_rank })
    createCoinDiv(arrayCoinsD, arrayCoinsI)
    $(`.change7dArrowUp,.change7dArrowDown,.change24hArrowUp,.change24hArrowDown,.changePriceArrowUp,.changePriceArrowDown,.changeRankArrowUp,.changeRankArrowDown`).css('opacity', '0.4')
    $(".changeRankArrowClick,.changePqriceArrowClick,.change24hArrowClick,.change7dArrowClick").each(function () {
        this.style.pointerEvents = 'auto';
    });
})
$(".gainers").click(() => {
    inpSearch.value = ""
    colorsValueMenu("gainers", "spot", "losers")
    $(".coinInfromation2").css("display", "none")
    $(".loading").css("display", "none")
    $(".headerCoins").css("display", "flex")
    $(".coins").css("display", "block")
    $(".coinInfromationHeader").css("display", "flex")
    $(`.change7dArrowUp,.change7dArrowDown,.change24hArrowUp,.change24hArrowDown,.changePriceArrowUp,.changePriceArrowDown,.changeRankArrowUp,.changeRankArrowDown`).css('opacity', '0.4')
    $(".changeRankArrowClick,.changePriceArrowClick,.change24hArrowClick,.change7dArrowClick").each(function () {
        this.style.pointerEvents = 'none';
    });
    gainers = arrayCoinsD.sort(function (a, b) { return b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h })
    letgainers = gainers.filter((bigger1m) => bigger1m.quote.USD.percent_change_24h > 0)
    letgainers.length = 10
    createCoinDiv(letgainers, arrayCoinsI)
})
$(".losers").click(() => {
    inpSearch.value = ""
    colorsValueMenu("losers", "spot", "gainers")
    $(".coinInfromation2").css("display", "none")
    $(".loading").css("display", "none")
    $(".headerCoins").css("display", "flex")
    $(".coins").css("display", "block")
    $(".coinInfromationHeader").css("display", "flex")
    $(`.change7dArrowUp,.change7dArrowDown,.change24hArrowUp,.change24hArrowDown,.changePriceArrowUp,.changePriceArrowDown,.changeRankArrowUp,.changeRankArrowDown`).css('opacity', '0.4')
    $(".changeRankArrowClick,.changePriceArrowClick,.change24hArrowClick,.change7dArrowClick").each(function () {
        this.style.pointerEvents = 'none';
    });
    losers = arrayCoinsD.sort(function (a, b) { return a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h })
    letlosers = losers.filter((bigger1m) => bigger1m.quote.USD.percent_change_24h < 0)
    letlosers.length = 10
    createCoinDiv(letlosers, arrayCoinsI)
})
$(".changeRankArrowClick").click(() => {
    $(`.change7dArrowUp,.change7dArrowDown,.change24hArrowUp,.change24hArrowDown,.changePriceArrowUp,.changePriceArrowDown`).css('opacity', '0.4')
    if ($(".changeRankArrowUp").css('opacity') == 0.4) {
        opacity("changeRankArrowDown", "changeRankArrowUp")
        lower = arrayCoinsD.sort(function (a, b) { return b.cmc_rank - a.cmc_rank })
        createCoinDiv(arrayCoinsD, arrayCoinsI)
    } else if ($(".changeRankArrowUp").css('opacity') != 0.4) {
        opacity("changeRankArrowUp", "changeRankArrowDown")
        highest = arrayCoinsD.sort(function (a, b) { return a.cmc_rank - b.cmc_rank })
        createCoinDiv(arrayCoinsD, arrayCoinsI)
    }
})
$(".changePriceArrowClick").click(() => {
    $(`.change7dArrowUp,.change7dArrowDown,.change24hArrowUp,.change24hArrowDown,.changeRankArrowUp,.changeRankArrowDown`).css('opacity', '0.4')
    if ($(".changePriceArrowUp").css('opacity') == 0.4) {
        opacity("changePriceArrowDown", "changePriceArrowUp")
        lower = arrayCoinsD.sort(function (a, b) { return b.quote.USD.price - a.quote.USD.price })
        createCoinDiv(arrayCoinsD, arrayCoinsI)
    } else if ($(".changePriceArrowUp").css('opacity') != 0.4) {
        opacity("changePriceArrowUp", "changePriceArrowDown")
        highest = arrayCoinsD.sort(function (a, b) { return a.quote.USD.price - b.quote.USD.price })
        createCoinDiv(arrayCoinsD, arrayCoinsI)
    }
})
$(".change24hArrowClick").click(() => {
    $(`.change7dArrowUp,.change7dArrowDown,.changePriceArrowUp,.changePriceArrowDown,.changeRankArrowUp,.changeRankArrowDown`).css('opacity', '0.4')
    if ($(".change24hArrowUp").css('opacity') == 0.4) {
        opacity("change24hArrowDown", "change24hArrowUp")
        lower = arrayCoinsD.sort(function (a, b) { return b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h })
        createCoinDiv(arrayCoinsD, arrayCoinsI)
    } else if ($(".change24hArrowUp").css('opacity') != 0.4) {
        opacity("change24hArrowUp", "change24hArrowDown")
        highest = arrayCoinsD.sort(function (a, b) { return a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h })
        createCoinDiv(arrayCoinsD, arrayCoinsI)
    }
})
$(".change7dArrowClick").click(() => {
    $(`.change24hArrowUp,.change24hArrowDown,.changePriceArrowUp,.changePriceArrowDown,.changeRankArrowUp,.changeRankArrowDown`).css('opacity', '0.4')
    if ($(".change7dArrowUp").css('opacity') == 0.4) {
        opacity("change7dArrowDown", "change7dArrowUp")
        lower = arrayCoinsD.sort(function (a, b) { return b.quote.USD.percent_change_7d - a.quote.USD.percent_change_7d })
        createCoinDiv(arrayCoinsD, arrayCoinsI)
    } else if ($(".change7dArrowUp").css('opacity') == 1) {
        opacity("change7dArrowUp", "change7dArrowDown")
        highest = arrayCoinsD.sort(function (a, b) { return a.quote.USD.percent_change_7d - b.quote.USD.percent_change_7d })
        createCoinDiv(arrayCoinsD, arrayCoinsI)
    } else if ($(".change7dArrowUp").css('opacity') == 0.4 || $(".change7dArrowDown").css('opacity') == 1) {
        console.log("3")
        $(`.change7dArrowUp,.change7dArrowDown`).css('opacity', '0.4')
        createCoinDiv(arrayCoinsD, arrayCoinsI)
    }
})
function createCoinDiv(bitcoinD, bitcoinI) {
    coins.innerHTML = ""
    const newArrayD = arrayCoinsD.filter(coin => coin.name.toLowerCase().includes(inpSearch.value.toLowerCase()))
    for (let i = 0; i < newArrayD.length; i++) {
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
        coinDivLeftImg.src = bitcoinI[array[i]].logo
        // right
        coinDivRight.className = "coinDivRight"
        coinDivRightPrice.className = "coinDivRightPrice"
        coinDivRight24Volume.className = "coinDivRight24Volume"
        coinDivRight7daysVolume.className = "coinDivRight7daysVolume"
        // textContentLeft ------------------------------------ >>
        coinDivLeftRank.textContent = bitcoinD[i].cmc_rank
        coinDivLeftName.textContent = bitcoinD[i].name
        coinDivLeftSymbol.textContent = bitcoinD[i].symbol
        // textContentRight ------------------------------------ >>
        coinDivRightPrice.textContent = `$${new Number(bitcoinD[i].quote.USD.price).toLocaleString("en-GB", { maximumFractionDigits: 2 })}`
        coinDivRightPrice.title = `$${new Number(bitcoinD[i].quote.USD.price).toLocaleString("en-GB", { maximumFractionDigits: 5 })}`
        coinDivRight24Volume.textContent = `${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}%`
        coinDivRight7daysVolume.textContent = `${bitcoinD[i].quote.USD.percent_change_7d.toFixed(2)}% `
        // appendChild ------------------------------------------- >>
        coins.appendChild(coinDiv)
        coins.appendChild(pages)
        pages.appendChild(btn1)
        pages.appendChild(btn2)
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
        if (bitcoinD[i].quote.USD.percent_change_24h.toFixed(2) <= 0) {
            coinDivRight24Volume.style.color = "red"
        } else {
            coinDivRight24Volume.textContent = `+${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}% `
        }
        if (bitcoinD[i].quote.USD.percent_change_7d.toFixed(2) <= 0) {
            coinDivRight7daysVolume.style.color = "red"
        } else {
            coinDivRight7daysVolume.textContent = `+${bitcoinD[i].quote.USD.percent_change_7d.toFixed(2)}% `
        }
        //#endregion
        coinDiv.addEventListener("click", () => {
            // querySelector ------------------------------------ >>
            const coinInfromation = document.querySelector(".coinInfromation")
            const coinInfromationHeader = document.querySelector(".coinInfromationHeader")
            const coinInfromationHeaderMarketCoinExit = document.querySelector(".coinInfromationHeaderMarketCoinExit")
            const coinInfromationHeaderMarket = document.querySelector(".coinInfromationHeaderMarket")
            const coinInfromationHeaderMarketCoin = document.querySelector(".coinInfromationHeaderMarketCoin")
            //Profile
            const coinInfromationProfile = document.querySelector(".coinInfromationProfile")
            const coinInfromationImg = document.querySelector(".coinInfromationImg")
            const coinInfromationName = document.querySelector(".coinInfromationName")
            const coinInfromationSymbol = document.querySelector(".coinInfromationSymbol")
            const coinInfromationPairs = document.querySelector(".coinInfromationPairs")
            const coinInfromationPrice = document.querySelector(".coinInfromationPrice")
            //marketCap
            const MarketCapNum = document.querySelector(".MarketCapNum")
            const MarketCapPercent = document.querySelector(".MarketCapPercent")
            const dilutedCirculatingSupplyNum = document.querySelector(".dilutedCirculatingSupplyNum")
            const dilutedCirculatingSupplyPercent = document.querySelector(".dilutedCirculatingSupplyPercent")
            const dayVolumeNum = document.querySelector(".dayVolumeNum")
            const dayVolumePercent = document.querySelector(".dayVolumePercent")
            //changes
            const hourChangePercent = document.querySelector(".hourChangePercent")
            const hour24ChangePercent = document.querySelector(".hour24ChangePercent")
            const day7ChangePercent = document.querySelector(".day7ChangePercent")
            const day30ChangePercent = document.querySelector(".day30ChangePercent")
            // textContent ------------------------------------ >>
            coinInfromationHeaderMarketCoin.textContent = bitcoinD[i].name
            //Profile
            coinInfromationImg.src = bitcoinI[array[i]].logo
            coinInfromationName.textContent = bitcoinD[i].name
            coinInfromationSymbol.textContent = bitcoinD[i].symbol
            coinInfromationPairs.textContent = `(${bitcoinD[i].symbol}/USD)`
            coinInfromationPrice.textContent = `$${new Number(bitcoinD[i].quote.USD.price).toLocaleString("en-GB", { maximumFractionDigits: 2 })}`
            //marketCap
            MarketCapNum.textContent = `$${new Number(bitcoinD[i].quote.USD.market_cap).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`
            MarketCapPercent.textContent = `${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}%`
            dilutedCirculatingSupplyNum.textContent = `$${new Number(bitcoinD[i].quote.USD.fully_diluted_market_cap).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`
            dilutedCirculatingSupplyPercent.textContent = `${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}%`
            dayVolumeNum.textContent = `$${new Number(bitcoinD[i].quote.USD.volume_24h).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`
            dayVolumePercent.textContent = `${bitcoinD[i].quote.USD.volume_change_24h.toFixed(2)}%`
            //changes
            hourChangePercent.textContent = `${bitcoinD[i].quote.USD.percent_change_1h.toFixed(2)}% `
            hour24ChangePercent.textContent = `${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}%`
            day7ChangePercent.textContent = `${bitcoinD[i].quote.USD.percent_change_7d.toFixed(2)}% `
            day30ChangePercent.textContent = `${bitcoinD[i].quote.USD.percent_change_30d.toFixed(2)}% `
            // chart ----------------------------------------------- >>
            let darkLight = ""
            btnDarkMode.addEventListener("click", () => {
                if (localStorage.getItem("darkModeLocalStorage")) {
                    darkLight = "dark"
                } else {
                    darkLight = "light"
                }
                new TradingView.widget(
                    {
                        "autosize": true,
                        "symbol": `KUCOIN:${sym}USDT`,
                        "interval": "1",
                        "timezone": "Etc/UTC",
                        "theme": `${darkLight}`,
                        "style": "3",
                        "locale": "en",
                        "toolbar_bg": "#f1f3f6",
                        "enable_publishing": false,
                        "hide_top_toolbar": false,
                        "save_image": true,
                        "show_popup_button": true,
                        "popup_width": "1000",
                        "popup_height": "650",
                        "container_id": "tradingview_858d7"
                    },
                );
            })
            if (localStorage.getItem("darkModeLocalStorage")) {
                darkLight = "dark"
            } else {
                darkLight = "light"
            }
            sym = bitcoinD[i].symbol
            new TradingView.widget(
                {
                    "autosize": true,
                    "symbol": `KUCOIN:${sym}USDT`,
                    "interval": "1",
                    "timezone": "Etc/UTC",
                    "theme": `${darkLight}`,
                    "style": "3",
                    "locale": "en",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "hide_top_toolbar": false,
                    "save_image": true,
                    "show_popup_button": true,
                    "popup_width": "1000",
                    "popup_height": "650",
                    "container_id": "tradingview_858d7"
                },
            );
            console.log(darkLight)
            // about ----------------------------------------------- >>
            // querySelector
            const secondContentHeaderAbout = document.querySelector(".secondContentHeaderAbout")
            const secondContentInfromationDescription = document.querySelector(".secondContentInfromationDescription")
            const secondContentInfromationAdded = document.querySelector(".secondContentInfromationAdded")
            const secondContentLinksWebsite = document.querySelector(".secondContentLinksWebsite")
            const secondContentLinksSourceCode = document.querySelector(".secondContentLinksSourceCode")
            const secondContentLinksTechnicalDoc = document.querySelector(".secondContentLinksTechnicalDoc")
            const secondContentLinksReddit = document.querySelector(".secondContentLinksReddit")
            const secondContentLinksTelegram = document.querySelector(".secondContentLinksTelegram")
            const secondContentLinksTwiter = document.querySelector(".secondContentLinksTwiter")
            // textContent ------------------------------------ >>
            secondContentHeaderAbout.textContent = `About ${bitcoinI[array[i]].name}`
            secondContentInfromationDescription.textContent = bitcoinI[array[i]].description
            secondContentInfromationAdded.textContent = `Released: ${bitcoinI[array[i]].date_added.substring(0, 10,).split('-').reverse().join('-')}`
            secondContentLinksWebsite.textContent = `${bitcoinI[array[i]].name}.com`
            secondContentLinksSourceCode.textContent = bitcoinI[array[i]].urls.source_code
            secondContentLinksTechnicalDoc.textContent = "Technical Documentation"
            secondContentLinksReddit.textContent = `Reddit`
            secondContentLinksTelegram.textContent = `Chat`
            secondContentLinksTwiter.textContent = `Twitter`
            // href & targt ------------------------------------ >>
            secondContentLinksWebsite.href = bitcoinI[array[i]].urls.website
            secondContentLinksWebsite.target = "_blank"
            secondContentLinksSourceCode.href = bitcoinI[array[i]].urls.source_code
            secondContentLinksSourceCode.target = "_blank"
            secondContentLinksTechnicalDoc.href = bitcoinI[array[i]].urls.technical_doc
            secondContentLinksTechnicalDoc.target = "_blank"
            secondContentLinksReddit.href = bitcoinI[array[i]].urls.reddit
            secondContentLinksReddit.target = "_blank"
            secondContentLinksTelegram.href = bitcoinI[array[i]].urls.chat
            secondContentLinksTelegram.target = "_blank"
            secondContentLinksTwiter.href = bitcoinI[array[i]].urls.twitter
            secondContentLinksTwiter.target = "_blank"
            // addEventListener ------------------------------------ >>
            coinInfromationHeaderMarketCoinExit.addEventListener("click", function () {
                coinInfromation.style.display = "none"
                coins.style.display = "flex"
            })
            coins.style.display = "none"
            coinInfromation.style.display = "inline-block"

            //#region ifElse / Green / Red
            //marketCap
            if (bitcoinD[i].quote.USD.percent_change_24h.toFixed(2) <= 0) {
                dilutedCirculatingSupplyPercent.style.color = "red"
            } else {
                dilutedCirculatingSupplyPercent.textContent = `+${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}%`
                dilutedCirculatingSupplyPercent.style.color = "green"
            }
            if (bitcoinD[i].quote.USD.percent_change_24h.toFixed(2) <= 0) {
                MarketCapPercent.style.color = "red"
            } else {
                MarketCapPercent.textContent = `+${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}%`
                MarketCapPercent.style.color = "green"
            }
            if (bitcoinD[i].quote.USD.volume_change_24h.toFixed(2) <= 0) {
                dayVolumePercent.style.color = "red"
            } else {
                dayVolumePercent.textContent = `+${bitcoinD[i].quote.USD.volume_change_24h.toFixed(2)}%`
                dayVolumePercent.style.color = "green"
            }
            //changes
            if (bitcoinD[i].quote.USD.percent_change_1h.toFixed(2) <= 0) {
                hourChangePercent.style.color = "red"
            } else {
                hourChangePercent.textContent = `+${bitcoinD[i].quote.USD.percent_change_1h.toFixed(2)}%`
                hourChangePercent.style.color = "green"
            }//1h
            if (bitcoinD[i].quote.USD.percent_change_24h.toFixed(2) <= 0) {
                hour24ChangePercent.style.color = "red"
            } else {
                hour24ChangePercent.textContent = `+${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}%`
                hour24ChangePercent.style.color = "green"
            }//24h
            if (bitcoinD[i].quote.USD.percent_change_7d.toFixed(2) <= 0) {
                day7ChangePercent.style.color = "red"
            } else {
                day7ChangePercent.textContent = `+${bitcoinD[i].quote.USD.percent_change_7d.toFixed(2)}%`
                day7ChangePercent.style.color = "green"
            }//7d
            if (bitcoinD[i].quote.USD.percent_change_30d.toFixed(2) <= 0) {
                day30ChangePercent.style.color = "red"
            } else {
                day30ChangePercent.textContent = `+${bitcoinD[i].quote.USD.percent_change_30d.toFixed(2)}%`
                day30ChangePercent.style.color = "green"
            }//
            //#endregion
        })
    }
}
function createCoinDivSearch(bitcoinD, bitcoinI) {
    coins.innerHTML = ""
    const newArrayD = arrayCoinsD.filter(coin => coin.name.toLowerCase().includes(inpSearch.value.toLowerCase()))
    for (let i = 0; i < newArrayD.length; i++) {
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
        console.log("1")
        // null
        // undefined
        // NaN
        // empty string ("")
        // 0
        // false
        coinDivLeftImg.src = bitcoinI[[i]].logo
        console.log("2")
        // right
        coinDivRight.className = "coinDivRight"
        coinDivRightPrice.className = "coinDivRightPrice"
        coinDivRight24Volume.className = "coinDivRight24Volume"
        coinDivRight7daysVolume.className = "coinDivRight7daysVolume"
        // textContentLeft ------------------------------------ >>
        coinDivLeftRank.textContent = bitcoinD[i].cmc_rank
        coinDivLeftName.textContent = bitcoinD[i].name
        coinDivLeftSymbol.textContent = bitcoinD[i].symbol
        // textContentRight ------------------------------------ >>
        coinDivRightPrice.textContent = `$${new Number(bitcoinD[i].quote.USD.price).toLocaleString("en-GB", { maximumFractionDigits: 2 })}`
        coinDivRightPrice.title = `$${new Number(bitcoinD[i].quote.USD.price).toLocaleString("en-GB", { maximumFractionDigits: 5 })}`
        coinDivRight24Volume.textContent = `${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}%`
        coinDivRight7daysVolume.textContent = `${bitcoinD[i].quote.USD.percent_change_7d.toFixed(2)}% `
        // appendChild ------------------------------------------- >>
        coins.appendChild(coinDiv)
        coins.appendChild(pages)
        pages.appendChild(btn1)
        pages.appendChild(btn2)
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
        if (bitcoinD[i].quote.USD.percent_change_24h.toFixed(2) <= 0) {
            coinDivRight24Volume.style.color = "red"
        } else {
            coinDivRight24Volume.textContent = `+${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}% `
        }
        if (bitcoinD[i].quote.USD.percent_change_7d.toFixed(2) <= 0) {
            coinDivRight7daysVolume.style.color = "red"
        } else {
            coinDivRight7daysVolume.textContent = `+${bitcoinD[i].quote.USD.percent_change_7d.toFixed(2)}% `
        }
        //#endregion
        coinDiv.addEventListener("click", () => {
            // querySelector ------------------------------------ >>
            const coinInfromation = document.querySelector(".coinInfromation")
            const coinInfromationHeader = document.querySelector(".coinInfromationHeader")
            const coinInfromationHeaderMarketCoinExit = document.querySelector(".coinInfromationHeaderMarketCoinExit")
            const coinInfromationHeaderMarket = document.querySelector(".coinInfromationHeaderMarket")
            const coinInfromationHeaderMarketCoin = document.querySelector(".coinInfromationHeaderMarketCoin")
            //Profile
            const coinInfromationProfile = document.querySelector(".coinInfromationProfile")
            const coinInfromationImg = document.querySelector(".coinInfromationImg")
            const coinInfromationName = document.querySelector(".coinInfromationName")
            const coinInfromationSymbol = document.querySelector(".coinInfromationSymbol")
            const coinInfromationPairs = document.querySelector(".coinInfromationPairs")
            const coinInfromationPrice = document.querySelector(".coinInfromationPrice")
            //marketCap
            const MarketCapNum = document.querySelector(".MarketCapNum")
            const MarketCapPercent = document.querySelector(".MarketCapPercent")
            const dilutedCirculatingSupplyNum = document.querySelector(".dilutedCirculatingSupplyNum")
            const dilutedCirculatingSupplyPercent = document.querySelector(".dilutedCirculatingSupplyPercent")
            const dayVolumeNum = document.querySelector(".dayVolumeNum")
            const dayVolumePercent = document.querySelector(".dayVolumePercent")
            //changes
            const hourChangePercent = document.querySelector(".hourChangePercent")
            const hour24ChangePercent = document.querySelector(".hour24ChangePercent")
            const day7ChangePercent = document.querySelector(".day7ChangePercent")
            const day30ChangePercent = document.querySelector(".day30ChangePercent")
            // textContent ------------------------------------ >>
            coinInfromationHeaderMarketCoin.textContent = bitcoinD[i].name
            //Profile
            coinInfromationImg.src = bitcoinI[[i]].logo
            coinInfromationName.textContent = bitcoinD[i].name
            coinInfromationSymbol.textContent = bitcoinD[i].symbol
            coinInfromationPairs.textContent = `(${bitcoinD[i].symbol}/USD)`
            coinInfromationPrice.textContent = `$${new Number(bitcoinD[i].quote.USD.price).toLocaleString("en-GB", { maximumFractionDigits: 2 })}`
            //marketCap
            MarketCapNum.textContent = `$${new Number(bitcoinD[i].quote.USD.market_cap).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`
            MarketCapPercent.textContent = `${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}%`
            dilutedCirculatingSupplyNum.textContent = `$${new Number(bitcoinD[i].quote.USD.fully_diluted_market_cap).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`
            dilutedCirculatingSupplyPercent.textContent = `${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}%`
            dayVolumeNum.textContent = `$${new Number(bitcoinD[i].quote.USD.volume_24h).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`
            dayVolumePercent.textContent = `${bitcoinD[i].quote.USD.volume_change_24h.toFixed(2)}%`
            //changes
            hourChangePercent.textContent = `${bitcoinD[i].quote.USD.percent_change_1h.toFixed(2)}% `
            hour24ChangePercent.textContent = `${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}%`
            day7ChangePercent.textContent = `${bitcoinD[i].quote.USD.percent_change_7d.toFixed(2)}% `
            day30ChangePercent.textContent = `${bitcoinD[i].quote.USD.percent_change_30d.toFixed(2)}% `
            // chart ----------------------------------------------- >>
            let darkLight = ""
            btnDarkMode.addEventListener("click", () => {
                if (localStorage.getItem("darkModeLocalStorage")) {
                    darkLight = "dark"
                } else {
                    darkLight = "light"
                }
                new TradingView.widget(
                    {
                        "autosize": true,
                        "symbol": `KUCOIN:${sym}USDT`,
                        "interval": "1",
                        "timezone": "Etc/UTC",
                        "theme": `${darkLight}`,
                        "style": "3",
                        "locale": "en",
                        "toolbar_bg": "#f1f3f6",
                        "enable_publishing": false,
                        "hide_top_toolbar": false,
                        "save_image": true,
                        "show_popup_button": true,
                        "popup_width": "1000",
                        "popup_height": "650",
                        "container_id": "tradingview_858d7"
                    },
                );
            })
            if (localStorage.getItem("darkModeLocalStorage")) {
                darkLight = "dark"
            } else {
                darkLight = "light"
            }
            sym = bitcoinD[i].symbol
            new TradingView.widget(
                {
                    "autosize": true,
                    "symbol": `KUCOIN:${sym}USDT`,
                    "interval": "1",
                    "timezone": "Etc/UTC",
                    "theme": `${darkLight}`,
                    "style": "3",
                    "locale": "en",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "hide_top_toolbar": false,
                    "save_image": true,
                    "show_popup_button": true,
                    "popup_width": "1000",
                    "popup_height": "650",
                    "container_id": "tradingview_858d7"
                },
            );
            console.log(darkLight)
            // about ----------------------------------------------- >>
            // querySelector
            const secondContentHeaderAbout = document.querySelector(".secondContentHeaderAbout")
            const secondContentInfromationDescription = document.querySelector(".secondContentInfromationDescription")
            const secondContentInfromationAdded = document.querySelector(".secondContentInfromationAdded")
            const secondContentLinksWebsite = document.querySelector(".secondContentLinksWebsite")
            const secondContentLinksSourceCode = document.querySelector(".secondContentLinksSourceCode")
            const secondContentLinksTechnicalDoc = document.querySelector(".secondContentLinksTechnicalDoc")
            const secondContentLinksReddit = document.querySelector(".secondContentLinksReddit")
            const secondContentLinksTelegram = document.querySelector(".secondContentLinksTelegram")
            const secondContentLinksTwiter = document.querySelector(".secondContentLinksTwiter")
            // textContent ------------------------------------ >>
            secondContentHeaderAbout.textContent = `About ${bitcoinI[[i]].name}`
            secondContentInfromationDescription.textContent = bitcoinI[[i]].description
            secondContentInfromationAdded.textContent = `Released: ${bitcoinI[[i]].date_added.substring(0, 10,).split('-').reverse().join('-')}`
            secondContentLinksWebsite.textContent = `${bitcoinI[[i]].name}.com`
            secondContentLinksSourceCode.textContent = bitcoinI[[i]].urls.source_code
            secondContentLinksTechnicalDoc.textContent = "Technical Documentation"
            secondContentLinksReddit.textContent = `Reddit`
            secondContentLinksTelegram.textContent = `Chat`
            secondContentLinksTwiter.textContent = `Twitter`
            // href & targt ------------------------------------ >>
            secondContentLinksWebsite.href = bitcoinI[[i]].urls.website
            secondContentLinksWebsite.target = "_blank"
            secondContentLinksSourceCode.href = bitcoinI[[i]].urls.source_code
            secondContentLinksSourceCode.target = "_blank"
            secondContentLinksTechnicalDoc.href = bitcoinI[[i]].urls.technical_doc
            secondContentLinksTechnicalDoc.target = "_blank"
            secondContentLinksReddit.href = bitcoinI[[i]].urls.reddit
            secondContentLinksReddit.target = "_blank"
            secondContentLinksTelegram.href = bitcoinI[[i]].urls.chat
            secondContentLinksTelegram.target = "_blank"
            secondContentLinksTwiter.href = bitcoinI[[i]].urls.twitter
            secondContentLinksTwiter.target = "_blank"
            // addEventListener ------------------------------------ >>
            coinInfromationHeaderMarketCoinExit.addEventListener("click", function () {
                coinInfromation.style.display = "none"
                coins.style.display = "flex"
            })
            coins.style.display = "none"
            coinInfromation.style.display = "block"
            //marketCap
            if (bitcoinD[i].quote.USD.percent_change_24h.toFixed(2) <= 0) {
                dilutedCirculatingSupplyPercent.style.color = "red"
            } else {
                dilutedCirculatingSupplyPercent.textContent = `+${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}%`
                dilutedCirculatingSupplyPercent.style.color = "green"
            }
            if (bitcoinD[i].quote.USD.percent_change_24h.toFixed(2) <= 0) {
                MarketCapPercent.style.color = "red"
            } else {
                MarketCapPercent.textContent = `+${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}%`
                MarketCapPercent.style.color = "green"
            }
            if (bitcoinD[i].quote.USD.volume_change_24h.toFixed(2) <= 0) {
                dayVolumePercent.style.color = "red"
            } else {
                dayVolumePercent.textContent = `+${bitcoinD[i].quote.USD.volume_change_24h.toFixed(2)}%`
                dayVolumePercent.style.color = "green"
            }
            //changes
            if (bitcoinD[i].quote.USD.percent_change_1h.toFixed(2) <= 0) {
                hourChangePercent.style.color = "red"
            } else {
                hourChangePercent.textContent = `+${bitcoinD[i].quote.USD.percent_change_1h.toFixed(2)}%`
                hourChangePercent.style.color = "green"
            }//1h
            if (bitcoinD[i].quote.USD.percent_change_24h.toFixed(2) <= 0) {
                hour24ChangePercent.style.color = "red"
            } else {
                hour24ChangePercent.textContent = `+${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}%`
                hour24ChangePercent.style.color = "green"
            }//24h
            if (bitcoinD[i].quote.USD.percent_change_7d.toFixed(2) <= 0) {
                day7ChangePercent.style.color = "red"
            } else {
                day7ChangePercent.textContent = `+${bitcoinD[i].quote.USD.percent_change_7d.toFixed(2)}%`
                day7ChangePercent.style.color = "green"
            }//7d
            if (bitcoinD[i].quote.USD.percent_change_30d.toFixed(2) <= 0) {
                day30ChangePercent.style.color = "red"
            } else {
                day30ChangePercent.textContent = `+${bitcoinD[i].quote.USD.percent_change_30d.toFixed(2)}%`
                day30ChangePercent.style.color = "green"
            }//
            //#endregion        })
        })
    }
}
const cryptoApi = async () => {
    let numberOfCoins = 200
    try {
        // getApi ------------------------------------------ >>
        //#region
        const bitcoinData = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${num}&limit=${numberOfCoins}&CMC_PRO_API_KEY=${apiKey.key}`)
        const bitcoinD = await bitcoinData.json()
        array = []
        for (let i = 0; i < numberOfCoins; i++) {
            array.push(bitcoinD.data[i].id)
        }
        const bitcoinInfo = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${array}&CMC_PRO_API_KEY=${apiKey.key}`)
        const bitcoinI = await bitcoinInfo.json()
        const bitcoinMarket = await fetch(`https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=${apiKey.key}`)
        const bitcoinM = await bitcoinMarket.json()
        btn1.style.display = "block"
        btn2.style.display = "block"
        arrayCoinsD = bitcoinD.data
        arrayCoinsI = bitcoinI.data
        const newArrayD = arrayCoinsD.filter(coin => coin.name.toLowerCase().includes(inpSearch.value.toLowerCase()))
        // newArrayI = Object.values(arrayCoinsI).filter(coin => coin.name.toLowerCase().includes(inpSearch.value.toLowerCase()))
        // const newArrayI = Object.entries(arrayCoinsI).map(([k,v]) => ({[k]:v}))
        const newArrayI = Object.values(arrayCoinsI).filter(coin => coin.name.toLowerCase().includes(inpSearch.value.toLowerCase()))
        // console.log(arrayCoinsD)
        // console.log(arrayCoinsI)
        // console.log(newArrayI)
        // console.log(array)
        $(".marketOverviewBtn").click(() => {
            inpSearch.value = ""
            $(".loading").css("display", "none")
            $(".headerCoins").css("display", "none")
            $(".coinInfromation2").css("display", "block")
            $(".coins").css("display", "none")
            $(`.spot,.gainers,.losers`).css("background-color", "rgb(251, 251, 251)")
            // querySelector ------------------------------------ >>
            const coinInfromation2 = document.querySelector(".coinInfromation")
            const coinInfromationHeader2 = document.querySelector(".coinInfromationHeader")
            coinInfromationHeader2.style.display = "none"
            //Profile
            const coinInfromationName2 = document.querySelector(".coinInfromationName")
            const coinInfromationSymbol2 = document.querySelector(".coinInfromationSymbol")
            const coinInfromationPairs = document.querySelector(".coinInfromationPairs")
            const coinInfromationPrice2 = document.querySelector(".coinInfromationPrice2")
            //marketCap
            const MarketCapNum2 = document.querySelector(".MarketCapNum2")
            const MarketCapPercent2 = document.querySelector(".MarketCapPercent2")
            const dayVolumeNum2 = document.querySelector(".dayVolumeNum2")
            const dayVolumePercent2 = document.querySelector(".dayVolumePercent2")
            const AllCryptos2Num = document.querySelector(".AllCryptos2Num")
            const AllMarket2Num = document.querySelector(".AllMarket2Num")
            coinInfromationPrice2.textContent = `$${new Number(bitcoinM.data.quote.USD.total_market_cap).toLocaleString("en-GB", { maximumFractionDigits: 0 }).slice(0, 4)}B`
            MarketCapNum2.textContent = `$${new Number(bitcoinM.data.quote.USD.total_market_cap).toLocaleString("en-GB", { maximumFractionDigits: 2 })}`
            AllCryptos2Num.textContent = `${new Number(bitcoinM.data.total_cryptocurrencies).toLocaleString("en-GB")}`
            AllMarket2Num.textContent = `${new Number(bitcoinM.data.active_exchanges).toLocaleString("en-GB")}`
            MarketCapPercent2.textContent = `${bitcoinM.data.quote.USD.total_market_cap_yesterday_percentage_change.toFixed(2)}%`
            dayVolumeNum2.textContent = `$${new Number(bitcoinM.data.quote.USD.total_volume_24h).toLocaleString("en-GB", { maximumFractionDigits: 2 })}`
            dayVolumePercent2.textContent = `${bitcoinM.data.quote.USD.total_market_cap_yesterday_percentage_change.toFixed(2)}%`
            // textContent ------------------------------------ >
            coinInfromationName2.textContent = "Market Cap"
            coinInfromationSymbol2.textContent = "Total"
            // chart ----------------------------------------------- >>
            let darkLight = ""
            btnDarkMode.addEventListener("click", () => {
                if (localStorage.getItem("darkModeLocalStorage")) {
                    darkLight = "dark"
                } else {
                    darkLight = "light"
                }
                new TradingView.widget(
                    {
                        "autosize": true,
                        "symbol": `CRYPTOCAP:TOTAL`,
                        "interval": "1",
                        "timezone": "Etc/UTC",
                        "theme": "light",
                        "style": "3",
                        "locale": "en",
                        "toolbar_bg": "#f1f3f6",
                        "enable_publishing": false,
                        "hide_top_toolbar": false,
                        "save_image": true,
                        "show_popup_button": true,
                        "popup_width": "1000",
                        "popup_height": "650",
                        "container_id": "tradingview_4f92d"
                    }
                );
            })
            if (localStorage.getItem("darkModeLocalStorage")) {
                darkLight = "dark"
            } else {
                darkLight = "light"
            }
            // sym = bitcoinD[i].symbol
            new TradingView.widget(
                {
                    "autosize": true,
                    "symbol": `CRYPTOCAP:TOTAL`,
                    "interval": "1",
                    "timezone": "Etc/UTC",
                    "theme": "light",
                    "style": "3",
                    "locale": "en",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "hide_top_toolbar": false,
                    "save_image": true,
                    "show_popup_button": true,
                    "popup_width": "1000",
                    "popup_height": "650",
                    "container_id": "tradingview_4f92d"
                }
            );
        })
        const searchBtn = document.querySelector(".searchBtn")
        searchBtn.addEventListener("click", function (e) {
            console.log("ds")
            $(".headerCoins").css("display", "flex")
            $(".spot,.gainers,.losers").css("background-color", "rgb(251, 251, 251)")
            $(".loading").css("display", "none")
            $(".coinInfromationHeader").css("display", "flex")
            $(`.change7dArrowUp,.change7dArrowDown,.change24hArrowUp,.change24hArrowDown,.changePriceArrowUp,.changePriceArrowDown,.changeRankArrowUp,.changeRankArrowDown`).css('opacity', '0.4')
            $(".changeRankArrowClick,.changePriceArrowClick,.change24hArrowClick,.change7dArrowClick").each(function () {
                this.style.pointerEvents = 'none';
            });
            const newArrayD = arrayCoinsD.filter(coin => coin.name.toLowerCase().includes(inpSearch.value.toLowerCase()))
            const newArrayI = Object.values(arrayCoinsI).filter(coin => coin.name.toLowerCase().includes(inpSearch.value.toLowerCase()))
            // console.log(newArrayI)
            if (inpSearch.value &&  newArrayD.length > 0) {
                $(".coinInfromation2").css("display", "none")
                $(".coins").css("display", "block")
                createCoinDivSearch(newArrayD, newArrayI)
            }
            if (newArrayD.length == 0) {
                coins.innerHTML = `
                <h1 class="noResults">No results for '${inpSearch.value}'</h1>
                `
            }
            if (inpSearch.value == "") {
                $(".changeRankArrowClick,.changePriceArrowClick,.change24hArrowClick,.change7dArrowClick").each(function () {
                    this.style.pointerEvents = 'auto';
                });
                createCoinDiv(arrayCoinsD, arrayCoinsI)
            }
        })
        // createDivCoin ------------------------------------------ >>
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
        createCoinDiv(arrayCoinsD, arrayCoinsI)
    } catch (error) {
    }
}
cryptoApi()//
$(".clearInput,.spot").click(() => {
     inpSearch.value = ""
     if (inpSearch.value == "") {
        createCoinDiv(arrayCoinsD, arrayCoinsI)
        $(".changeRankArrowClick,.changePriceArrowClick,.change24hArrowClick,.change7dArrowClick").each(function () {
            this.style.pointerEvents = 'auto';
        });
    }
})
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

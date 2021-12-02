const apiKey = {
    key: "d9b02f17-a168-4ef7-acf3-08fbc413b142"
}
// querySelector ------------------------------------------------>
const mainContainer = document.querySelector(".mainContainer")
const header = document.querySelector(".header")
const menuHeaderIcon = document.querySelector(".menuHeaderIcon")
const menu = document.querySelector(".menu")
const market = document.querySelector(".market")
const coins = document.querySelector(".coins")
const inpSearch = document.querySelector(".inpSearch")//
// appendChild -------------------------------------------------->
document.body.appendChild(mainContainer)
mainContainer.appendChild(market)
market.appendChild(coins)//
// array [] ---------------------------------------------------->
let darkModeLocalStorage = []
let array = []
let arrayCoinsLs = []
let arrayCoinsD = []
let arrayCoinsI = []
$(".addCoin").click(() => {
    console.log("work")
    cryptoApi()//
    $(".lightboxCoins").css("display", "block")
    $(".market").css("display", "block")
    document.body.style.overflow = "hidden";
    $(document).click((e) => {
        if (e.target.closest(".lightboxCoins")) {
            $(".lightboxCoins").css("display", "none")
            $(".addTransaction").css("display", "none")
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
function createCoinDiv(bitcoinD, bitcoinI) {
    coins.innerHTML = ""
    const newArrayD = arrayCoinsD.filter(coin => coin.name.toLowerCase().includes(inpSearch.value.toLowerCase()))
    for (let i = 0; i < newArrayD.length; i++) {
        console.log(newArrayD.length)
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
        coinDivLeftImg.src = bitcoinI[array[i]].logo
        // right
        coinDivRight.className = "coinDivRight"
        coinDivRightNext.className = "coinDivRightNext"
        coinDivRightNext.src = "/arena.github.io/image/right.png"
        // textContentLeft ------------------------------------ >>
        coinDivLeftRank.textContent = bitcoinD[i].cmc_rank
        coinDivLeftName.textContent = bitcoinD[i].name
        coinDivLeftSymbol.textContent = bitcoinD[i].symbol
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
                $(".addTransaction").css("display", "none")
                $(".market").css("display", "none")
                document.body.style.overflow = "auto";
            };
        })
        coinDiv.addEventListener("click", function () {
            // querySelector ------------------------------------------------>
            const addTransaction = document.querySelector(".addTransaction")
            addTransaction.innerHTML = `
                    <img class="closeTransaction" src="/arena.github.io/image/close.png" alt="">
                    <img class="returnToMarket" src="/arena.github.io/image/return.png" alt="">
                    <div class="addTransactionHeader">
                        <h1>Add Transaction</h1>
                        <img src="/arena.github.io/image/transaction.png" alt="">

                    </div>
                    <div class="addTransactionCoinInfromation">
                        <div class="addTransactionCoinInfromationContent">
                            <div class="addTransactionCoinInfromationProfile">
                                <img src="/arena.github.io/image/blockchain.png" alt="" class="addTransactionCoinImg">
                                <h2 class="addTransactionCoinName">Bitcoin</h2>
                                <h2 class="addTransactionCoinSymbol">BTC</h2>
                            </div>
                            <div class="addTransactionCoinInfromationAmount">
                                <h3>Quantity</h3>
                                <input type="number" min="0" placeholder="0.00" class="inpAddTransactionCoinAmount">
                            </div>
                        </div>
                        <div class="totalSpent">
                            <h5>Total Spent</h5>
                            <h2 class="totalSpentAmount">$0.00</h2>
                        </div>
                    </div>
                    <div class="addCoinTransaction">
                        <button class="btnAddCoinTransaction">Add Transaction</button>
                    </div>
            `
            addTransaction.style.display = "block"
            market.style.display = "none"
            const inpAddTransactionCoinAmount = document.querySelector(".inpAddTransactionCoinAmount")
            const totalSpentAmount = document.querySelector(".totalSpentAmount")
            const btnAddCoinTransaction = document.querySelector(".btnAddCoinTransaction")
            const portfolioCoinsAvilable = document.querySelector(".portfolioCoinsAvilable")
            const addTransactionCoinImg = document.querySelector(".addTransactionCoinImg")
            const addTransactionCoinName = document.querySelector(".addTransactionCoinName")
            const addTransactionCoinSymbol = document.querySelector(".addTransactionCoinSymbol")
            // textContentLeft ------------------------------------ >>
            addTransactionCoinImg.src = bitcoinI[array[i]].logo
            addTransactionCoinName.textContent = bitcoinD[i].name
            addTransactionCoinSymbol.textContent = bitcoinD[i].symbol
            // calculate -------
            inpAddTransactionCoinAmount.addEventListener("keyup", function () {
                amountCalc = inpAddTransactionCoinAmount.value * bitcoinD[i].quote.USD.price
                totalSpentAmount.textContent = `$${amountCalc.toLocaleString("en-GB", { maximumFractionDigits: 2 })}`
            })
            inpAddTransactionCoinAmount.addEventListener("click", function () {
                amountCalc = inpAddTransactionCoinAmount.value * bitcoinD[i].quote.USD.price
                totalSpentAmount.textContent = `$${amountCalc.toLocaleString("en-GB", { maximumFractionDigits: 2 })}`
            })

            $(".closeTransaction").click(() => {
                addTransaction.style.display = "none"
                document.body.style.overflow = "auto";
                $(".lightboxCoins").css("display", "none")
            })
            $(".returnToMarket").click(() => {
                console.log("work")
                market.style.display = "block"
                $(".addTransaction").css("display", "none")
            })
            btnAddCoinTransaction.addEventListener("click", function (e) {
                document.body.style.overflow = "auto";
                if (inpAddTransactionCoinAmount.value > 0) {
                    $(".lightboxCoins").css("display", "none")
                    $(".addTransaction").css("display", "none")
                    market.style.display = "none"
                    // createDive ------------------------------------------------>
                    const portfolioCoinsAvilableCoins = document.createElement("div")
                    const leftPortfolioCoinsAvilableCoins = document.createElement("div")
                    const leftPortfolioCoinsAvilableCoinsImg = document.createElement("img")
                    const leftPortfolioCoinsAvilableCoinsName = document.createElement("h2")
                    const leftPortfolioCoinsAvilableCoinsSymbol = document.createElement("h2")
                    const leftPortfolioCoinsAvilableCoinsPrice = document.createElement("h3")
                    const rightPortfolioCoinsAvilableCoins = document.createElement("div")
                    const rightPortfolioCoinsAvilableCoins24h = document.createElement("h2")
                    const rightPortfolioCoinsAvilableCoinsHolding = document.createElement("div")
                    const rightPortfolioCoinsAvilableCoinsPriceAvilable = document.createElement("h3")
                    const rightPortfolioCoinsAvilableCoinsAmountAvilable = document.createElement("h3")
                    // appendChild ------------------------------------------- >>
                    portfolioCoinsAvilable.appendChild(portfolioCoinsAvilableCoins)
                    portfolioCoinsAvilableCoins.appendChild(leftPortfolioCoinsAvilableCoins)
                    portfolioCoinsAvilableCoins.appendChild(rightPortfolioCoinsAvilableCoins)
                    leftPortfolioCoinsAvilableCoins.appendChild(leftPortfolioCoinsAvilableCoinsImg)
                    leftPortfolioCoinsAvilableCoins.appendChild(leftPortfolioCoinsAvilableCoinsName)
                    leftPortfolioCoinsAvilableCoins.appendChild(leftPortfolioCoinsAvilableCoinsSymbol)
                    leftPortfolioCoinsAvilableCoins.appendChild(leftPortfolioCoinsAvilableCoinsPrice)
                    rightPortfolioCoinsAvilableCoins.appendChild(rightPortfolioCoinsAvilableCoins24h)
                    rightPortfolioCoinsAvilableCoins.appendChild(rightPortfolioCoinsAvilableCoinsHolding)
                    rightPortfolioCoinsAvilableCoinsHolding.appendChild(rightPortfolioCoinsAvilableCoinsPriceAvilable)
                    rightPortfolioCoinsAvilableCoinsHolding.appendChild(rightPortfolioCoinsAvilableCoinsAmountAvilable)
                    // className ------------------------------------------------>
                    portfolioCoinsAvilableCoins.className = "portfolioCoinsAvilableCoins"
                    leftPortfolioCoinsAvilableCoins.className = "leftPortfolioCoinsAvilableCoins"
                    leftPortfolioCoinsAvilableCoinsImg.className = "leftPortfolioCoinsAvilableCoinsImg"
                    leftPortfolioCoinsAvilableCoinsName.className = "leftPortfolioCoinsAvilableCoinsName"
                    leftPortfolioCoinsAvilableCoinsSymbol.className = "leftPortfolioCoinsAvilableCoinsSymbol"
                    leftPortfolioCoinsAvilableCoinsPrice.className = "leftPortfolioCoinsAvilableCoinsPrice"
                    rightPortfolioCoinsAvilableCoins.className = "rightPortfolioCoinsAvilableCoins"
                    rightPortfolioCoinsAvilableCoins24h.className = "rightPortfolioCoinsAvilableCoins24h"
                    rightPortfolioCoinsAvilableCoinsHolding.className = "rightPortfolioCoinsAvilableCoinsHolding"
                    rightPortfolioCoinsAvilableCoinsPriceAvilable.className = "rightPortfolioCoinsAvilableCoinsPriceAvilable"
                    rightPortfolioCoinsAvilableCoinsAmountAvilable.className = "rightPortfolioCoinsAvilableCoinsAmountAvilable"
                    // // textContentLeft ------------------------------------ >>
                    leftPortfolioCoinsAvilableCoinsImg.src = bitcoinI[array[i]].logo
                    leftPortfolioCoinsAvilableCoinsName.textContent = bitcoinD[i].name
                    leftPortfolioCoinsAvilableCoinsSymbol.textContent = bitcoinD[i].symbol
                    leftPortfolioCoinsAvilableCoinsPrice.textContent = `$${new Number(bitcoinD[i].quote.USD.price).toLocaleString("en-GB", { maximumFractionDigits: 2 })}`
                    rightPortfolioCoinsAvilableCoins24h.textContent = `${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}%`
                    newPriceAvilable = inpAddTransactionCoinAmount.value * bitcoinD[i].quote.USD.price
                    rightPortfolioCoinsAvilableCoinsPriceAvilable.textContent = `$${new Number(newPriceAvilable).toLocaleString("en-GB", { maximumFractionDigits: 2 })}`
                    rightPortfolioCoinsAvilableCoinsAmountAvilable.textContent = inpAddTransactionCoinAmount.value

                    if (bitcoinD[i].quote.USD.percent_change_24h.toFixed(2) <= 0) {
                        rightPortfolioCoinsAvilableCoins24h.style.color = "red"
                    } else {
                        rightPortfolioCoinsAvilableCoins24h.textContent = `+${bitcoinD[i].quote.USD.percent_change_24h.toFixed(2)}% `
                        rightPortfolioCoinsAvilableCoins24h.style.color = "green"
                    }
                    // localStorage ------------------------------------ >>
                    arrayCoinsLs.push({ name: bitcoinD[i].name, price: bitcoinD[i].quote.USD.price, amount: inpAddTransactionCoinAmount.value, Last24h: bitcoinD[i].quote.USD.percent_change_24h })
                    localStorage.setItem("arrayCoinsLs", JSON.stringify(arrayCoinsLs))
                    let totalAmount = arrayCoinsLs.reduce(function (sum, value) { return sum + value.price * value.amount; }, 0)
                    let average = arrayCoinsLs.reduce(function (sum, value) { return sum + value.Last24h; }, 0) / arrayCoinsLs.length;
                    console.log(average)
                    // reduceTotal ------------------------------------ >>
                    const currentPortfolioBalance = document.querySelector(".currentPortfolioBalance")
                    const currentPortfolioBalance24h = document.querySelector(".currentPortfolioBalance24h")
                    const protfolioPrice = document.querySelector(".protfolioPrice")
                    currentPortfolioBalance.textContent = `$${new Number(totalAmount).toLocaleString("en-GB", { maximumFractionDigits: 2 })}`
                    currentPortfolioBalance24h.textContent = `${new Number(average).toLocaleString("en-GB", { maximumFractionDigits: 2 })}%`
                    protfolioPrice.textContent = `$${new Number(totalAmount).toLocaleString("en-GB", { maximumFractionDigits: 2 })}`

                    if (average.toFixed(2) <= 0) {
                        currentPortfolioBalance24h.style.color = "white"
                        currentPortfolioBalance24h.style.backgroundColor = "rgb(255, 85, 85)"
                    } else {
                        currentPortfolioBalance24h.textContent = `+${average.toFixed(2)}% `
                        currentPortfolioBalance24h.style.color = "white"
                        currentPortfolioBalance24h.style.backgroundColor = "rgb(56, 182, 56)"
                    }

                } else {
                    inpAddTransactionCoinAmount.style.border = "1px solid red"
                }
            })

            totalSpentAmount.textContent = "$0.00"
            inpAddTransactionCoinAmount.value = ""
        })
    }
}//
const cryptoApi = async () => {
    let numberOfCoins = 100
    try {
        // getApi ------------------------------------------ >>
        //#region
        const bitcoinData = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=${numberOfCoins}&CMC_PRO_API_KEY=${apiKey.key}`)
        const bitcoinD = await bitcoinData.json()
        array = []
        for (let i = 0; i < numberOfCoins; i++) {
            array.push(bitcoinD.data[i].id)
        }
        const bitcoinInfo = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${array}&CMC_PRO_API_KEY=${apiKey.key}`)
        const bitcoinI = await bitcoinInfo.json()
        arrayCoinsD = bitcoinD.data
        arrayCoinsI = bitcoinI.data
        console.log(arrayCoinsD[0].quote.USD.price)
        $(".loading").css("display", "none")
        const newArrayD = arrayCoinsD.filter(coin => coin.name.toLowerCase().includes(inpSearch.value.toLowerCase()))
        inpSearch.addEventListener("keyup", function () {
            const newArrayD = arrayCoinsD.filter(coin => coin.name.toLowerCase().includes(inpSearch.value.toLowerCase()))
            if (!newArrayD.length) {
                coins.innerHTML = `
                <h1 class="noResults">No results for '${inpSearch.value}'</h1>
                `
            } else {
                createCoinDiv(newArrayD, arrayCoinsI)
            }
        })
        //#endregion
        // createDivCoin ------------------------------------------ >>

        createCoinDiv(newArrayD, arrayCoinsI)
    } catch (error) {
    }
}//
// cryptoApiNarket --------------------------------------------------->
const cryptoApiNarket = async () => {
    try {
        const bitcoinMarket = await fetch(`https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=${apiKey.key}`)
        const bitcoinM = await bitcoinMarket.json()
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





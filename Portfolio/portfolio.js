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
let marketG = []
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
function createCoinDiv(marketG) {
    coins.innerHTML = ""
    for (let i = 0; i < marketG.length; i++) {
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
            addTransactionCoinImg.src = marketG[i].image.small
            addTransactionCoinName.textContent = marketG[i].name
            addTransactionCoinSymbol.textContent = marketG[i].symbol
            // calculate -------
            inpAddTransactionCoinAmount.addEventListener("keyup", function () {
                amountCalc = inpAddTransactionCoinAmount.value * marketG[i].market_data.current_price.usd
                totalSpentAmount.textContent = `$${amountCalc.toLocaleString("en-GB", { maximumFractionDigits: 2 })}`
            })
            inpAddTransactionCoinAmount.addEventListener("click", function () {
                amountCalc = inpAddTransactionCoinAmount.value * marketG[i].market_data.current_price.usd
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
                    leftPortfolioCoinsAvilableCoinsImg.src = marketG[i].image.small
                    leftPortfolioCoinsAvilableCoinsName.textContent = marketG[i].name
                    leftPortfolioCoinsAvilableCoinsSymbol.textContent = marketG[i].symbol
                    leftPortfolioCoinsAvilableCoinsPrice.textContent = `$${new Number(marketG[i].market_data.current_price.usd).toLocaleString("en-GB", { maximumFractionDigits: 2 })}`
                    rightPortfolioCoinsAvilableCoins24h.textContent = `${marketG[i].market_data.price_change_percentage_24h.toFixed(2)}%`
                    newPriceAvilable = inpAddTransactionCoinAmount.value * marketG[i].market_data.current_price.usd
                    rightPortfolioCoinsAvilableCoinsPriceAvilable.textContent = `$${new Number(newPriceAvilable).toLocaleString("en-GB", { maximumFractionDigits: 2 })}`
                    rightPortfolioCoinsAvilableCoinsAmountAvilable.textContent = inpAddTransactionCoinAmount.value

                    if (marketG[i].market_data.price_change_percentage_24h.toFixed(2) <= 0) {
                        rightPortfolioCoinsAvilableCoins24h.style.color = "red"
                    } else {
                        rightPortfolioCoinsAvilableCoins24h.textContent = `+${marketG[i].market_data.price_change_percentage_24h.toFixed(2)}% `
                        rightPortfolioCoinsAvilableCoins24h.style.color = "green"
                    }
                    // localStorage ------------------------------------ >>
                    arrayCoinsLs.push({ name: marketG[i].name, symbol: marketG[i].symbol, price: marketG[i].market_data.current_price.usd, amount: inpAddTransactionCoinAmount.value, Last24h: marketG[i].market_data.price_change_percentage_24h })
                    localStorage.setItem("arrayCoinsLs", JSON.stringify(arrayCoinsLs))
                    let totalAmount = arrayCoinsLs.reduce(function (sum, value) { return sum + value.price * value.amount; }, 0)
                    let average = arrayCoinsLs.reduce(function (sum, value) { return sum + value.Last24h; }, 0) / arrayCoinsLs.length;
                    console.log(totalAmount)
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
                    // linesPie ------------------------------------ >>
                    const colorArray = [
                        { color: "#30d208" },
                        { color: "#de7428" },
                        { color: "#00c3ff" },
                        { color: "#ff13b891" },
                        { color: "#00ff8c91" },
                        { color: "#cc00ff91" },
                        { color: "#fffb0091" },
                        { color: "#ffaa0091" },
                    ]
                    const lines = document.querySelector(".lines");
                    $(".lines").children().remove()
                    let aaa = arrayCoinsLs.sort(function (a, b) { return b.price - a.price * a.amount;},0)
                    let total = aaa.reduce(function (sum, value) { return sum + value.price * value.amount; }, 0)
                    console.log(aaa)
                    for (let a = 0; a < arrayCoinsLs.length; a++) {
                        const tab = document.createElement("div")
                        lines.appendChild(tab)
                        let xyz = (arrayCoinsLs[a].price * arrayCoinsLs[a].amount) * 100 / total
                        tab.style.backgroundColor = colorArray[a].color;
                        tab.style.width = `${xyz}%`;
                        tab.textContent = `${arrayCoinsLs[a].symbol + " " + xyz.toFixed(0)}%`;
                        tab.className = "tab"
                        if(tab.style.width < "10%"){
                            tab.textContent = ""
                        }
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
    try {

        // getApi ------------------------------------------ >>
        const marketGeco = await fetch(`https://api.coingecko.com/api/v3/coins?per_page=250`)
        const marketG = await marketGeco.json()
        newmarketG = marketG

        $(".loading").css("display", "none")
        inpSearch.addEventListener("keyup", function (e) {
            const newArrayD = marketG.filter(coin => coin.name.toLowerCase().includes(inpSearch.value.toLowerCase()))
            createCoinDiv(newArrayD)
        })
        // createDivCoin ------------------------------------------ >>

        createCoinDiv(marketG)

    } catch (error) {
    }
}//
// cryptoApiNarket --------------------------------------------------->
const cryptoApiNarket = async () => {
    try {
        const bitcoinMarket = await fetch(`https://api.coingecko.com/api/v3/global`)
        const bitcoinM = await bitcoinMarket.json()
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





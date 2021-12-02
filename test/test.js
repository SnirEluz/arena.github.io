



const totalCoins = [{name: "Bitcoin", coin: 6000 }, {name: "Shiba", coin: 4000 },{name: "Etherum", coin: 20000 }]
const colorArray = [{ color: "#30d208" }, { color: "#de7428" },{ color: "#00c3ff" },]
totalCoins.sort(function(a, b){return b.coin - a.coin})
const main = document.querySelector(".main")
let total = totalCoins.reduce((a, b) => a + b.coin, 0)

for (let i = 0; i < totalCoins.length; i++) {
    let xyz = totalCoins[i].coin * 100 / total
    const tab = document.createElement("div")
    tab.style.backgroundColor = colorArray[i].color;
    tab.style.width = `${xyz}%`;
    tab.textContent= `${totalCoins[i].name + " " + xyz.toFixed(0)}%`;
    console.log(xyz)
    main.appendChild(tab)
}

console.log(total)


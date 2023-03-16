const API_url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%20%2C%20ethereum%20%2C%20binancecoin%20%2C%20tether%20%2C%20ripple%20%2Cdogecoin%2C%20solana&order=market_cap_desc&per_page=100&page=1&sparkline=false';
const coinTable = document.getElementById('coinTable');

function renderBox(icon , name , price , high_24h , low_24h){
    return `
      <tr>
        <th ></th>
        <td><img class="tableIcon" src="${icon}" ></td>
        <td>${name}</td>
        <td>${price}</td>
        <td>${high_24h}</td>
        <td>${low_24h}</td>
      </tr>
      
    `
}

async function fetchPrice(){
    const result = await fetch (API_url) ;
    const data = await result.json();
    const prices = [];
    for(const item of data){
        prices.push({
            icon: item.image,
            name: item.name ,
            price: item.current_price ,
            high_24h:item.high_24h ,
            low_24h: item.low_24h,
        });
    }
    return prices;
}

 async function render(){
    data =  await fetchPrice();
let html ='';
for(const item of data){
    const boxhtml = renderBox(item.icon , item.name , item.price , item.high_24h , item.low_24h)
    html = `${html}${boxhtml}`;
    coinTable.innerHTML = html;
}
}

render()



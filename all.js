// let data = [
//   {
//     "id": 0,
//     "name": "肥宅心碎賞櫻3日",
//     "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//     "area": "高雄",
//     "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//     "group": 87,
//     "price": 1400,
//     "rate": 10
//   },
//   {
//     "id": 1,
//     "name": "貓空纜車雙程票",
//     "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     "area": "台北",
//     "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//     "group": 99,
//     "price": 240,
//     "rate": 2
//   },
//   {
//     "id": 2,
//     "name": "台中谷關溫泉會1日",
//     "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     "area": "台中",
//     "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//     "group": 20,
//     "price": 1765,
//     "rate": 7
//   }
// ];
let data = [];
function updateData(data)
{
  let str = '';
  let list = document.querySelector('.ticketCard-area');
  let searchResultQty = document.querySelector('#searchResult-text');
  data.forEach(function (item)
  {
    str += ` <li class="ticketCard">
    <div class="ticketCard-img">
      <a href="#">
        <img src=${item.imgUrl}
          alt="">
      </a>
      <div class="ticketCard-region">${item.area}</div>
      <div class="ticketCard-rank">${item.rate}</div>
    </div>
    <div class="ticketCard-content">
      <div>
        <h3>
          <a href="#" class="ticketCard-name">${item.name}</a>
        </h3>
        <p class="ticketCard-description">
          ${item.description}
        </p>
      </div>
      <div class="ticketCard-info">
        <p class="ticketCard-num">
          <span><i class="fas fa-exclamation-circle"></i></span>
          剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
        </p>
        <p class="ticketCard-price">
          TWD <span id="ticketCard-price">$${item.price}</span>
        </p>
      </div>
    </div>
  </li>`;
  });
  list.innerHTML = str;
  searchResultQty.textContent = `本次搜尋共 ${data.length} 筆資料`;
  renderC3(data);
}
function renderC3(data)
{
  // 篩選地區，並累加數字上去
  // totalObj 會變成 {高雄: 2, 台北: 1, 台中: 2}
  let totalObj = {};
  data.forEach(function (item)
  {
    if (totalObj[item.area] == undefined)
    {
      totalObj[item.area] = 1;
    } else
    {
      totalObj[item.area] += 1;
    }
  });
  // newData = [["高雄", 2], ["台北",1], ["台中", 1]]
  let newData = [];
  let area = Object.keys(totalObj);
  // area output ["高雄","台北","台中"]
  area.forEach(function (item, index)
  {
    let ary = [];
    ary.push(item);
    ary.push(totalObj[item]);
    // console.log(ary);
    // console.log(totalObj[item]);
    newData.push(ary);
  });
  // 將 newData 丟入 c3 產生器
  const chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: newData,
      type: 'donut',
    },
    donut: {
      title: "套票地區比重"
    }
  });

}

function init()
{
  // axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
  axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json')
    .then(res =>
    {
      data = res.data;
      // console.log(res.data);
      updateData(data);
    })
    .catch(err =>
    {
      console.error(err);
    });
}
init();
let search = document.querySelector('.regionSearch');
search.addEventListener('change', function (e)
{
  // console.log(search.value);
  let newData = [];
  if (e.target.value == "")
  {
    newData = data;
  }
  else
  {
    data.forEach(function (item)
    {
      if (item.area == e.target.value)
      {
        newData.push(item);
      }
    });
  }
  updateData(newData);
});
let addTicketBtn = document.querySelector('.addTicket-btn');
addTicketBtn.addEventListener('click', function (e)
{
  let ticketName = document.querySelector('#ticketName');
  let imgUrl = document.querySelector('#ticketImgUrl');
  let area = document.querySelector('#ticketRegion');
  let ticketPrice = document.querySelector('#ticketPrice');
  let ticketNum = document.querySelector('#ticketNum');
  let ticketRate = document.querySelector('#ticketRate');
  let ticketDescription = document.querySelector('#ticketDescription');
  let addData = {
    "id": data.length,
    "name": ticketName.value,
    "imgUrl": imgUrl.value,
    "area": area.value,
    "description": ticketDescription.value,
    "group": ticketNum.value,
    "price": ticketPrice.value,
    "rate": ticketRate.value
  };
  data.push(addData);
  updateData(data);
});
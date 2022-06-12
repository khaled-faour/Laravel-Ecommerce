let items = [];
let itemsList = document.getElementsByClassName('items-list')[0];

let searchInput = document.getElementsByClassName('search')[0];
let searchValue = '';
window.addEventListener('load', ()=>{

    searchInput.addEventListener('input', (e)=>{
        searchValue = e.target.value
        showItems()
        console.log(e.target.value)
    })
    fetchItems()
})

async function fetchItems(){
    await axios.get('http://127.0.0.1:8000/api/store/item', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(response=>{
        items = [...response.data.items]
        showItems()
    })
}

function showItems(){
    itemsList.innerHTML = ''
    items.filter(item=>item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.description.toLowerCase().includes(searchValue.toLowerCase())).map(item=>{
        itemsList.innerHTML += `
        <div class="card">
            <img src='http://127.0.0.1:8000${item.image}'>
            <div class="card-content">
                <div>
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <p>${item.description}</p>
                </div>
                <span id="like"><i class="fa-regular fa-heart"></i></span>
            </div>
        </div>
        `
    })
}
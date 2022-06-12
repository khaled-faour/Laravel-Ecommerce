let items = [];
let favorites = [];
let categories =[];

let itemsList = document.getElementsByClassName('items-list')[0];

let searchInput = document.getElementsByClassName('search')[0];
let searchValue = '';

let filterList = document.getElementById('categories-filter-list');
let filterValue = '';
window.addEventListener('load', ()=>{

    searchInput.addEventListener('input', (e)=>{
        searchValue = e.target.value
        showItems()
    })

    filterList.addEventListener('change', (e)=>{
        filterValue = e.target.value;
        showItems()
    })

    fetchCategories()
    fetchFavorites()
    fetchItems()
})

async function fetchItems(){
    await axios.get('http://127.0.0.1:8000/api/store/item', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(response=>{
        items = [...response.data.items]
        showItems()
        console.log(items)
    })
}

async function fetchFavorites(){
    await axios.get('http://127.0.0.1:8000/api/store/item/favorites', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(response=>{
        favorites = [...response.data.favorites]
    })
}

async function fetchCategories(){
    await axios.get('http://127.0.0.1:8000/api/store/category', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(response=>{
        categories = [...response.data.categories]
        filterList.innerHTML = '<option value="">All</option>';
        categories.map(category=>{
            filterList.innerHTML += `
                <option value="${category.category}">${category.category}</option>
            `
        })
    })
}

function showItems(){
    itemsList.innerHTML = ''
    items.filter(item=>item.categories.includes(filterValue)).filter(item=>item.name.toLowerCase().includes(searchValue.toLowerCase()) || item.description.toLowerCase().includes(searchValue.toLowerCase())).map(item=>{
        let fav = favorites.find(favorite=>favorite.item_id === item.id);
        itemsList.innerHTML += `
        <div class="card">
            <img src='http://127.0.0.1:8000${item.image}'>
            <div class="card-content">
                <div>
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <p>${item.description}</p>
                </div>`+
                (fav != undefined ? 
                `<span onclick='removeFromFavorites(${item.id})' id="like"><i class="fa-solid fa-heart"></i></span>`:
                `<span onclick='addToFavorites(${item.id})' id="like"><i class="fa-regular fa-heart"></i></span>`)+
            `</div>
        </div>
        `
    })
}

async function addToFavorites(id){
    await axios.post(`http://127.0.0.1:8000/api/store/item/favorite/${id}`,{}, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(response=>{
        if(response.data.status === "success"){
            fetchFavorites();
            fetchItems()
        }
    })
}
async function removeFromFavorites(id){
    await axios.delete(`http://127.0.0.1:8000/api/store/item/favorite/${id}`, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(response=>{
        if(response.data.status === "success"){
            fetchFavorites();
            fetchItems()
        }
    })
}
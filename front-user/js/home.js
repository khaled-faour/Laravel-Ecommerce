{/* <div class="card">
    <img src="./images/landing-img.png">
    <div class="card-content">
        <div>
            <h3>Name</h3>
            <p>Price</p>
            <p>description</p>
        </div>
        <span id="like"><i class="fa-regular fa-heart"></i></span>
    </div>
</div> */}
let items = [];
let itemsList = document.getElementsByClassName('items-list')[0];
window.addEventListener('load', ()=>{

    fetchItems()
})

async function fetchItems(){
    await axios.get('http://127.0.0.1:8000/api/store/item', {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then(response=>{
        itemsList.innerHTML = ''
        items = [...response.data.items]
        items.map(item=>{
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
    })
}
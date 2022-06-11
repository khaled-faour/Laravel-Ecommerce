let addModal;
let addButton;
let addCloseButton;
let addSave;

let deleteModal;
let cancelDelete;
let confirmDelete;

window.addEventListener('load', ()=>{
    addModal = document.getElementById("add-modal");
    addButton = document.getElementById("add-button");
    addCloseButton = document.getElementById("add-modal-close");
    addSave = document.getElementById("add-save");

    // ADD ITEM LISTENERS
    addButton.addEventListener('click', ()=>{
        addModal.style.display = "block";
    })

    addCloseButton.addEventListener('click', ()=>{
        addModal.style.display = "none";
    })

    document.getElementById('add-img').addEventListener('change', (e) => {
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener('loadend', () => {
            console.log(reader.result)
            document.getElementById('add-img-view').src = reader.result
        })
    })

    addSave.addEventListener('click', saveItem)


    // DELETE ITEM LISTENERS
    deleteModal = document.getElementById("delete-modal");
    cancelDelete = document.getElementById("delete-modal-close");
    confirmDelete = document.getElementById("delete-modal-confirm");


    fetchItems()
    fetchCategories()
})

const token = localStorage.getItem('token');

// Defining The Request With Token
const request = axios.create({
    baseURL:'http://127.0.0.1:8000/api',
    headers: {
        'Authorization': `bearer ${token}`
    }
});

const tableList = document.getElementById('list');
const categoriesList = document.getElementById('add-categories');
    
console.log(localStorage.getItem("token"))

async function fetchItems(){
    await request.get("/store/item").then(response=>{
        tableList.innerHTML = '';
        const items = [...response.data.items];
        console.log(items)
        items.map(item=>{
            tableList.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td> ${item.price.toFixed(2)}</td>
                <td class="action-buttons">
                    <a onclick="deleteItem(${item.id})" ><i class="fa-solid fa-trash"></i></a>
                    <a onclick="editItem(${item.id})" ><i class="fa-solid fa-pen-to-square"></i></a>
                </td>
            </tr>
            `
        })
    })
}
async function fetchCategories(){
    await request.get("/store/category").then(response=>{
        console.log(response.data)
        categoriesList.innerHTML = '';
        const categories = [...response.data.categories];
        categories.map(category=>{
            categoriesList.innerHTML += `
            <option value="${category.id}">${category.category}</option>
            `
        })
    })
}


function deleteItem(id){


    const deleteConfrim = async ()=>{
        await request.delete(`/admin/item/${id}`).then(response=>{
            if(response.data.status === "success"){
                deleteModal.style.display = "none";
                fetchItems();
            }
        })
    }

    confirmDelete.onclick = ()=>deleteConfrim().then(()=>confirmDelete.onclick = ()=>{})
    deleteModal.style.display = "block";
    

}
function editItem(id){
    console.log("editing: ", id)
}

function saveItem(){
    
    const name = document.getElementById('add-name')
    const description = document.getElementById('add-description')
    const price = document.getElementById('add-price')
    const categories = document.getElementById('add-categories').selectedOptions
    const selectedCategories = Array.from(categories).map(option=>option.value)
    const image = document.getElementById('add-img-view');

    if(name.value === "" || description.value === "" || price.value === ""){
        alert("All fields are required");
        return
    }
    const item = new FormData();
    item.append('name', name.value)
    item.append('description', description.value)
    item.append('price', price.value)
    item.append('categories', selectedCategories)
    item.append('image', image.src)

    request.post('/admin/item', item).then(response=>{
        if(response.data.status === "success"){
            fetchItems()
            addModal.style.display = "none"
            name.value = ""
            description.value = ""
            price.value = ""
            categories.selectedOptions = []
            image.src = ""
        }
    });
}
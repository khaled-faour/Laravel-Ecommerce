let categories =[]

let addModal;
let addButton;
let addCloseButton;
let addSave;

let editModal;
let editCloseButton;
let editSave;


let deleteModal;
let cancelDelete;
let confirmDelete;

window.addEventListener('load', ()=>{
    addModal = document.getElementById("add-modal");
    addButton = document.getElementById("add-button");
    addCloseButton = document.getElementById("add-modal-close");
    addSave = document.getElementById("add-save");

    editModal = document.getElementById("edit-modal");
    editCloseButton = document.getElementById("edit-modal-close");
    editSave = document.getElementById("edit-save");

    // ADD CATEGORY LISTENERS
    addButton.addEventListener('click', ()=>{
        addModal.style.display = "block";
    })

    addCloseButton.addEventListener('click', ()=>{
        addModal.style.display = "none";
    })


    addSave.addEventListener('click', saveItem)


    // DELETE CATEGORY LISTENERS
    deleteModal = document.getElementById("delete-modal");
    cancelDelete = document.getElementById("delete-modal-close");
    confirmDelete = document.getElementById("delete-modal-confirm");

    // EDIT CATEGORY LISTENERS
    editCloseButton.addEventListener('click', ()=>{
        editModal.style.display = "none";
    })

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
    

async function fetchCategories(){
    await request.get("/store/category").then(response=>{
        tableList.innerHTML = '';
        categories = [...response.data.categories];
        categories.map(category=>{
            tableList.innerHTML += `
            <tr>
                <td>${category.category}</td>
                <td class="action-buttons">
                    <a onclick="deleteCategory(${category.id})" ><i class="fa-solid fa-trash"></i></a>
                    <a onclick="editCategory(${category.id})" ><i class="fa-solid fa-pen-to-square"></i></a>
                </td>
            </tr>
            `
        })
    })
}



function deleteCategory(id){


    const deleteConfrim = async ()=>{
        await request.delete(`/admin/category/${id}`).then(response=>{
            if(response.data.status === "success"){
                deleteModal.style.display = "none";
                fetchCategories();
            }
        })
    }

    confirmDelete.onclick = ()=>deleteConfrim().then(()=>confirmDelete.onclick = ()=>{})
    deleteModal.style.display = "block";
    

}
function editCategory(id){
    editModal.style.display = "block"
    const category = categories.find(category=>category.id === id)

    const name = document.getElementById('edit-name')

    name.value = category.category
   

    const saveEdit = async ()=>{
        const newCategory = {
            category: name.value,
            
        }

        await request.put(`/admin/category/${id}`, newCategory).then(response=>{
            if(response.data.status === "success"){
                editModal.style.display = "none"
                fetchCategories();
            }
        })
    }

    editSave.onclick = ()=>saveEdit().then(()=>editSave.onclick=()=>{})
}

function saveItem(){
    
    const name = document.getElementById('add-name')
    

    if(name.value === ""){
        alert("All fields are required");
        return
    }
    const category = new FormData();
    category.append('category', name.value)
    

    request.post('/admin/category', category).then(response=>{
        if(response.data.status === "success"){
            fetchCategories()
            addModal.style.display = "none"
            name.value = ""
        }
    });
}
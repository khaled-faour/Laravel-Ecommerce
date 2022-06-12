window.addEventListener('load', ()=>{

    const token = localStorage.getItem('token') || null;

    if(token){
        window.location = './home.html';
    }else{
        window.location = 'login.html';
    }
})
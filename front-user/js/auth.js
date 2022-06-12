window.addEventListener('load', ()=>{

    const token = localStorage.getItem('token') || null;
    console.log(window.location)
    if(token){
        window.location = './home.html';
    }else if(window.location.pathname !== '/login.html'){
        window.location = './login.html';
    }
})
const accesEndBtn = document.getElementById('shut-X-button');
const accesWindow = document.getElementById('visual-margin-top');

const closeWindow = ()=>{
    accesWindow.style.display = 'none';
}

accesEndBtn.addEventListener('click', closeWindow)
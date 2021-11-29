const menu = document.querySelector('#menu');
const sidebar = document.querySelector('#sidebar');

menu.addEventListener('click', displayStickyDash);

function displayStickyDash() {
    if(sidebar.style.marginLeft === '-28.75rem'){
        sidebar.style.marginLeft = '0rem';
    } else {
        sidebar.style.marginLeft = '-28.75rem';
    }
}



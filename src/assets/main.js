
const slider = document.querySelector('.carrusel');
let sliderSeccion = document.querySelectorAll('.slider');
let sliderSeccionUltimo = sliderSeccion[sliderSeccion.length -1];

const btnR = document.querySelector('.btn-r');
const btnL = document.querySelector('.btn-l');

slider.insertAdjacentElement('afterbegin', sliderSeccionUltimo);

function derecha(){
    let sliderSeccionPrimero = document.querySelectorAll('.slider')[0];
    slider.style.marginLeft = '-200%';
    slider.style.transition = "all 0.5s";
    setTimeout(function() {
        slider.style.transition = 'none';
        slider.insertAdjacentElement('beforeend', sliderSeccionPrimero);
        slider.style.marginLeft = "-100%";
    }, 500)
}


function izquierda(){
    let sliderSeccion = document.querySelectorAll('.slider');
    let sliderSeccionUltimo = sliderSeccion[sliderSeccion.length -1];
    slider.style.marginLeft = '0';
    slider.style.transition = "all 0.5s";
    setTimeout(function() {
        slider.style.transition = 'none';
        slider.insertAdjacentElement('afterbegin', sliderSeccionUltimo);
        slider.style.marginLeft = "-100%";
    }, 500)
}

btnR.addEventListener("click", derecha);
btnL.addEventListener("click", izquierda);

setInterval(function() {
    derecha();
},5000);

//El boton
const searchBox = document.querySelector(".search-box");
      const searchBtn = document.querySelector(".search-icon");
      const cancelBtn = document.querySelector(".cancel-icon");
      const searchInput = document.querySelector("input");
      const searchData = document.querySelector(".search-data");
      searchBtn.onclick =()=>{
        searchBox.classList.add("active");
        searchBtn.classList.add("active");
        searchInput.classList.add("active");
        cancelBtn.classList.add("active");
        searchInput.focus();
        if(searchInput.value != ""){
          var values = searchInput.value;
          searchData.classList.remove("active");
          searchData.innerHTML = "You just typed " + "<span style='font-weight: 500;'>" + values + "</span>";
        }else{
          searchData.textContent = "";
        }
      }
      cancelBtn.onclick =()=>{
        searchBox.classList.remove("active");
        searchBtn.classList.remove("active");
        searchInput.classList.remove("active");
        cancelBtn.classList.remove("active");
        searchData.classList.toggle("active");
        searchInput.value = "";
      }










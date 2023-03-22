
function carImg(){
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


}

//El boton

//busqueda

function busqueda(){
  const searchBox = document.querySelector(".search-box");
      const searchBtn = document.querySelector(".search-icon");
      const cancelBtn = document.querySelector(".cancel-icon");
      const searchInput = document.querySelector("input");
      const searchData = document.querySelector(".search-data");

      searchBtn.onclick = () => {
        if (!searchBox.classList.contains("active")) { // Si la caja de búsqueda no está activa
          searchBox.classList.add("active");
          searchBtn.classList.add("active");
          searchInput.classList.add("active");
          cancelBtn.classList.add("active");
          searchData.textContent = "";
          searchInput.focus();
          if(searchInput.value != ""){
          var values = searchInput.value;
          searchData.classList.remove("active");
          searchData.innerHTML = "Resultados de: " + "<span style='font-weight: 500;'>" + values + "</span>";
        }else{
          searchData.textContent = "";
        } 
        } else { // Si la caja de búsqueda está activa
          if(!searchInput.value){
            searchData.classList.remove("active");
            searchData.innerHTML = "Escribe el nombre " + "<span style='font-weight: 500;'>" + "</span>";
          } else {
            location.hash = '#search=' + searchInput.value;
            searchData.classList.add("active");
          }
          
        }
      };
      

      function cerrar(){
        searchBox.classList.remove("active");
        searchBtn.classList.remove("active");
        searchInput.classList.remove("active");
        cancelBtn.classList.remove("active");
        searchData.classList.toggle("inactive");
        searchInput.value = "";
      }
      cancelBtn.onclick = cerrar;
      cerrar();
}





//Hoy inicia lo chido 
//Codigo dedicado a todo lo de JS

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  Headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
    'language': 'es-MX'
  }
});


//funciones para que las imagenes cargen solo cuando estan viendo

const observerTargeta = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      console.log('Elemeto visible');
      const url = entry.target.getAttribute('data-img');
      entry.target.src = url;

    } /* else {
      console.log('Elemento NO visible');
      const url = entry.target.getAttribute('data-img');
      entry.target.src = "";
    } */
  });
});





async function getTrendingMoviesPreview(){

contenedorCarrusel.innerHTML = "";

  
  const {data} = await api('trending/movie/day');


  const movies = data.results;
  console.log({data, movies});

  


  

  movies.forEach(movie => {

    // Crear el elemento principal 'div' con la clase 'slider'
const sliderDiv = document.createElement('div');
sliderDiv.classList.add('slider');



// Crear el elemento 'div' con la clase 'im' y su hijo 'img'
const imDiv = document.createElement('div');
imDiv.classList.add('im');
const imgC = document.createElement('img');
imgC.setAttribute("data-img", 'https://image.tmdb.org/t/p/w500' + movie.poster_path );
imgC.alt = '';
imDiv.appendChild(imgC);

observerTargeta.observe(imgC);



// Crear el elemento 'div' con la clase 'tex' y sus hijos 'h2', 'p' y 'button'
const texDiv = document.createElement('div');
texDiv.classList.add('tex');
const title1 = document.createElement('h2');
title1.textContent = movie.title;
//const p = document.createElement('p');
//p.textContent = movie.overview;
const button = document.createElement('button');
button.textContent = 'Detalles';
texDiv.appendChild(title1);
//texDiv.appendChild(p);
texDiv.appendChild(button);
//Haciendo que el botkn me lleve a detalles
button.addEventListener("click", () => {
  location.hash = '#movie=' + movie.id;
})

// Agregar los elementos hijos al elemento padre 'div.slider'
sliderDiv.appendChild(imDiv);
sliderDiv.appendChild(texDiv);

// Agregar el elemento 'div.slider' al documento HTML
contenedorCarrusel.appendChild(sliderDiv);

carImg();



    // Crear el elemento article
const article = document.createElement('article');


article.classList.add('carrusell');
article.addEventListener("click", () => {
  location.hash = '#movie=' + movie.id;
})

// Crear el elemento img y añadirlo al article
const imgM = document.createElement('img');
imgM.setAttribute('data-img', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
imgM.alt = movie.title;
article.appendChild(imgM);

observerTargeta.observe(imgM);


// Crear el elemento div y añadirlo al article
const textDiv = document.createElement('div');
textDiv.classList.add('text');
const title = document.createElement('h2');
title.textContent = movie.title;
textDiv.appendChild(title);
article.appendChild(textDiv);


//Anadiendo el articulo al contendor principal
contenedorMovies.appendChild(article);
    
  });
  
}

async function getCategoriesPreview(){

  const {data} = await api('genre/movie/list');
 

  const categories = data.genres;
  console.log({data, categories});

  //Creando la vista del contenedor principal de peliculas del carrusel
let contenedorCategories = document.querySelector('.cate .contenedorCate');

  categories.forEach(category => {


// Creamos un nuevo elemento article
const articleElement = document.createElement('article');

// Creamos un nuevo elemento div y lo añadimos como hijo del article
const divElement = document.createElement('div');
articleElement.appendChild(divElement);

// Creamos un nuevo elemento p y le añadimos el texto "Accion"
const pElement = document.createElement('p');
pElement.textContent = category.name;
pElement.setAttribute('id', 'id'+ category.id);
pElement.addEventListener('click', () => {
  location.hash = '#category=' + category.id + '-' + category.name;
})
articleElement.appendChild(pElement);



// Añadimos el article al DOM
contenedorCategories.appendChild(articleElement);
    
  });
}



async function getMoviesByCategory(id){
  window.scroll(0,0);
  const {data} = await api('discover/movie', {
    params: {
      with_genres: id,
    }
  });


  const movies = data.results;
  console.log({data, movies});

  const peliculasCate = document.querySelector(".catePeliculas .peliculas1M");

  peliculasCate.innerHTML = '';
  movies.forEach(movie => {

    //nombreCate.textContent = 
    
    // Crear el elemento article
  const article = document.createElement("article");
  article.classList.add("carrusellM");

  // Crear el elemento div para la imagen
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("img");
  article.appendChild(imgDiv);

  article.addEventListener("click", () => {
    location.hash = '#movie=' + movie.id;
  });

  // Crear el elemento img y establecer su atributo src
  const imgCateg = document.createElement("img");
  imgCateg.setAttribute("data-img", 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
  imgDiv.appendChild(imgCateg);

  observerTargeta.observe(imgCateg);

  // Crear el elemento div para el texto
  const textDiv = document.createElement("div");
  textDiv.classList.add("text");


  // Crear el elemento h2 y establecer su contenido de texto
  const h2 = document.createElement("h2");
  h2.textContent = movie.title;
  textDiv.appendChild(h2);

  article.appendChild(textDiv);
  // Agregar el artículo al documento
  peliculasCate.appendChild(article);

    
  });
}


function getMoviesByCategoryScroll(id){

  return async function () {
  page++;
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

 const scrollfinal = (scrollTop + clientHeight) >= (scrollHeight - 35);

 if(scrollfinal){
  const {data} = await api('discover/movie', {
    params: {
      with_genres: id,
      page,
    }
  });


  const movies = data.results;
  console.log({data, movies});

  const peliculasCate = document.querySelector(".catePeliculas .peliculas1M");

  //peliculasCate.innerHTML = '';
  movies.forEach(movie => {

    //nombreCate.textContent = 
    
    // Crear el elemento article
  const article = document.createElement("article");
  article.classList.add("carrusellM");

  // Crear el elemento div para la imagen
  const imgDiv = document.createElement("div");
  imgDiv.classList.add("img");
  article.appendChild(imgDiv);

  article.addEventListener("click", () => {
    location.hash = '#movie=' + movie.id;
  });

  // Crear el elemento img y establecer su atributo src
  const imgCateg = document.createElement("img");
  imgCateg.setAttribute("data-img", 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
  imgDiv.appendChild(imgCateg);

  observerTargeta.observe(imgCateg);

  // Crear el elemento div para el texto
  const textDiv = document.createElement("div");
  textDiv.classList.add("text");


  // Crear el elemento h2 y establecer su contenido de texto
  const h2 = document.createElement("h2");
  h2.textContent = movie.title;
  textDiv.appendChild(h2);

  article.appendChild(textDiv);
  // Agregar el artículo al documento
  peliculasCate.appendChild(article);

    
  });
  }
  

  
}
} 

async function getMoviesBySearch(query){
  window.scroll(0,0);
  const {data} = await api('search/movie', {
    params: {
      query,
    }
  });


  const movies = data.results;
  console.log(section);
  console.log({data, movies});

  
  const botonVer = document.querySelector(".btnVerM");
  peliculasBusqueda.innerHTML = '';
  
  if(!movies.length){
  resultado.textContent = 'No existen Peliculas con ese nombre';
  resultado.style.color = "white";
  resultado.style.fontSize = "3rem";
  resultado.style.paddingBottom = "5rem";
  } else {
  resultado.textContent = 'Resultados de: ' + query;
  resultado.style.color = "white";
  resultado.style.fontSize = "2rem";
  resultado.style.paddingBottom = "5rem";
  }
  movies.forEach(movie => {

    //nombreCate.textContent = 
    
    // Crear el elemento article
  const article1 = document.createElement("article");
  article1.classList.add("carrusellM");

  article1.addEventListener("click", () => {
    location.hash = '#movie=' + movie.id;
  });

  // Crear el elemento div para la imagen
  const imgDiv1 = document.createElement("div");
  imgDiv1.classList.add("img");
  article1.appendChild(imgDiv1);

  // Crear el elemento img y establecer su atributo src
  const imgB = document.createElement("img");
  imgB.setAttribute("data-img", 'https://image.tmdb.org/t/p/w300' + movie.poster_path);
  imgDiv1.appendChild(imgB);

  observerTargeta.observe(imgB);


  // Crear el elemento div para el texto
  const textDiv1 = document.createElement("div");
  textDiv1.classList.add("text");


  // Crear el elemento h2 y establecer su contenido de texto
  const h21 = document.createElement("h2");
  h21.textContent = movie.title;
  textDiv1.appendChild(h21);

  article1.appendChild(textDiv1);
  // Agregar el artículo al documento
  peliculasBusqueda.appendChild(article1);

    
  });

 
    botonVer.addEventListener('click', vermasPelisS(query));
  
  
  busqueda();
}



async function getTrendingMovies(){
  window.scroll(0,0);
  const {data} = await api('trending/movie/day');


  const movies = data.results;
  console.log(section);
  console.log({data, movies});

  


  const botonVer = document.querySelector(".btnVerM");
  
  peliculasBusqueda.innerHTML = '';
  resultado.textContent = 'Tendencias';
  resultado.style.color = "white";
  resultado.style.fontSize = "5rem";
  resultado.style.paddingBottom = "5rem";
  movies.forEach(movie => {

    //nombreCate.textContent = 
    
    // Crear el elemento article
  const article1 = document.createElement("article");
  article1.classList.add("carrusellM");

  article1.addEventListener("click", () => {
    location.hash = '#movie=' + movie.id;
  });

  // Crear el elemento div para la imagen
  const imgDiv1 = document.createElement("div");
  imgDiv1.classList.add("img");
  article1.appendChild(imgDiv1);

  // Crear el elemento img y establecer su atributo src
  const imgB = document.createElement("img");
  imgB.setAttribute('data-img','https://image.tmdb.org/t/p/w300' + movie.poster_path);
  imgDiv1.appendChild(imgB);

  observerTargeta.observe(imgB);

  // Crear el elemento div para el texto
  const textDiv1 = document.createElement("div");
  textDiv1.classList.add("text");


  // Crear el elemento h2 y establecer su contenido de texto
  const h21 = document.createElement("h2");
  h21.textContent = movie.title;
  textDiv1.appendChild(h21);

  article1.appendChild(textDiv1);
  // Agregar el artículo al documento
  peliculasBusqueda.appendChild(article1);

    
  });

  
    botonVer.addEventListener('click', vermasPelisTop);
  
  
  busqueda();
}




//Con la siguiente funcion, hacemos que el boton de cargar mas, me de avance a la siguiente pagina y se muestre todo

async function vermasPelisTop(){

if(section === "search"){
  return;
} 
  pageTop++;
  const {data} = await api('trending/movie/day', {
    params: {
      page: pageTop,
    },
  });
  const movies = data.results;
  console.log('Le dimos click a la pagina ' + pageTop);
  
  movies.forEach(movie => {

    
    // Crear el elemento article
  const article1 = document.createElement("article");
  article1.classList.add("carrusellM");

  article1.addEventListener("click", () => {
    location.hash = '#movie=' + movie.id;
  });

  // Crear el elemento div para la imagen
  const imgDiv1 = document.createElement("div");
  imgDiv1.classList.add("img");
  article1.appendChild(imgDiv1);

  // Crear el elemento img y establecer su atributo src
  const imgB = document.createElement("img");
  imgB.setAttribute('data-img','https://image.tmdb.org/t/p/w300' + movie.poster_path);
  imgDiv1.appendChild(imgB);

  observerTargeta.observe(imgB);

  // Crear el elemento div para el texto
  const textDiv1 = document.createElement("div");
  textDiv1.classList.add("text");


  // Crear el elemento h2 y establecer su contenido de texto
  const h21 = document.createElement("h2");
  h21.textContent = movie.title;
  textDiv1.appendChild(h21);

  article1.appendChild(textDiv1);
  // Agregar el artículo al documento
  peliculasBusqueda.appendChild(article1);

  });
} 

//funcion para ver mas peliculas en las busquedas

function vermasPelisS(query){

  return async function (){
    if(section === "trends"){
      return;
    } 
    
    pageS++;
  const {data} = await api('search/movie', {
    params: {
      query,
      page: pageS,
    }
  });
  const movies = data.results;
  console.log('Le dimos click' + pageS);
  movies.forEach(movie => {

    
    // Crear el elemento article
  const article1 = document.createElement("article");
  article1.classList.add("carrusellM");

  article1.addEventListener("click", () => {
    location.hash = '#movie=' + movie.id;
  });

  // Crear el elemento div para la imagen
  const imgDiv1 = document.createElement("div");
  imgDiv1.classList.add("img");
  article1.appendChild(imgDiv1);

  // Crear el elemento img y establecer su atributo src
  const imgB = document.createElement("img");
  imgB.setAttribute('data-img','https://image.tmdb.org/t/p/w300' + movie.poster_path);
  imgDiv1.appendChild(imgB);

  observerTargeta.observe(imgB);

  // Crear el elemento div para el texto
  const textDiv1 = document.createElement("div");
  textDiv1.classList.add("text");


  // Crear el elemento h2 y establecer su contenido de texto
  const h21 = document.createElement("h2");
  h21.textContent = movie.title;
  textDiv1.appendChild(h21);

  article1.appendChild(textDiv1);
  // Agregar el artículo al documento
  peliculasBusqueda.appendChild(article1);

  });
  }
  
}





async function getMovieById(id){
  //movie porque solo recibo una pelicula
  const {data: movie} = await api('movie/' + id);

  const container = document.querySelector('.detalles .carruselD');
  container.innerHTML ="";



console.log(movie);

// Crear el contenedor principal de detalles de peliculas


const sliderD = document.createElement('div');
sliderD.classList.add('sliderD');

// Crear el contenedor de la imagen
const imD = document.createElement('div');
imD.classList.add('imD');
const imagen = document.createElement('img');
imagen.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
imagen.alt = movie.title;
imD.appendChild(imagen);


// Crear el contenedor del texto
const tex = document.createElement('div');
tex.classList.add('tex');

const titulo = document.createElement('h2');
titulo.innerText = movie.title;

const cal = document.createElement('div');
cal.classList.add('cal');

const icono = document.createElement('img');
icono.src = './assets/icon/star-svgrepo-com.svg';
icono.alt = '';

const puntuacion = document.createElement('p');
puntuacion.innerText = " " + movie.vote_average.toFixed(1);
cal.appendChild(icono);
cal.appendChild(puntuacion);
const descripcion = document.createElement('p');
descripcion.innerText = movie.overview;
tex.appendChild(titulo);
tex.appendChild(cal);
tex.appendChild(descripcion);


// Agregar los contenedores al contenedor principal
sliderD.appendChild(imD);
sliderD.appendChild(tex);

// Agregar el contenedor principal al contenedor existente en el HTML
container.appendChild(sliderD);




//Creando el contenedor de categorias de peliculas

let catesById = movie.genres;
console.log(catesById);

const contenedorCateDetalles = document.querySelector('.detalles .columna')
contenedorCateDetalles.innerHTML = "";

catesById.forEach(cate => {
// Creamos el elemento HTML
const article = document.createElement("article");
const articleDiv = document.createElement("div");
const articleTitulo = document.createElement("p");

// Agregamos las clases y textos necesarios
articleTitulo.textContent = cate.name;
articleTitulo.setAttribute('id', 'id'+ cate.id);
articleTitulo.addEventListener('click', () => {
  location.hash = '#category=' + cate.id + '-' + cate.name;
})
// Agregamos los elementos al documento
article.appendChild(articleDiv);
article.appendChild(articleTitulo);



contenedorCateDetalles.appendChild(article);
})




getMoviesSimilares(id);
window.scroll(0,0);

}

async function getMoviesSimilares(id){
  const {data} = await api('movie/' + id + '/similar');
  const movies = data.results;
  console.log('Estas son las similares');
  console.log(data);


  const moviesimilar = document.querySelector('.detalles .peliculas1');

  moviesimilar.innerHTML = "";
  movies.forEach(movie => {
        // Crear el elemento article
const article = document.createElement('article');
article.classList.add('carrusell');
article.addEventListener("click", () => {
  location.hash = '#movie=' + movie.id;
})

// Crear el elemento img y añadirlo al article
const imgM = document.createElement('img');
imgM.setAttribute('data-img','https://image.tmdb.org/t/p/w300' + movie.poster_path);
imgM.alt = movie.title;
article.appendChild(imgM);

observerTargeta.observe(imgM);


// Crear el elemento div y añadirlo al article
const textDiv = document.createElement('div');
textDiv.classList.add('text');
const title = document.createElement('h2');
title.textContent = movie.title;
textDiv.appendChild(title);
article.appendChild(textDiv);


//Anadiendo el articulo al contendor principal
moviesimilar.appendChild(article);

  });

}










window.addEventListener('DOMContentLoaded', navegador,false);
window.addEventListener('hashchange', navegador,false);
//el escroll infinito
let page = 1;
let pageS = 1;
let pageTop = 1;

let scrollInfinito;
window.addEventListener("scroll", scrollInfinito, false);


//Haciendo que el boton de home, me lleve a home
home.addEventListener('click', () => {
    location.hash = '#home';
    peliculasBusqueda.innerHTML = "";

})

//Haciendo que el boton de ver mas me lleve a trends
btnVerMas.addEventListener("click", () => {
    location.hash = '#trends';
});

//Haciendo que la flecha de regresar me lleve siempre al home
flechaRegresar.addEventListener("click", () => {
    let pag = window.history.back();//Esto sirve para regresar a la pagina anterior
    if(pag = '#home'){
        location.hash = '#home';
    } else {
        location.hash = pag;
    }
    window.scroll(0,0);
})
let section = '';
function navegador(){
    console.log({location});

    //Esto es para que cada vez que entremos en esta funcion, se cambie el valor de scroll
    if(scrollInfinito) {
        window.removeEventListener("scroll", scrollInfinito, false);
        scrollInfinito = undefined;
    }

    
    if(location.hash.startsWith('#trends')) {
        peliculasBusqueda.innerHTML = '';
        trendsPage();
        section = 'trends';
        
    } else if(location.hash.startsWith('#search=')) {
        peliculasBusqueda.innerHTML = '';

        searchPage();
        section = 'search';
    } else if(location.hash.startsWith('#movie=')) {
        moviePage();
    } else if(location.hash.startsWith('#category=')) {
        categoriesPage();
    }  else if(location.hash.startsWith('#home')) {
        homePage();
        section = "";
    } else {
        homePage();
    }

    window.scroll(0,0);
    if(scrollInfinito){
        window.addEventListener("scroll", scrollInfinito, false);
    }

}

function homePage(){

    flechaRegresar.classList.add('inactive');
    detallePelicula.classList.add('inactive');
    masPeliculas.classList.add('inactive');
    pelisPorCatego.classList.add('inactive');

    //Por si los elementos que vamos a mostrar tienen inactive
    carruselImagenes.classList.remove('inactive');
    contendorPelisyCate.classList.remove('inactive');
    barraBusqueda.classList.remove('inactive');

    console.log('Home');
    busqueda();

    section = "";
    const childrenCategoriesPreview = Array.from(contenedorMovies.children);
  if(!childrenCategoriesPreview.length){
    getTrendingMoviesPreview();
    getCategoriesPreview();
    //carImg();
    
  }
    
}
function searchPage(){
    console.log('#search=');
    detallePelicula.classList.add('inactive');
    masPeliculas.classList.remove('inactive');
    carruselImagenes.classList.add('inactive');
    contendorPelisyCate.classList.add('inactive');
    //Por si los elementos que vamos a mostrar tienen inactive
    pelisPorCatego.classList.add('inactive');
    barraBusqueda.classList.remove('inactive');
    flechaRegresar.classList.remove('inactive');
    resultado.classList.remove('inactive');

    const [_, query] = location.hash.split('=');
    if(!query){
        location.hash = '#home';
    }else {
        getMoviesBySearch(query);
    }
    
}
function moviePage(){
    console.log('#movie=');
    detallePelicula.classList.remove('inactive');
    flechaRegresar.classList.remove('inactive');

    masPeliculas.classList.add('inactive');
    pelisPorCatego.classList.add('inactive');
    carruselImagenes.classList.add('inactive');
    contendorPelisyCate.classList.add('inactive');
    barraBusqueda.classList.add('inactive');

    const [_, movieId] = location.hash.split('=');

    getMovieById(movieId);

}
function categoriesPage(){
    
    detallePelicula.classList.add('inactive');
    masPeliculas.classList.add('inactive');
    carruselImagenes.classList.add('inactive');
    contendorPelisyCate.classList.add('inactive');
    //Por si los elementos que vamos a mostrar tienen inactive
    pelisPorCatego.classList.remove('inactive');
    barraBusqueda.classList.remove('inactive');
    flechaRegresar.classList.remove('inactive');

    console.log('#category=');

    const [_, categoryInfo] = location.hash.split('=');//category, id-name, eso se hace con manipulacion de array
    const [categoryID, categoryName] = categoryInfo.split('-');
    const nombreBien= decodeURI(categoryName);

    nombreCate.innerHTML = nombreBien;
    getMoviesByCategory(categoryID);

    //Para ponerle el parametro utilice clouser
    scrollInfinito = getMoviesByCategoryScroll(categoryID);
}
function trendsPage(){
    console.log('Trends!');

    flechaRegresar.classList.remove('inactive');
    detallePelicula.classList.add('inactive');
    masPeliculas.classList.remove('inactive');
    pelisPorCatego.classList.add('inactive');

    //Por si los elementos que vamos a mostrar tienen inactive
    carruselImagenes.classList.add('inactive');
    contendorPelisyCate.classList.add('inactive');
    barraBusqueda.classList.add('inactive');
    resultado.classList.remove('inactive');
  
    window.scroll(0,0);//Esto se utiliza para que la pagina que se muestre siempre se muestre desde arriba
    getTrendingMovies();
}



//location.hash = '#category='
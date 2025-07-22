const TheData = async (userSearch) =>{
    const response = await axios.get(' http://www.omdbapi.com/', {
        params: {
            apikey: 'a7c67545',
            s: userSearch
        }
    })
    if (response.data.Error){
        return [];
    }
    return response.data.Search;
};

const root = document.querySelector('.auto');

root.innerHTML = `  <section id="int" class="is-flex is-flex-direction-column is-align-items-center has-text-white"><h1>Search Your Movie</h1>
                    <input class = "input"/>
                    </section>
                    <section class = "dropdown">
                        <section class = "dropdown-menu">
                            <section id="drops" class = "dropdown-content results"></section>
                        </section>
                    </section>`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultswrapper = document.querySelector('.results')
const debounce = (func, delay = 1000) =>{
    let timeoutId;
    return(...args)=>{
        if (timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(()=>{
            func.apply(null, args);
        }, 1000)
    }
}


const onInput =  async Event =>{
    const movies =   await TheData(Event.target.value);
    if(!movies.length){
        dropdown.classList.remove('is-active');
        return;
    }
    resultswrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let movie of movies){
        const section = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '': movie.Poster;
        section.classList.add('dropdown-item');
        section.classList.add('is-flex')
        section.classList.add('is-flex-direction-column')
        section.classList.add('is-align-items-center')
        section.classList.add('is-justify-content-center')
        section.innerHTML = `<img class="image is-1by1" src="${imgSrc}"/>  
            ${movie.Title}`;
        section.addEventListener('click', ()=>{
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            MovieSelect(movie);
        });
        resultswrapper.appendChild(section);
    }   
}
input.addEventListener('input', debounce(onInput))

document.addEventListener('click', Event =>{
    if(!root.contains(Event.target)){
        dropdown.classList.remove('is-active');
    }
});

const MovieSelect = async movie =>{
     const response = await axios.get(' http://www.omdbapi.com/', {
        params: {
            apikey: 'a7c67545',
            i: movie.imdbID
        }
    });
   document.querySelector('#Popup').innerHTML = movieTemplate(response.data);
   document.querySelector('#Popup').classList.add('is-flex');
   document.querySelector('#Popup').classList.add('is-flex-direction-column');
   document.querySelector('#Popup').classList.add('is-align-items-center');
   document.querySelector('#Popup').classList.add('mt-6');
   document.querySelector('#Popup').classList.add('p-6');
  

    
};

const movieTemplate = (moviedetail)=>{
    return `
    <img src="${moviedetail.Poster}"/>
    <section>
        <h1 class="has-text-white is-size-3 has-text-weight-bold is-family-primary">${moviedetail.Title}</h1>
    </section>
    <section id="ss">
        
        <section id="test" class="p-5 border-collapse: inherit m-4 is-flex is-flex-direction-column is-align-items-center has-background-white has-text-black ">
            <h3>Year</h3>
            <p>${moviedetail.Year}</p> 
        </section>

        <section class="p-5 m-4 is-flex is-flex-direction-column is-align-items-center has-background-white has-text-black">
            <h3>Rating</h3>
            <p>${moviedetail.Ratings}</p>
        </section>

        <section class="p-5 m-4 is-flex is-flex-direction-column is-align-items-center has-background-white has-text-black">
            <h3>Genre</h3>
            <p>${moviedetail.Genre}</p>
        </section>

    </section>

    <section class="mb-2 mt-2">
        <h3 class="has-text-white is-size-4 has-text-weight-bold">Directed by ${moviedetail.Director}</h3>
    </section>

    <section id="s3" class="p-2">
        <p>${moviedetail.Plot}</p>
    </section>

    <section class="mt-2 mb-2">
        <h3 class="has-text-white is-size-4 has-text-weight-bold is-family-secondary">Actors</h3>
    </section>

    <section id="s4">
        <p>${moviedetail.Actors}</p>
    </section>`;
}


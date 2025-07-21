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
root.innerHTML = `<label><b>Search Your Movie</b></label>
                    <input class = "input"/>
                    <section class = "dropdown">
                        <section class = "dropdown-menu">
                            <section class = "dropdown-content results"></section>
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
    resultswrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for (let movie of movies){
        const section = document.createElement('a');
        section.classList.add('dropdown-item');
        section.innerHTML = `<img class = "is-small" src="${movie.Poster}"/>  
            ${movie.Title}`;
        resultswrapper.appendChild(section);
    }   
}
input.addEventListener('input', debounce(onInput))


let sel = (selector) => document.querySelector(selector);
let arrFilms;
sel('.btn').addEventListener('click', async function () {
    if (sel('.movieName').value != '') {
        sel('.block').innerHTML = '';
        let response = await fetch(`http://www.omdbapi.com/?s=${sel('.movieName').value}&apikey=b5624da8`)
        let date = await response.json();
        arrFilms = await Object.values(date);
        for (let i = 0; i < arrFilms[0].length; i++) {
            let newItem = document.createElement("div");
            newItem.classList.add('item');
            let newItemImage = document.createElement("div");
            newItemImage.classList.add('item-image');
            newItemImage.style.backgroundImage = `url(${arrFilms[0][i].Poster})`;
            let newItemName = document.createElement("div");
            newItemName.classList.add('item-name');
            newItemName.textContent = arrFilms[0][i].Title;
            let newItemInfo = document.createElement("div");
            newItemInfo.classList.add('item-info');
            let newItemType = document.createElement("p");
            newItemType.classList.add('item-type');
            newItemType.textContent = arrFilms[0][i].Type;
            let newItemYear = document.createElement("p");
            newItemYear.classList.add('item-year');
            newItemYear.textContent = arrFilms[0][i].Year;
            let newItemButton = document.createElement("button");
            newItemButton.classList.add('details');
            newItemButton.textContent = 'More details'
            newItemInfo.appendChild(newItemType);
            newItemInfo.appendChild(newItemYear);
            newItem.appendChild(newItemImage);
            newItem.appendChild(newItemName);
            newItem.appendChild(newItemInfo);
            newItem.appendChild(newItemButton);
            sel('.block').appendChild(newItem);
        }
    }
    for (let i = 0; i < sel('.block').children.length; i++) {
        sel('.block').children[i].addEventListener('click', async function (e) {
            if (e.target.className == 'details') {

                let fullInfoFilm = arrFilms[0][i].imdbID;
                let response1 = await fetch(`http://www.omdbapi.com/?i=${fullInfoFilm}&apikey=b5624da8`)
                let date1 = await response1.json();
                sel('.left-box').style.backgroundImage = `url(${date1.Poster})`;
                sel('.box-name').textContent = date1.Title;
                sel('.pG').textContent = date1.Rated + ' ' + date1.Year + ' ' + date1.Genre;
                sel('.box-title').textContent = date1.Plot;
                sel('.writen').innerHTML = `<span class="bold">Writen by: </span> ${date1.Writer} `;
                sel('.directed').innerHTML = `<span class="bold">Directed by: </span> ${date1.Director} `;
                sel('.starring').innerHTML = `<span class="bold">Starring: </span> ${date1.Actors} `;
                sel('.boxofice').innerHTML = `<span class="bold">BoxOffice: </span> ${date1.BoxOffice} `;
                sel('.awards').innerHTML = `<span class="bold">Awards: </span> ${date1.Awards} `;
                try {
                    sel('.internet').innerHTML = date1.Ratings[0].Source + ' ' + date1.Ratings[0].Value;
                    sel('.rotten').innerHTML = date1.Ratings[1].Source + ' ' + date1.Ratings[1].Value;
                    sel('.metac').innerHTML = date1.Ratings[2].Source + ' ' + date1.Ratings[2].Value;
                }
                catch (e) {
                    console.log(e);
                }
                sel('.back-modal').style.display = 'block';
                sel('.modal').style.display = 'block';

            }

        })
    }
});
sel('.back-modal').addEventListener('click', function () {
    sel('.back-modal').style.display = 'none';
    sel('.modal').style.display = 'none';
})



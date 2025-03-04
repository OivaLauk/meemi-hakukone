document.addEventListener("DOMContentLoaded", function() {
    const url = "https://api.imgflip.com/get_memes";
    fetch(url)
    .then(response => response.json())
    .then(memes => {

        //Käytetään fetchattuja meemejä tekemään elementtejä
        const names = [];
        for(let i = 0; i < memes.data.memes.length; i++) {
            names.push(memes.data.memes[i].name);
            
            const div = document.createElement('div');
            div.className = 'memes'
            div.dataset.name = memes.data.memes[i].name.toLowerCase();
            const img = document.createElement('img');
            img.src = `${memes.data.memes[i].url}`;
            const content = document.createTextNode(memes.data.memes[i].name);
            div.appendChild(content);
            div.appendChild(img);
            const memeDiv = document.getElementById('memeDiv');
            memeDiv.appendChild(div);
            
            //Onclick funktio joka avaa meemin uuteen ikkunaan
            div.onclick = function() {
                window.open(memes.data.memes[i].url);
            };
        };
        
        //Meemien etsintä funktio
        document.addEventListener("input", function() {
            const memes = document.getElementsByClassName('memes');
            const input = document.getElementById('input').value.toLowerCase();

            for (let i = 0; i < memes.length; i++) {
                if (memes[i].dataset.name.includes(input)) {
                    memes[i].style.display = 'block';
                } else {
                    memes[i].style.display = 'none';
                }
            }
        })

    })
    .catch(err => {
        const memeDiv = document.getElementById('memeDiv');
        const errorText = document.createTextNode(`Error: ${err}`)
        memeDiv.appendChild(errorText);
    });
});
let play = '<i class="fa-solid fa-play"></i>';
let pauses = '<i class="fa-solid fa-pause"></i>';
let vol = 0.5;
let refi = 0;
let songfetch;

function init() {
    document.getElementById('lecteur').volume = vol;
    document.getElementById('range').value = vol;
    document.getElementById('play').innerHTML = play;


    document.getElementById('suivant').addEventListener('click', function () { suivant() });
    document.getElementById('precedent').addEventListener('click', function () { precedent() });
    document.getElementById('play').addEventListener('click', function () { lecture() });
    document.getElementById('volumemoins').addEventListener('click', function () { volumemoins() });
    document.getElementById('volumeplus').addEventListener('click', function () { volumeplus() });
    document.getElementById('search').addEventListener('keyup', function () { search() });



    var client_id = 'fdaad47b01894c02984c73467e9dea84';
    var client_secret = 'aafc32e40cab405aa1efecb9f0b0660f';

    var authOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + (btoa(client_id + ':' + client_secret)),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:
            'grant_type=client_credentials'

    };

    fetch('https://accounts.spotify.com/api/token', authOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);

            var fetchOptions = {
                headers: {
                    // 'Cache-Control': 'no-cache',
                    'Authorization': `Bearer ${json.access_token}`,
                    'Content-Type': 'application/json'
                }
            };


            fetch('https://api.spotify.com/v1/albums/6pEbfS09Hwul0U3MVbWRyj', fetchOptions)
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    songfetch = json;

                    document.getElementById('lecteur').src = songfetch.tracks.items[refi].preview_url;
                    document.getElementById('titreartiste').innerText = songfetch.artists[0].name;
                    document.getElementById('titremusic').innerText = songfetch.tracks.items[refi].name

                    /* La boucle pour la création de carte */
                    for (let i = 0; i < songfetch.tracks.items.length; i++) {
                        const madivcards = document.createElement('div');
                        madivcards.classList.add('cards', 'toutpeter');
                        madivcards.innerHTML =
                            '<img src="' + songfetch.images[1].url + '" alt="img" id="cover"> <h3 class="titre" id="titre">' + songfetch.tracks.items[i].name + '</h3> <p id="artiste" class="artiste">' + songfetch.artists[0].name + '</p>';
                        const macartepleine = document.getElementById('Mescarte');
                        madivcards.addEventListener("click", function () { carteclique(i); });
                        macartepleine.appendChild(madivcards);
                    }
                });

        });

}

/* Bouton play / pause */
function lecture() {
    if (document.getElementById('lecteur').paused == true) {
        document.getElementById('lecteur').play();
        document.getElementById('play').innerHTML = play.replace(play, pauses);
    } else {
        document.getElementById('lecteur').pause();
        document.getElementById('play').innerHTML = play.replace(play, play);
    }
}


function volumeplus() {

    if (document.getElementById('lecteur').volume.toFixed(1) < 1) {
        document.getElementById('lecteur').volume += 0.1;
        document.getElementById('range').value = document.getElementById('lecteur').volume;
        document.querySelector('#volumemoins').disabled = false;
    } else {
        document.querySelector('#volumeplus').disabled = true;
    }
}

function volumemoins() {
    if (document.getElementById('lecteur').volume.toFixed(1) > 0) {
        document.getElementById('lecteur').volume -= 0.1;
        document.getElementById('range').value = document.getElementById('lecteur').volume;
        document.querySelector('#volumeplus').disabled = false;
    } else {
        document.querySelector('#volumemoins').disabled = true;
    }
}

/* On set le volum via le range vol */
function inputvol() {
    document.getElementById('lecteur').volume = document.getElementById('range').value;
}




function suivant() {
    if (refi == songfetch.tracks.items.length - 1) {
        refi = -1;
    }
    refi++;
    document.getElementById('lecteur').src = songfetch.tracks.items[refi].preview_url;
    document.getElementById('titreartiste').innerText = songfetch.artists[0].name;
    document.getElementById('titremusic').innerText = songfetch.tracks.items[refi].name;
    lecture();
}


function precedent() {
    if (refi == 0) {
        refi = songfetch.tracks.items.length;
    }
    refi--;
    document.getElementById('lecteur').src = songfetch.tracks.items[refi].preview_url;
    document.getElementById('titreartiste').innerText = songfetch.artists[0].name;
    document.getElementById('titremusic').innerText = songfetch.tracks.items[refi].name;
    lecture();
}

/* Dès qu'on clique, sur la carte on a accès au son */
function carteclique(index) {

    refi = index;
    document.getElementById('lecteur').src = songfetch.tracks.items[refi].preview_url;
    document.getElementById('titreartiste').innerText = songfetch.artists[0].name;
    document.getElementById('titremusic').innerText = songfetch.tracks.items[refi].name;

    lecture();
}


/* On prend la durée max et le current time pour avoir les valeurs définie de notre range input */
function lecteurduree() {
    document.getElementById('tempschanson').value = document.getElementById('lecteur').currentTime.toFixed(0);

    let secondes = document.getElementById('lecteur').currentTime.toFixed(1);
    let minutes = 0;

    while (secondes > 60) {
        minutes += 1;
        secondes -= 60;
    }
    minutes = parseInt(minutes);
    secondes = parseInt(secondes);


    document.getElementById('temps').innerHTML = minutes + 'min' + secondes + 's';
}

function changeduration() {
    document.getElementById('tempschanson').setAttribute("max", document.getElementById('lecteur').duration);
}


/* On choisi un changement sur la range input*/
function inputmusic() {
    document.getElementById('lecteur').currentTime = document.getElementById('tempschanson').value;
}


function next() {
    if (refi == songfetch.tracks.items.length - 1) {
        refi = -1;
    }
    refi++;
    document.getElementById('lecteur').src = songfetch.tracks.items[refi].preview_url;
    document.getElementById('titreartiste').innerText = songfetch.artists[0].name;
    document.getElementById('titremusic').innerText = songfetch.tracks.items[refi].name;
    lecture()

}

function search() {
    let input = document.getElementById('search').value;
    input=input.toLowerCase();
    let x = document.getElementsByClassName('toutpeter');
    let y = document.getElementsByClassName('titre');
    let z = document.getElementsByClassName('artiste');
  
  
    for (j = 0; j < x.length; j++) { 
        if (!y[j].innerHTML.toLowerCase().includes(input) && !z[j].innerHTML.toLowerCase().includes(input)) {
            x[j].style.display="none";
        }
        else {
            x[j].style.display="";
        }
    }

    console.log();
}

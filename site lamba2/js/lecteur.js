let play = "Play";
let pauses = "Pause";
let vol = 0.5;

let tableauAsso = [
    {
        titre: "Titre1",
        artiste: "1",
        cover: "img/1.png",
        musique: "./audio/Hold_On_a_Minute.mp3"
    },
    {
        titre: "Titre2",
        artiste: "2",
        cover: "img/1.png",
        musique: "./audio/2.mp3"
    },
    {
        titre: "Titre3",
        artiste: "3",
        cover: "img/1.png",
        musique: "./audio/3.mp3"
    },
    {
        titre: "Titre4",
        artiste: "4",
        cover: "img/1.png",
        musique: "./audio/4.mp3"
    },
    {
        titre: "Titre5",
        artiste: "5",
        cover: "img/1.png",
        musique: "./audio/5.mp3"
    }
];

let refi = 0;
let songfetch;

function init() {
    document.getElementById('lecteur').volume = vol;
    document.getElementById('range').value = vol;
    document.getElementById('play').innerText = play;


    document.getElementById('suivant').addEventListener('click', function () { suivant() });
    document.getElementById('precedent').addEventListener('click', function () { precedent() });
    document.getElementById('play').addEventListener('click', function () { lecture() });
    document.getElementById('volumemoins').addEventListener('click', function () { volumemoins() });
    document.getElementById('volumeplus').addEventListener('click', function () { volumeplus() });
    document.getElementById('search').addEventListener('change', function(){search()});


    // fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/302127')
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (json) {
    //         songfetch = json;

    //         /* La boucle pour la création de carte */
    //         for (let i = 0; i < json.tracks.data.length; i++) {
    //             const madivcards = document.createElement('div');
    //             madivcards.classList.add('cards');
    //             madivcards.setAttribute("id", i);
    //             madivcards.innerHTML =
    //                 '<a href="#" id="cover"><img src="' + json.cover + '" alt="img"></a> <h2 class="titre"><a href="#" id="titre">' + json.tracks.data[i].title + '</a></h2> <p><a href="#" id="artiste">' + json.artist.name + '</a></p>';
    //             const macartepleine = document.getElementById('Mescarte');
    //             madivcards.addEventListener("click", function () { carteclique(i); });
    //             macartepleine.appendChild(madivcards);
    //         }
    //     });


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

		fetch('https://accounts.spotify.com/api/token',authOptions)
		.then(function(response) {
		  return response.json();
		})
		.then(function(json) {
		  console.log(json);
		  
		  var fetchOptions = {
			  headers: {
				'Cache-Control': 'no-cache',
				'Authorization': `Bearer ${json.access_token}`,
				'Content-Type': 'application/json'
			  }
		  };
		  

		fetch('https://api.spotify.com/v1/albums/6Zvjrvs1MGgbSTZq3WJv3n?market=fr',fetchOptions)
		.then(function(response) {
		  return response.json();
		})
		.then(function(json) {
            songfetch = json;

            document.getElementById('lecteur').src = songfetch.tracks.items[refi].preview_url;
            document.getElementById('titreartiste').innerText = songfetch.artists[0].name;
            document.getElementById('titremusic').innerText = songfetch.tracks.items[refi].name

            /* La boucle pour la création de carte */
            for (let i = 0; i < songfetch.tracks.items.length; i++) {
                const madivcards = document.createElement('div');
                madivcards.classList.add('cards');
                madivcards.setAttribute("id", i);
                madivcards.innerHTML =
                    '<a href="#" id="cover"><img src="' + songfetch.images[1].url + '" alt="img"></a> <h2 class="titre"><a href="#" id="titre">' + songfetch.tracks.items[i].name + '</a></h2> <p><a href="#" id="artiste">' + songfetch.artists[0].name + '</a></p>';
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
        document.getElementById('play').innerText = play.replace(play, pauses);
    } else {
        document.getElementById('lecteur').pause();
        document.getElementById('play').innerText = play.replace(play, play);
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
    refi++;
    document.getElementById('lecteur').src = songfetch.tracks[refi].preview_url;
    document.getElementById('titreartiste').innerText = songfetch.artists[0].name;
    document.getElementById('titremusic').innerText = songfetch.tracks.items[refi].name;
    lecture();
}

function search(){
    console.log(document.getElementById('search').value);
}

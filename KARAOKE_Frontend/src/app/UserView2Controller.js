window.onload = function() {    
    setWelcomeName();
    LlenarTablaCanciones();
  };

function setWelcomeName(){
  const token = localStorage.getItem("user_token");
  const tokenParseado =  JSON.parse(token);
  const name = tokenParseado.NombreUsuario;
  document.getElementById("UserName").innerText = name;
}  

  async function getData() {
    const jsonString = await fetch('http://localhost:3001/music',{
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    
    return jsonString
  }

  async function getLetra(id) {
    const jsonString = await fetch('http://localhost:3001/Letra',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
    })
    .then(res => res.json())
    
    return jsonString
  }

async function cambiarCancion(url){
    const audio = document.getElementById('audio');
    const source = document.getElementById('audioSource');
    source.src = url;
    audio.load();
    audio.play();

    const LETRA = {
      "URL": url
    };
    var letra = await getLetra(LETRA);
    change(letra.Letra);
}  

async function LlenarTablaCanciones(){
    const canciones = await getData();
    $("#TablaCanciones td").remove();

    for (i = 0; i < canciones.length; i++) {
        $("<tr><td>" + canciones[i].NombreCancion + "</td><td>" + canciones[i].Artista + "</td><td>" +
            canciones[i].Album + "</td><td>" + canciones[i].Status + "</td><td>" +
            '<input type="image" onclick="cambiarCancion(\'' + canciones[i].URL.toString() + '\')" title="Play" width="30" height="30" src="../img/play.png">'+            
            "</td></tr>").appendTo("#TablaCanciones"); 
    } 
}


function change(letra) {
  var elem = document.getElementById("letra");
  var nextLyric = document.getElementById("letra2");
  let firstSplit = letra.split('[')
  let lyric = splitText(firstSplit)
  for (let i = 0; i < lyric.length; i++) {
    if (i < lyric.length - 1){
      updateLyrics(lyric[i][0], lyric[i][1], elem)
      updateLyrics(lyric[i][0], lyric[i+1][1], nextLyric)
    }
    else if (i == lyric.length -1){
      updateLyrics(lyric[i][0], lyric[i][1], elem)
      updateLyrics(lyric[i][0], "------------------", nextLyric)
    }
    
  }
  elem.innerHTML = "------------------"
}

function updateLyrics(i, lyric, elem){
  setTimeout(function() {
    elem.innerHTML = lyric;
  }, i*1000)
}

function splitText(toSplit){
  var result = []
  for (let i = 1; i < toSplit.length ; i++){
    result.push(toSplit[i].split(']'))
  }
  return result
}

function desactinput(){
  console.log("Click en nombre");
  document.getElementById('idArtista').disabled = true;
  document.getElementById('idAlbum').disabled = true;
  document.getElementById('idLetra').disabled = true;
}

function desactinput2(){
  console.log('Click en artista');
  document.getElementById('idNombre').disabled = true;
  document.getElementById('idAlbum').disabled = true;
  document.getElementById('idLetra').disabled = true;
}

function desactinput3(){
  console.log('Click en album');
  document.getElementById('idNombre').disabled = true;
  document.getElementById('idArtista').disabled = true;
  document.getElementById('idLetra').disabled = true;
}

function desactinput4(){
  console.log('Click en letra');
  document.getElementById('idNombre').disabled = true;
  document.getElementById('idArtista').disabled = true;
  document.getElementById('idAlbum').disabled = true;
}

async function activinputs(){
  console.log('Click en boton filter');
  await LlenarTablaCancionesFiltrado();
  document.getElementById('idNombre').disabled = false;
  document.getElementById('idArtista').disabled = false;
  document.getElementById('idAlbum').disabled = false;
  document.getElementById('idLetra').disabled = false;
  document.getElementById('idNombre').value= "";
  document.getElementById('idArtista').value= "";
  document.getElementById('idAlbum').value= "";
  document.getElementById('idLetra').value= "";
}

async function LlenarTablaCancionesFiltrado(){
  //const canciones = await getData();
  //$("#TablaCanciones td").remove();
  let DATA;
  const idNombre = document.getElementById('idNombre').value;
  const idArtista = document.getElementById('idArtista').value;
  const idAlbum = document.getElementById('idAlbum').value;
  const idLetra = document.getElementById('idLetra').value;  

  if (idNombre.length > 0) {
    //console.log("campo Cancion " , document.getElementById('idNombre').value )
    console.log(idNombre);

    DATA={
      "dato": idNombre,
      "filtro": "NombreCancion"
    }
  } 
  else if (idArtista.length > 0) {
    console.log("campo Artista")
    DATA={
      "dato": idArtista,
      "filtro": "Artista" 
    }
  } 
  else if (idAlbum.length > 0) {
    console.log("campo Album")
    DATA={
      "dato": idAlbum,
      "filtro": "Album" 
    }
  } 
  else if (idLetra.length > 0){
  //idLetra
  console.log("campo letra")
  DATA={
    "dato": idLetra,
    "filtro": "Letra" 
    }
  }
  //console.log(DATA);

  const result = await getSongsByFilter(DATA);
  //console.log(result);
  $("#TablaCanciones td").remove();

  for (i = 0; i < result.length; i++) {
      $("<tr><td>" + result[i].NombreCancion + "</td><td>" + result[i].Artista + "</td><td>" +
      result[i].Album + "</td><td>" + result[i].Status + "</td><td>" +
          '<input type="image" onclick="cambiarCancion(\'' + result[i].URL.toString() + '\')" title="Play" width="30" height="30" src="../img/play.png">'+          
          "</td></tr>").appendTo("#TablaCanciones"); 
  } 
}

async function getSongsByFilter(DATA) {
  const jsonString = await fetch('http://localhost:3001/filtrado',{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(DATA)
  })
  .then(res => res.json())
  
  return jsonString
}

function salir(){
    localStorage.clear();
    location.href = "./Login.html"; 
}
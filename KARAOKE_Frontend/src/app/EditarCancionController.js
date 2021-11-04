window.onload = function() {    
    getDataParaCancion();
  };

function goBackToUserView(){
    localStorage.removeItem("id_cancion");
    location.href = "./UserView.html";      
}  

async function getCancion_Api(DATA){
    const jsonString = await fetch('http://localhost:3001/unaCancion',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(DATA)
    })
    .then(res => res.json())
    
    return jsonString
}

async function getDataParaCancion(){
    const ID = localStorage.getItem("id_cancion");
    const DATA = {
        "_id": ID
    };
    const result = await getCancion_Api(DATA);
    //console.log(result);
    document.getElementById('idNombreCancion').value=result[0].NombreCancion;
    document.getElementById('idArtista').value=result[0].Artista;
    document.getElementById('idAlbum').value=result[0].Album;
    document.getElementById('idURL').value=result[0].URL;
    document.getElementById('idLetra').value=result[0].Letra;
}

async function saveEditedSong(){
  const form  = document.getElementById('form_editedSong');
  const ID = localStorage.getItem("id_cancion");
  const datos = {
    "_id": ID,
    "URL": form.elements['idURL'].value,
    "Album": form.elements['idAlbum'].value,
    "Artista": form.elements['idArtista'].value,
    "NombreCancion": form.elements['idNombreCancion'].value,
    "Letra": form.elements['idLetra'].value,
  }
  await saveEditedSong_API(datos);
  alert ( "Se guardó correctamente!");
  goBackToUserView();
}

async function saveEditedSong_API(datos){
  await fetch( 'http://localhost:3001/saveEditedSong', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  }).then(data => data.json())
}
function goBackToUserView(){
  location.href = "./UserView.html";  
}  

async function newSong_API(datos){
  await fetch( 'http://localhost:3001/newSong', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  }).then(data => data.json())  
}

async function setNewSong(){  
    const form  = document.getElementById('signup');
    const datos = {
      "URL": form.elements['idURL'].value,
      "Album": form.elements['idAlbum'].value,
      "Artista": form.elements['idArtista'].value,
      "NombreCancion": form.elements['idNombreCancion'].value,
      "Letra": form.elements['idLetra'].value,
      "Status": "Active"
    }
    await newSong_API(datos);
    alert ( "Se agregó correctamente!");
    goBackToUserView(); 
}
    
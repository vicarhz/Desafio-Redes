async function loginUser(credentials) {
    const jsonResponse = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      }).then(data => data.json())

    if(jsonResponse.length === 0){
      document.getElementById("UserNotFound").style.visibility = "visible";
    }
    // El usuario si existe
    else{
      localStorage.setItem("user_token", JSON.stringify(jsonResponse));       
    }
  }

  /**
   * Se Utiliza para traerse los le username y el pass de la vista de login
   */
  async function getUserData(){
      const username = document.getElementById("username").value;
      const password = document.getElementById("pass").value;
      const credentials = {
          "username": username,
          "password": password
      }      
      await loginUser(credentials);
      const token = localStorage.getItem("user_token");
      const tokenParseado =  JSON.parse(token);
      //console.log(tokenParseado);
      if(!tokenParseado){
        alert ( "Usuario no Válido!");
      }
      else{
        const tipoUsuario = tokenParseado.TipoUsuario;
        if(tipoUsuario == "premium"){
          location.href = "./UserView.html";          
        }
        else{ // usuario normal
          location.href = "./UserView2.html";          
        }
      }      
  }
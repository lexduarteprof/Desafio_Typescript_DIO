let apiKey: string;
let requestToken: string;
let username: string;
let password: string;
let sessionId: string;
let listId = '7101979';

let loginButton = document.getElementById('login-button') as HTMLButtonElement;
let searchButton = document.getElementById('search-button')  as HTMLButtonElement;
let searchContainer = document.getElementById('search-container');
let search = document.getElementById('search') as HTMLInputElement;


//realiza o login após o click 
loginButton.addEventListener('click', async () => {
  
  preencherdados();

  await criarRequestToken();
  await logar();
  await criarSessao();
})

searchButton.addEventListener('click', async () => {
  let lista = document.getElementById("lista");
  if (lista) {
    lista.outerHTML = "";
  }

  let query: string = search.value;

  let listaDeFilmes: any = await procurarFilme(query);
  let ul = document.createElement('ul');
  ul.id = "lista"
  for (const item of listaDeFilmes.results) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item.original_title))
    ul.appendChild(li)
  }
  console.log(listaDeFilmes);

  if(searchContainer){
    searchContainer.appendChild(ul);
  }

})

let senha = document.getElementById('senha') as HTMLInputElement;

function preencherdados(){

    preencherLogin();
    preencherSenha();
    preencherApi();

}

function preencherSenha() {
  
  if(senha){
    password = senha.value;
  }
  validateLoginButton();
}

let login = document.getElementById('login') as HTMLInputElement;

login.addEventListener('change', () => validateLoginButton)

function preencherLogin() {
  username =  login.value;
  validateLoginButton();
}

let vlapikey = document.getElementById('api-key') as HTMLInputElement;

function preencherApi() {
  apiKey = vlapikey.value;
  validateLoginButton();
}

function validateLoginButton() {

  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

class HttpClient {
  static async get(url: string, method: string, body?: any) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}

async function procurarFilme(query: string) {
  query = encodeURI(query)
  console.log(query)
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    "GET"
  )
  return result
}

async function adicionarFilme(filmeId: string) {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
     "GET"
  )
  console.log(result);
}

async function criarRequestToken () {
  let result: any = await HttpClient.get(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    "GET"
  )

  requestToken = result.request_token
}

async function logar() {
  await HttpClient.get(
    `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    "POST",
    {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  )
}

async function criarSessao() {
  let result: any = await HttpClient.get(
    `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
     "GET"
  )
  sessionId = result.session_id;
}

async function criarLista(nomeDaLista: string, descricao: string) {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
     "POST",
    {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  )
  console.log(result);
}

async function adicionarFilmeNaLista(filmeId: string, listaId: string) {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    "POST",
    {
      media_id: filmeId
    }
  )
  console.log(result);
}

async function pegarLista() {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
     "GET"
  )
  console.log(result);
}

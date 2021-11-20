//Objeto global com a lista de produtos que temos cadastrado
var listaPosts = [];

//Nome do banco de dados com a lista de produtos
var nomeBancoProdutos = "postsDB";

//Função que irá analisar no banco de dados qual o usuário que esta conectado atualmente na seção
function dbGetAccountlogado(){
    var user = JSON.parse(window.localStorage.getItem("usuarioLocal"))
    return user[0]; 
}

//Função que irá inicializar o banco de dados com os produtos caso desejado
function initDataBase(nomeDB){
    var posts = [""];
        posts = JSON.parse(window.localStorage.getItem(nomeDB));                 //Coleta todos os usuários cadastrados atualmente

    if(posts == null){
        console.log("Inicializando o Banco de Dados de Produtos");
        inserePost('Amadeu Marques', 'amadeu.jfif', 'didi.jpg', 760, 123, false);
        inserePost('Heisenberg', 'heisenberg.jpg', 'chaves.jpg', 342, 23, false); 
    }else{
        console.log("Banco de Dados já Iniciado!");
    }
}

//Função para inserir os produtos dentro do banco de dados local.
function inserePost(usuario, fotoPerfil, imgPost, likesFoto, qtyComentarios, like){
    var usuarioLocal = {
        "id": 0,
        "usuario": usuario,
        "fotoPerfil": fotoPerfil,
        "imagem": imgPost,
        "likesFoto": likesFoto,
        "qtyComentarios": qtyComentarios,
        "like": like
    };
    postDataBase(nomeBancoProdutos, usuarioLocal);
}

//BANCO DE DADOS - DAO - Funções de Set, Get e Put para o banco de dados local.
function getDataBase(nomeDB){
    return JSON.parse(window.localStorage.getItem(nomeDB)); 
}

function postDataBase(nomeDB, objeto){
    var produtos = [""];
        produtos = JSON.parse(window.localStorage.getItem(nomeDB));                 //Coleta todos os usuários cadastrados atualmente
        
        if(produtos != null){
            objeto["id"] = produtos.length;                                         //Define a ID para o produto    
        }else{
            produtos = [];
        }
        
        produtos.push(objeto);                                                      //Insere o produto na última posição do DB
        window.localStorage.setItem(nomeDB, JSON.stringify(produtos));              //Para colocar no banco de dados local
        return true;
}

function putDataBase(nomeDB, objeto){
    window.localStorage.setItem(nomeDB, JSON.stringify(listaPosts));                  //Para colocar no banco de dados local
    return true;
}



//Função para montar o CARD com os Produtos para a SPA
function montarCardProduto(div_desejada, filtro){
    document.getElementById("content-menu").checked = false;

    var conteudo = '';
    document.getElementById(div_desejada).innerHTML = conteudo;

            listaPosts.forEach((item) =>{
                var descricaoReduzida = item.usuario;
                conteudo = '';
                conteudo += '<div class="card">';
                conteudo += '<div class="card-img">';
                conteudo += `<img src="../img/posts/${item.imagem}">`;
                conteudo += '</div>';

                conteudo += '<div class="card-comentario">';
                if(item.like==false){
                    conteudo += `<div class="card-like" onclick="like('${item.id}', '${div_desejada}')">`;
                    conteudo += '<i class="fas fa-heart"></i>';

                }else{
                    conteudo += `<div class="card-liked" onclick="like('${item.id}', '${div_desejada}')">`;
                    conteudo += '<i class="fas fa-heart"></i>';
                    
                }
                conteudo += `<text class="card-curtidas">${item.likesFoto}</text> `; 
                conteudo += '</div>';

                conteudo += '<div class="card-usuario">';
                conteudo += `Usuario: ${descricaoReduzida}...`; //Para cortar a descrição em 50 caracteres apenas
                conteudo += `Qty comentarios: ${item.qtyComentarios}`; 
                conteudo += '</div>';
                conteudo += '</div>';

                conteudo += '</div>';
        
                document.getElementById(div_desejada).innerHTML += conteudo;
        });
}


//Função que irá alterar a posição exata da div e do JSON, em seguida enviar para o banco de dados
function like(id, div_desejada){
    listaPosts[id].like = !listaPosts[id].like;  
    if(listaPosts[id].like){
        listaPosts[id].likesFoto = listaPosts[id].likesFoto+1;
    }else{
        listaPosts[id].likesFoto = listaPosts[id].likesFoto-1;
    }
    putDataBase(nomeBancoProdutos, 1);
    
    montarCardProduto(div_desejada);
}


//MENUS do Site, quando clicado no botão do Header ele altera as funções internas
function posts(){
    montarCardProduto("content-right");                     //Atualiza a tela principal com os dados do banco de dados
}

//Funções que vão ser inicializadas sempre que a página for executada e o script for executado
initDataBase(nomeBancoProdutos);                        //Inicializa o Banco de Dados caso nunca tenha sido criado
listaPosts = getDataBase(nomeBancoProdutos);         //Obtém a última versão do Banco de Dados
posts();                                             //Função para carregar os produtos na página inicial.
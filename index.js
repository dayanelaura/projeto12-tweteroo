import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let usuarios = [];
let tweets = [];
let ultimosTweets = [];
let dezUltimos = [];
let tamanho = 0;

/* 
BODY /sign-up:
{
    "username": "bobesponja",
    "avatar": "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
}
BODY /tweets:
{
	"username": "bobesponja",
    "tweet": "eu amo o hub"
} */

app.post('/sign-up', (request, response) => {
    const usuario = request.body;
    const { username, avatar } = request.body;

    if(!username || !avatar)
    return response.status(400).send('Todos os campos são obrigatórios');

    usuarios.push(usuario);
    console.log(usuarios);
    return response.status(201).send("OK");
});

app.post('/tweets', (request, response) => {
    ultimosTweets = [];
    const tweetObject = request.body;
    const { username, tweet } = request.body;

    if(!username || !tweet)
    return response.status(400).send('Todos os campos são obrigatórios');

    tweets.push(tweetObject);
    console.log(tweets);

    tamanho = tweets.length;

    return response.status(201).send("OK");
});

app.get("/tweets", (request, response) => {
    if(usuarios.length===0)
    return response.status(400).send('Usuário não logado');

    if (tamanho !== tweets.length)
    return response.send(dezUltimos);

    tweets.forEach( tweetObject => {        
        const { username, tweet } = tweetObject;

        usuarios.forEach((usuarioObject) => {
            const { avatar } = usuarioObject;

            if(usuarioObject.username === tweetObject.username){
                const ultimoTweet = {
                    username: username,
                    avatar: avatar,
                    tweet: tweet,
                };
                ultimosTweets.unshift(ultimoTweet);
            }
        });
    });
    tamanho++;

    dezUltimos = ultimosTweets.filter((value, index) => index<10);
    return response.send(dezUltimos);
});

app.listen(5000, () => {
    console.log("Server running in port: 5000");
});
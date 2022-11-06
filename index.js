import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let usuarios = [];
let tweets = [];
let ultimosTweets = [];

/* {
    "username": "bobesponja",
    "avatar": "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
} */
/* {
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
    const tweetObject = request.body;
    const { username, tweet } = request.body;

    if(!username || !tweet)
    return response.status(400).send('Todos os campos são obrigatórios');

    tweets.push(tweetObject);
    console.log(tweets);
    return response.status(201).send("OK");
});

app.get("/tweets", (request, response) => {
    const ultimoTweet = tweets.length-1;
    
    if(tweets.length<10){
        for (let i = ultimoTweet; i>=0; i--){
            const tweet = tweets[i];
            ultimosTweets.push(tweet);
            //lembrando que não vem com o avatar e tem que adicionar de alguma forma!
        };
    }else{
        const primeiroTweet = (tweets.length-10);
        for (let i = ultimoTweet; i>=primeiroTweet; i--){
            const tweet = tweets[i];
            ultimosTweets.push(tweet);
            //lembrando que não vem com o avatar e tem que adicionar de alguma forma!
        };
    }

    response.send(ultimosTweets);
});

app.listen(5000, () => {
    console.log("Server running in port: 5000");
})
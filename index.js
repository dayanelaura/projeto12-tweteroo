import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let usuarios = [];
let tweets = [];
let dezTweets = [];

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

    usuarios.push(usuario);
    response.send("OK");
    console.log(usuarios);
});

app.post('/tweets', (request, response) => {
    const tweet = request.body;

    tweets.push(tweet);
    response.send("OK");
    console.log(tweets);
});

app.get("/tweets", (request, response) => {

    const ultimoTweet = tweets.length-1;
    const primeiroTweet = (tweets.length-10);

    for (let i = ultimoTweet; i>=primeiroTweet; i--){
        const tweet = [
            {
                username: "bobesponja",
                avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
                tweet: "eu amo o hub"
            }
        ];
        dezTweets.push(tweet);
    };

    response.send(dezTweets);
});

app.listen(5000, () => {
    console.log("Server running in port: 5000");
})
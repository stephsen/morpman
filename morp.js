import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import morgan from 'morgan';

var app = express();

app.server = http.createServer(app);

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(methodOverride('X-HTTP-Method-Override'));

var kill = (bill = ["", "", "", "", "", "", "", "", ""], counter = 0, victory = "", previous = ["", "", "", "", "", "", "", "", ""]) => {
    return "<form action='/' method='post'><table><tr><td><input value='" + bill[0] + "' name='bill[0]'/></td><td><input value='" + bill[1] + "' name='bill[1]'/></td><td><input value='" + bill[2] + "' name='bill[2]'/></td></tr><tr><td><input value='" + bill[3] + "' name='bill[3]'/></td><td><input value='" + bill[4] + "' name='bill[4]'/></td><td><input value='" + bill[5] + "' name='bill[5]'/></td></tr><tr><td><input value='" + bill[6] + "' name='bill[6]'/></td><td><input value='" + bill[7] + "' name='bill[7]'/></td><td><input value='" + bill[8] + "' name='bill[8]'/></td></tr></table><input name='counter' type='hidden' value='" + counter + "'><input name='previous' type='hidden' value='" + previous + "'><input name='button' type='submit'><input name='victory' type='text' value='" + victory + "' style='width: 280px;'><button name='newgame'><a href='/'>New game</a></button></form>";
};

var test = (myArray, tab, signeX, signeO) => {
    var message = "";
    for (var i = 0; i <= tab.length - 3; i = i + 3) {
        console.log(tab[i], tab[i + 1], tab[i + 2]);
        if (myArray[tab[i]] == signeX && myArray[tab[i + 1]] == signeX && myArray[tab[i + 2]] == signeX) {
            message = "Le joueur X a gagné";
        } else if (myArray[tab[i]] == signeO && myArray[tab[i + 1]] == signeO && myArray[tab[i + 2]] == signeO) {
            message = "Le joueur O a gagné";
        } else {
            message = "";
        }
    }
    return message;
};

app.get('/', (req, res) => {
    res.send(kill());
});

app.post('/', (req, res) => {
    var myArray = req.body.bill.map(b => b !== "" ? b.toUpperCase() : b),
        counter = Number(req.body.counter),
        i = 0,
        tab = {0: [0, 1, 2, 0, 4, 6, 0, 4, 8],1: [0, 1, 2, 1, 4, 7],2: [0, 1, 2, 2, 5, 8, 2, 4, 6],
            3: [3, 4, 5, 0, 3, 6],4: [4, 3, 5, 4, 1, 7, 4, 2, 6, 4, 0, 8],5: [5, 4, 3, 5, 2, 8],6: [6, 3, 0, 6, 7, 8, 6, 4, 2],
            7: [7, 6, 8, 7, 4, 1],8: [8, 7, 6, 8, 5, 2, 8, 4, 0]};
    var a = myArray.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
    if ((isNaN(a.X) ? 0 : a.X) - (isNaN(a.O) ? 0 : a.O) >= -1 && (isNaN(a.X) ? 0 : a.X) - (isNaN(a.O) ? 0 : a.O) <= 1) {
        let victory = "";
        let previous = req.body.previous.split(",");
        for (let j in myArray) {
            if (myArray[j] != previous[j]) {
                // console.log(tab[j]);
                victory = test(myArray, tab[j], "X", "O");
                i = Number(j);
                previous[j] = myArray[j];
                counter++;
            }
        }

        // console.log(victory, counter);
        if (victory === "") {
            if (counter == 9) {
                res.send(kill(myArray, counter, "Match null", previous));
            } else {
                res.send(kill(myArray, counter, victory, previous));
            }
        } else {
            res.send(kill(myArray, counter, victory, previous));
        }
    } else {
        res.send("Partie annulée, un joueur a joué 2 fois!");
    }
});

process.on('SIGINT', () => {
    console.log('Stopping...');
    process.exit();
});

app.server.listen(8000);
console.log('Server started on port 8000');

export default app;

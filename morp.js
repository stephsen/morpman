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
    return "<form action='/' method='post'><table><tr><td><input value='" + bill[0] + "' name='bill[0]'/></td><td><input value='" + bill[1] + "' name='bill[1]'/></td><td><input value='" + bill[2] + "' name='bill[2]'/></td></tr><tr><td><input value='" + bill[3] + "' name='bill[3]'/></td><td><input value='" + bill[4] + "' name='bill[4]'/></td><td><input value='" + bill[5] + "' name='bill[5]'/></td></tr><tr><td><input value='" + bill[6] + "' name='bill[6]'/></td><td><input value='" + bill[7] + "' name='bill[7]'/></td><td><input value='" + bill[8] + "' name='bill[8]'/></td></tr></table><input name='counter' type='hidden' value='" + counter + "'><input name='previous' type='text' value='" + previous + "'><input name='button' type='submit'><input name='victory' type='text' value='" + victory + "' style='width: 280px;'><button name='newgame'><a href='/'>New game</a></button></form>";
};

var test = (myArray, index1, index2, index3, signeX, signeO) => {
    if ([myArray[index1], myArray[index2], myArray[index3]].every(elem => elem === signeX)) {
        return "Le joueur X a gagné";
    } else {
        return "";
    }
    if ([myArray[index1], myArray[index2], myArray[index3]].every(elem => elem === signeO)) {
        return "Le joueur O a gagné";
    } else {
        return "";
    }
};
app.get('/', (req, res) => {
    res.send(kill());
});

app.post('/', (req, res) => {
    let myArray = req.body.bill.map(b => b !== "" ? b.toUpperCase() : b);
    req.body.counter = Number(req.body.counter) + 1;
    let counter = 0;
    for (let i of myArray) {
        if (i == "X" || i == "O") {
            counter++;
        }
    }
    if (counter == req.body.counter) {
        var a = myArray.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
        if ((isNaN(a.X) ? 0 : a.X) - (isNaN(a.O) ? 0 : a.O) >= -1 && (isNaN(a.X) ? 0 : a.X) - (isNaN(a.O) ? 0 : a.O) <= 1) {
            let victory = "";
            let i = 0;
            let previous = req.body.previous.split(",");
            for (let j in myArray) {
                if (myArray[j] != previous[j]) {
                    i = j;
                    previous[j] = myArray[j];
                }
                i = Number(i);
            }
            switch (i) {
                case 0:
                    console.log("pass");
                    victory = test(myArray, i, i + 1, i + 2, "X", "O") || test(myArray, i, i + 3, i + 6, "X", "O") || test(myArray, i, i + 4, i + 8, "X", "O");
                    break;
                case 1:
                    victory = test(myArray, i, i - 1, i + 1, "X", "O") || test(myArray, i, i + 3, i + 6, "X", "O");
                    break;
                case 2:
                    victory = test(myArray, i, i - 1, i - 2, "X", "O") || test(myArray, i, i + 3, i + 6, "X", "O") || test(myArray, i, i + 2, i + 4, "X", "O");
                    break;
                case 3:
                    victory = test(myArray, i, i + 1, i + 2, "X", "O") || test(myArray, i, i - 3, i + 3, "X", "O");
                    break;
                case 4:
                    victory = test(myArray, i, i - 1, i + 1, "X", "O") || test(myArray, i, i - 3, i + 3, "X", "O") || test(myArray, i, i - 4, i + 4, "X", "O") || test(myArray, i, i - 2, i + 2, "X", "O");
                    break;
                case 5:
                    victory = test(myArray, i, i - 1, i - 2, "X", "O") || test(myArray, i, i - 3, i + 3, "X", "O");
                    break;
                case 6:
                    victory = test(myArray, i, i + 1, i + 2, "X", "O") || test(myArray, i, i - 3, i - 6, "X", "O") || test(myArray, i, i - 2, i - 4, "X", "O");
                    break;
                case 7:
                    victory = test(myArray, i, i - 1, i + 1, "X", "O") || test(myArray, i, i - 3, i - 6, "X", "O");
                    break;
                case 8:
                    victory = test(myArray, i, i - 1, i - 2, "X", "O") || test(myArray, i, i - 3, i - 6, "X", "O") || test(myArray, i, i - 4, i - 8, "X", "O");
                    break;
                default:
                    victory = "";
                    break;
            }
            console.log(victory);
            if (victory === "") {
                if (counter == 9) {
                    req.body.victory = "Match null!";
                    res.send(kill(myArray, req.body.counter, req.body.victory, previous));
                } else {
                    res.send(kill(myArray, req.body.counter, req.body.victory, previous));
                }
            } else {
                req.body.victory = victory;
                res.send(kill(myArray, req.body.counter, req.body.victory, previous));
            }
        } else {
            res.send("Partie annulée, un joueur a joué 2 fois!");
        }
    } else {
        res.sendStatus(501);
    }
});

process.on('SIGINT', () => {
    console.log('Stopping...');
    process.exit();
});

app.server.listen(8000);
console.log('Server started on port 8000');

export default app;

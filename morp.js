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

var kill = (bill = ["", "", "", "", "", "", "", "", ""], counter = 0, victory = "") => {
    return "<form action='/' method='post'><table><tr><td><input value='" + bill[0] + "' name='bill[0]'/></td><td><input value='" + bill[1] + "' name='bill[1]'/></td><td><input value='" + bill[2] + "' name='bill[2]'/></td></tr><tr><td><input value='" + bill[3] + "' name='bill[3]'/></td><td><input value='" + bill[4] + "' name='bill[4]'/></td><td><input value='" + bill[5] + "' name='bill[5]'/></td></tr><tr><td><input value='" + bill[6] + "' name='bill[6]'/></td><td><input value='" + bill[7] + "' name='bill[7]'/></td><td><input value='" + bill[8] + "' name='bill[8]'/></td></tr></table><input name='counter' type='hidden' value='" + counter + "'><input name='button' type='submit'><input name='victory' type='text' value='" + victory + "' style='width: 280px;'><button name='newgame'><a href='/'>New game</a></button></form>";
};
app.get('/', (req, res) => {
    res.send(kill());
});

app.post('/', (req, res) => {
    let myArray = req.body.bill.map(b => b !== "" ? b.toUpperCase() : b);
    console.log(myArray);
    req.body.counter = Number(req.body.counter) + 1;
    let counter = 0;
    for (let i of myArray) {
        if (i == "X" || i == "O") {
            counter++;
        }
    }
    console.log(counter, req.body.counter);
    if (counter == req.body.counter) {
        var a = myArray.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
        if ((isNaN(a.X) ? 0 : a.X) - (isNaN(a.O) ? 0 : a.O) >= -1 && (isNaN(a.X) ? 0 : a.X) - (isNaN(a.O) ? 0 : a.O) <= 1) {
            let victoryX = false;
            let victoryO = false;
            var victory = "";
            if ([myArray[0], myArray[1], myArray[2]].every(elem => elem == "X")) {
                victoryX = true;
            }
            if ([myArray[3], myArray[4], myArray[5]].every(elem => elem == "X")) {
                victoryX = true;
            }
            if ([myArray[6], myArray[7], myArray[8]].every(elem => elem == "X")) {
                victoryX = true;
            }
            if ([myArray[0], myArray[3], myArray[6]].every(elem => elem == "X")) {
                victoryX = true;
            }
            if ([myArray[1], myArray[4], myArray[7]].every(elem => elem == "X")) {
                victoryX = true;
            }
            if ([myArray[2], myArray[5], myArray[8]].every(elem => elem == "X")) {
                victoryX = true;
            }
            if ([myArray[0], myArray[4], myArray[8]].every(elem => elem == "X")) {
                victoryX = true;
            }
            if ([myArray[2], myArray[4], myArray[6]].every(elem => elem == "X")) {
                victoryX = true;
            }
            if ([myArray[0], myArray[1], myArray[2]].every(elem => elem == "O")) {
                victoryO = true;
            }
            if ([myArray[3], myArray[4], myArray[5]].every(elem => elem == "O")) {
                victoryO = true;
            }
            if ([myArray[6], myArray[7], myArray[8]].every(elem => elem == "O")) {
                victoryO = true;
            }
            if ([myArray[0], myArray[3], myArray[6]].every(elem => elem == "O")) {
                victoryO = true;
            }
            if ([myArray[1], myArray[4], myArray[7]].every(elem => elem == "O")) {
                victoryO = true;
            }
            if ([myArray[2], myArray[5], myArray[8]].every(elem => elem == "O")) {
                victoryO = true;
            }
            if ([myArray[0], myArray[4], myArray[8]].every(elem => elem == "O")) {
                victoryO = true;
            }
            if ([myArray[2], myArray[4], myArray[6]].every(elem => elem == "O")) {
                victory0 = true;
            }
            if (victoryX === false && victoryO === false) {
                if (counter == 9) {
                  req.body.victory = "Match null!";
                  res.send(kill(myArray, req.body.counter, req.body.victory));
                } else {
                    res.send(kill(myArray, req.body.counter, req.body.victory));
                }
            } else {
                if (victoryX === true) {
                    req.body.victory = "Le joueur X a gagné ";
                    res.send(kill(myArray, req.body.counter, req.body.victory));
                }
                if (victoryO === true) {
                    req.body.victory = "Le joueur O a gagné ";
                    res.send(kill(myArray, req.body.counter, req.body.victory));
                }
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

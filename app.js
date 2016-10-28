import express from 'express'; //Igual ao require

const app = express();

app.route('/books')
    .get((req, res) => {
        res.json([{
            id: 1,
            name: 'Default Book'
        }]);
    });

//Igual exports.module
export default app;

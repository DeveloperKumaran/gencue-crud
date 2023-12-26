const express= require('express');
const cors = require('cors');
const mysql= require('mysql');



const app = express();
app.use(cors());
app.use(express.json()); 

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Kumaran@77',
    database: 'personaldetails',
});


app.get('/', (req, res) => {
    const sql = 'SELECT * FROM details';

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(result);
        }
    });
});


//  add a new user
app.post('/add', (req, res) => {
    const { first_name, last_name, city } = req.body;
    const sql = 'INSERT INTO details (first_name, last_name, city) VALUES (?, ?, ?)';

    db.query(sql, [first_name, last_name, city], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(201).send('User added successfully');
        }
    });
});

//  to update user data
app.put('/:id', (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, city } = req.body;
    const sql = 'UPDATE persondetails.details SET first_name=?, last_name=?, city=? WHERE id=?';

    db.query(sql, [first_name, last_name, city, userId], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send('User updated successfully');
        }
    });
});

//  to delete a user
app.delete('/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM details WHERE id=?';

    db.query(sql, [userId], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send('User deleted successfully');
        }
    });
});





app.listen(3001, () => {
    console.log('Listening on port 3001');
});

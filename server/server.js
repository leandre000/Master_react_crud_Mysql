import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json())


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'react'
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM facility";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            return res.json({ Message: "Error inside server" });
        }
        return res.json(result);
    });
});

app.post('/facility', (req,res) => {
    const sql = "INSERT INTO facility (schedule,equipment_inventory,facilities) VALUES(?);";
    const values = [
        req.body.schedule,
        req.body.equipment_inventory,
        req.body.facilities,
        ]

        db.query(sql, [values],(err, result) => {
            if(err) return res.json(err);
            return res.json(result)
        })
})
app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM facility WHERE id=? ";
    const id = req.params.id;
    db.query(sql,[id], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            return res.json({ Message: "Error inside server" });
        }
        return res.json(result);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = 'UPDATE facility SET schedule=?, equipment_inventory=?, facilities=? WHERE id=?';
    const id = req.params.id;
    const { schedule, equipment_inventory, facilities } = req.body; 

    db.query(sql, [schedule, equipment_inventory, facilities, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error inside server" });
        }
        return res.json(result);
    });
});

app.delete('/delete/:id', (req, res) => {
    const sql ='DELETE FROM facility WHERE id=?';
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error inside server" });
        }
        return res.json(result);
    });
});


app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});

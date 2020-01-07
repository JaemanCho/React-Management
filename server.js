const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();
const multer = require('multer');
// アップロード用のフォルダ設定
const upload = multer({dest: './upload'});

// 一人のユーザ選択
app.get('/api/customers/:id', (req, res) => {
    
    let sql = "SELECT * FROM customer WHERE isDeleted = 0 AND id = ?";
    let params = req.params.id;

    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    });
});

// すべてのユーザ選択
app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM customer WHERE isDeleted = 0", 
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

// 外部からアクセスできるようにする。
// url: /image -> folder: /upload にマッピング
app.use('/image', express.static('./upload'));

// 登録
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO customer VALUES (NULL, ?, ?, ?, ?, ?, NOW(), 0)';

    // ファイルのパス
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    
    let params = [image, name, birthday, gender, job];

    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    })
});

// 更新
app.put('/api/customers', upload.single('image'), (req, res) => {

    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let id = req.body.id;

    let sql = '';
    let params = [];

    // アップロードファイルがある場合
    if (typeof req.file !== 'undefined') {
        
        sql = 'UPDATE customer SET image = ?, name = ?, birthday = ?, gender = ?, job = ? WHERE id = ?';        
        // ファイルのパス
        let image = '/image/' + req.file.filename;
        params = [image, name, birthday, gender, job, id];
        res.send('!underfined');
    }
    else
    {
        sql = 'UPDATE customer SET name = ?, birthday = ?, gender = ?, job = ? WHERE id = ?';
        params = [name, birthday, gender, job, id];
    }
    
    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    })
});

// 削除
app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE customer SET isDeleted  = 1 WHERE id = ?';
    let params = req.params.id;

    connection.query(sql, params, (err, rows, fields) => {
        res.send(rows);
    });

});
app.listen(port, () => console.log(`Listening on port ${port}`));


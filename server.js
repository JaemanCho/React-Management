const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([
        {
          id: 1,
          image: 'https://placeimg.com/64/64/1',
          name: 'Kim1',
          birthday: '971222',
          gender: 'Man',
          job: 'Programmer'
        },
        {
          id: 2,
          image: 'https://placeimg.com/64/64/2',
          name: 'Kim2',
          birthday: '971222',
          gender: 'Man',
          job: 'Programmer'
        },
        {
          id: 3,
          image: 'https://placeimg.com/64/64/3',
          name: 'Kim3',
          birthday: '971222',
          gender: 'Man',
          job: 'Programmer'
        },
        {
          id: 4,
          image: 'https://placeimg.com/64/64/4',
          name: 'Kim4',
          birthday: '971222',
          gender: 'Man',
          job: 'Programmer'
        },
        {
          id: 5,
          image: 'https://placeimg.com/64/64/5',
          name: 'Kim5',
          birthday: '971222',
          gender: 'Man',
          job: 'Programmer'
        }
      ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));


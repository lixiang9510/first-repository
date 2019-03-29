const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public/'));

app.get('/', (req, res) => res.send('gettted response data....'));
app.post('/', (req, res) => res.send('post response data....'));
app.put('/', (req, res) => res.send('put response data....'));
app.delete('/', (req, res) => res.send('delete response data....'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
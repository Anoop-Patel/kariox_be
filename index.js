const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Hello, Vercel!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

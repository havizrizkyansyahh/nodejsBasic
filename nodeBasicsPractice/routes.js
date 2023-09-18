const users = [];
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head>');
        res.write('<title>Name Registrator</title>');
        res.write('</head>');
        res.write('<body>');
        res.write('<h1>This is node js</h1>');
        res.write('<form action="/create-user" method="POST">');
        res.write('<input type="text" name="name"><button>Submit</button></input>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const name = parsedBody.split('=')[1];
            users.push(name);
            res.statusCode = 302;
            res.setHeader('location', '/users');
            return res.end();
        });
    }

    if (url === '/users') {
        res.write('<html>');
        res.write('<head>');
        res.write('<title>Users list</title>');
        res.write('</head>');
        res.write('<body>');
        res.write('<ul>');
        for (let user of users) {
            res.write(`<li>${user}</li>`);
        }
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
}

exports.handler = requestHandler;
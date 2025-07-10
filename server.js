import http from "http";
import fs from "fs";

const hostname = "localhost";
const port = 9255;

const server = http.createServer((req, res) => {
    const filePath = "public" + (req.url === "/" ? "/index.html" : req.url);
    let contentType;

    if (filePath.endsWith(".html")) {
        contentType = "text/html";
    } else if (filePath.endsWith(".css")) {
        contentType = "text/css";
    } else if (filePath.endsWith(".js")) {
        contentType = "text/javascript";
    } else if (filePath.endsWith(".ttf")) {
        contentType = "font/ttf";
    } else {
        contentType = "text/plain";
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.end(`Can't read ${filePath}`);
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running on ${hostname}:${port}`);
});

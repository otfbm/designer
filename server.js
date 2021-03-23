import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import fastify from "fastify";
import fastifyStatic from "fastify-static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = fastify({ logger: true });

app.register(fastifyStatic, {
  root: path.join(__dirname, "dist"),
  prefix: "/public/",
});

app.get("/:id", (request, reply) => {
  reply.type("text/html");
  reply.send(fs.createReadStream(path.join(__dirname, "index.html")));
});

// app.listen(8080, "192.168.50.180", () => {
//   console.log("server listening on 8080");
// });

app.listen(8080, "127.0.0.1", () => {
  console.log("server listening on 8080");
});

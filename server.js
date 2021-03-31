import fastify from "fastify";
import fastifyCors from "fastify-cors";
import fs from "fs";
import { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const boards = new Map(
  JSON.parse(fs.readFileSync(join(__dirname, "./server-mocks/boards.json")))
);
const backgrounds = new Map(
  JSON.parse(
    fs.readFileSync(join(__dirname, "./server-mocks/backgrounds.json"))
  )
);
const tokens = new Map(
  JSON.parse(fs.readFileSync(join(__dirname, "./server-mocks/tokens.json")))
);

const app = fastify({ logger: true });

app.register(fastifyCors, {
  // put your options here
});

// // get all users for admin debug use, post to create new user
// GET POST /users

// // modify specific users
// GET PUT PATCH DELETE /users/{id}

// // get my joined tables, create new table
// GET POST /tables

// // edit existing table
// GET PUT PATCH DELETE /tables/{id}

// // get my boards by table, create new board
// GET POST /tables/{id}/boards

// // edit existing board
// GET PUT PATCH DELETE /tables/{id}/boards/{id}

// // add a board transform (a move, for example) or get transform set (need to think more deeply about this)
// GET POST /tables/{id}/boards/{id}/transform

// // edit a transform
// GET DELETE /tables/{id}/boards/{id}/transform/{id}

// // add a token image or get all my token images
// GET POST /users/{id}/tokens

// // token operations
// GET PUT DELETE /users/{id}/tokens/{id}

// // add new backround, get my backgrounds
// GET POST /users/{id}/backgrounds

// // background image ops
// GET PUT DELETE /users/{id}/backgrounds/{id}

// // add a token to the board, retrieve tokens
// GET POST /tables/{id}/boards/{id}/tokens

// // modify specific tokens
// GET PUT PATCH DELETE /tables/{id}/boards/{id}/tokens/{id}

// // add a token to the board, retrieve tokens
// GET POST /tables/{id}/boards/{id}/backgrounds

// // modify specific tokens
// GET PUT PATCH DELETE /tables/{id}/boards/{id}/backgrounds/{id}
// bit of a brain dump what i've been kicking around

app.get("/users/:user_id/backgrounds", async (request, reply) => {
  const userId = parseInt(request.params.user_id, 10);
  const bgs = new Map(backgrounds.get(userId));
  return Array.from(bgs.values());
});

app.post("/users/:user_id/backgrounds", async (request, reply) => {
  //
});

app.get(
  "/users/:user_id/backgrounds/:background_id",
  async (request, reply) => {
    const userId = parseInt(request.params.user_id, 10);
    const backgroundId = parseInt(request.params.background_id, 10);
    const bgs = new Map(backgrounds.get(userId));
    return bgs.get(backgroundId);
  }
);
app.put("/users/:user_id/backgrounds/:id", async (request, reply) => {
  //
});
app.delete("/users/:user_id/backgrounds/:id", async (request, reply) => {
  //
});

app.get("/users/:user_id/tokens", async (request, reply) => {
  const userId = parseInt(request.params.user_id, 10);
  const tks = new Map(tokens.get(userId));
  return Array.from(tks.values());
});

app.post("/users/:user_id/tokens", async (request, reply) => {
  //
});

app.get("/users/:user_id/tokens/:token_id", async (request, reply) => {
  const userId = parseInt(request.params.user_id, 10);
  const tokenId = parseInt(request.params.token_id, 10);
  const tks = new Map(tokens.get(userId));
  return tks.get(tokenId);
});

app.put("/users/:user_id/tokens/:token_id", async (request, reply) => {
  //
});

app.delete("/users/:user_id/tokens/:token_id", async (request, reply) => {
  //
});

app.get("/boards/:board_id", async (request, reply) => {
  return boards.get(request.params.board_id);
});

// app.get("/boards/:board_id/tokens", async (request, reply) => {
//   return boards.get(request.params.board_id);
// });

app.patch("/boards/:board_id", async (request, reply) => {
  // return {};
});

app.listen(8081, "0.0.0.0", () => {
  console.log("server started on port 8080");
});

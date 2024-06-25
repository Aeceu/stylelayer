const server = Bun.serve({
  port: 4200,
  fetch(req) {
    return new Response("Bun!");
  },
});
console.log(`Listening on http://localhost:${4200} ...`);

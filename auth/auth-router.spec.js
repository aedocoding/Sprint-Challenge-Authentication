const request = require("supertest");
const db = require("../database/dbConfig.js")
const server = require("./auth-router.js");
const test = {username: "Shana", password: "test"};

describe("server.js", function() {
  
  describe("POST /", function() {
    it("it shoud return status code 201", async function() {
      await db("users").truncate();
      request(server)
        .post("/register")
        .send(test)
        .expect(201);
    });
    it("it shoud return JSON", async function() {
      await db("users").truncate();
      request(server)
        .post("/register")
        .send(test)
        .then(req => {
          expect(req.body).toMatch(/json/i)
        })
    });
  });
  describe("POST /", function() {
    it("it shoud return status code 200", async function() {
      await db("users")
      request(server)
        .post("/login")
        .send(test)
        .expect(200);
    });
    it("it shoud return JSON", async function() {
      await db("users");
      request(server)
        .post("/login")
        .send(test)
        .then(res => {
          expect(res.body).toMatch(/json/i)
        })
    }); 
        it('should respond with { message: "Welcome test!" }', async function() {
        await db("users")
      request(server)
        .post("/login")
        .send(test)
          .then(res => {
            expect(res.body.message).toBe("Welcome test!");
          });
      });
  });
});

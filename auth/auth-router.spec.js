const request = require("supertest");
const db = require("../database/dbConfig.js")
const auth = require("./auth-router.js");
const test = {username: "test", password: "test"};

describe("auth-router.js", function() {
  beforeEach(async () => {
    // this function executes and clears out the table before each test
    await db('users').truncate();
  });
  
  describe("POST /", function() {
    it("it shoud return status code 201", async function() {
      await db("users");
      request(auth)
        .post("/register")
        .send(test)
        .expect(201);
    });
    it("it shoud return JSON", async function() {
      await db("users");
      request(auth)
        .post("/register")
        .send(test)
        .then(req => {
          expect(req.body).toMatch(/json/i)
        })
    });
  });
  describe("POST /", function() {
    it("dummy test", async function() {
      await db("users");
      request(auth)
        .post("/login")
        .send(test)
        .expect();
    });
    it("it shoud return status code 200", async function() {
      await db("users");
      request(auth)
        .post("/login")
        .send(test)
        .expect(200);
    });
    it("it shoud return JSON", async function() {
      await db("users");
      request(auth)
        .post("/login")
        .send(test)
        .then(res => {
          expect(res.body.message).toMatch(/json/i)
        })
    });
    it("dummy test", async function() {
      await db("users");
      request(auth)
        .post("/login")
        .send(test)
        .expect();
    });
    it("returns a token after login", async function() {
      await db("users");
      request(auth)
        .post("/login")
        .send(test)
        .then(res => {
          expect(res.body).toHaveProperty("token");
        });
    }); 
  });
});

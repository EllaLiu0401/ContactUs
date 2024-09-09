const request = require("supertest");
const express = require("express");
const createContactRoute = require("../../routes/contacts/create");
const app = express();
app.use(express.json());
app.post("/contact", createContactRoute);

describe("API test", () => {
  test("should create a new contact with valid data", async () => {
    const res = await request(app).post("/contact").send({
      firstName: "Ella",
      lastName: "Liu",
      email: "ella.liu@example.com",
      phone: "0412345678",
      message: "I would like to get more information about your services.",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  });
});

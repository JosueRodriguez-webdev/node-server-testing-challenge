const request = require("supertest");
const server = require("../server.js");

describe("server.js", () => {
  describe(".post('/')", () => {
    test("if correct / proper status code returns when created", async () => {
      const response = await request(server)
        .post("/api/schemes/")
        .send({
          scheme_name: "1421144es444s32sfd12422225444" //NEED UNIQUE SCHEMA NAME
        })
        .set("Accept", "application/json");

      expect(response.status).toEqual(201);
    });
    test("data if returned with id", async () => {
      const response = await request(server)
        .post("/api/schemes/")
        .send({
          scheme_name: "1421144e444fseesssdfsfesee5fse532124sffese22225444" //NEED UNIQUE SCHEMA NAME
        })
        .set("Accept", "application/json");

      expect(response.body.id).toBeTruthy();
    });
  });
  describe(".delete('/:id')", () => {
    test("if correct / proper response when deleted", async () => {
      const response = await request(server).delete("/api/schemes/36"); // NEED UNIQUE ID
      const expectedMessage = "deleted";

      expect(response.body.removed).toMatch(expectedMessage);
    });
    test("check if post is deleted", async () => {
      const newPost = {
        scheme_name: "new sfsefejftjfstest" //NEED UNIQUE SCHEMA NAME
      };

      const responsePost = await request(server)
        .post("/api/schemes/")
        .send(newPost)
        .set("Accept", "application/json");

      const responseDelete = await request(server).delete(
        `/api/schemes/${responsePost.body.id}`
      ); // NEED UNIQUE ID

      const responseGet = await request(server).get(`/api/schemes/`);
      const data = await responseGet.body;

      const filtering = await data.filter((item) => {
        return responsePost.body.id === item.id;
      });

      expect(filtering).toEqual([]);
    });
  });
});

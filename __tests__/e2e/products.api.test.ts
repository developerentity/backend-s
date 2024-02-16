import request from "supertest";
import { HTTP_STATUSES, app, server } from "../../src/index";

describe("/products", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/data");
  });

  afterAll(async () => {
    server.close();
  });

  it("should return 200 and array with products", async () => {
    await request(app).get("/products").expect(HTTP_STATUSES.OK_200, []);
  });

  it("should return 404 for not existing course", async () => {
    await request(app)
      .get("/products/444444444")
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it(`shouldn't create product with incorrect input data`, async () => {
    await request(app)
      .post("/products")
      .send({ title: "" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);

    await request(app).get("/products").expect(HTTP_STATUSES.OK_200, []);
  });

  let createdProduct1: any = null;
  let createdProduct2: any = null;
  it(`should create product with incorrect input data`, async () => {
    const createResponse = await request(app)
      .post("/products")
      .send({ title: "new post testing" })
      .expect(HTTP_STATUSES.CREATED_201);

    createdProduct1 = createResponse.body;

    expect(createdProduct1).toEqual({
      id: expect.any(Number),
      title: "new post testing",
    });

    await request(app)
      .get("/products")
      .expect(HTTP_STATUSES.OK_200, [createdProduct1]);
  });

  it(`should create one more product`, async () => {
    const createResponse = await request(app)
      .post("/products")
      .send({ title: "new post testing" })
      .expect(HTTP_STATUSES.CREATED_201);

    createdProduct2 = createResponse.body;

    expect(createdProduct2).toEqual({
      id: expect.any(Number),
      title: "new post testing",
    });

    await request(app)
      .get("/products")
      .expect(HTTP_STATUSES.OK_200, [createdProduct1, createdProduct2]);
  });

  it(`shouldn't update product with incorrect input data`, async () => {
    await request(app)
      .put("/products/" + createdProduct1.id)
      .send({ title: "" })
      .expect(HTTP_STATUSES.BAD_REQUEST_400);

    await request(app)
      .get("/products/" + createdProduct1.id)
      .expect(HTTP_STATUSES.OK_200, createdProduct1);
  });

  it(`shouldn't update product that doesn't exist`, async () => {
    await request(app)
      .put("/products/" + 2)
      .send({ title: "bla bla" })
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });

  it(`should update product with correct input data`, async () => {
    const updatedTitle = "updatedTitle";

    await request(app)
      .put("/products/" + createdProduct1.id)
      .send({ title: updatedTitle })
      .expect(HTTP_STATUSES.NO_CONTENT_204);

    await request(app)
      .get("/products/" + createdProduct1.id)
      .send({ title: updatedTitle })
      .expect(HTTP_STATUSES.OK_200, {
        ...createdProduct1,
        title: updatedTitle,
      });

    await request(app)
      .get("/products/" + createdProduct2.id)
      .expect(HTTP_STATUSES.OK_200, createdProduct2);
  });

  it("should delete both courses", async () => {
    await request(app)
      .delete("/products/" + createdProduct1.id)
      .expect(HTTP_STATUSES.NO_CONTENT_204);

    await request(app)
      .get("/products/" + createdProduct1.id)
      .expect(HTTP_STATUSES.NOT_FOUND_404);

    await request(app)
      .delete("/products/" + createdProduct2.id)
      .expect(HTTP_STATUSES.NO_CONTENT_204);

    await request(app)
      .get("/products/" + createdProduct2.id)
      .expect(HTTP_STATUSES.NOT_FOUND_404);

    await request(app).get("/products").expect(HTTP_STATUSES.OK_200, []);
  });
});

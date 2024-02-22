import request from "supertest";
import { app } from "../../src/app";
import { HTTP_STATUSES } from "../../src/http_statuses";

describe("/addresses", () => {
  beforeAll(async () => {
    await request(app).delete("/__test__/addresses");
  });

  it("should return 200 and empty array", async () => {
    await request(app).get("/addresses").expect(HTTP_STATUSES.OK_200, []);
  });

  it("should return 404 for not existing address", async () => {
    await request(app)
      .get("/addresses/444444444")
      .expect(HTTP_STATUSES.NOT_FOUND_404);
  });
});

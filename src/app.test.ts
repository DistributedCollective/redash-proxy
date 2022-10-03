/* eslint-env jest */
import app from "./app";
import request from "supertest";
import axios from "axios";

it("testing to See if Jest Works", () => {
  expect(1).toBe(1);
});

describe("GET /", () => {
  it("responds to GET / request", async () => {
    const result = await request(app).get("/").send();
    expect(result.status).toBe(200);
    expect(result.text).toBe(
      "Sovryn Redash Proxy Service Running. Stay Sovryn."
    );
  });
});

describe("GET /proxy/*", () => {
  it("returns correct redash API response for public endpoint", async () => {
    const redashResult = await axios.get(
      "https://redash.sovryn.app/api/queries/207/results.json?api_key=LkO9lvuzaAnKXihpH855A90yPlEKvjbitBR4KWLm"
    );
    const result = await request(app)
      .get(
        "/proxy/api/queries/207/results.json?api_key=LkO9lvuzaAnKXihpH855A90yPlEKvjbitBR4KWLm"
      )
      .send();
    expect(result.status).toBe(200);
    expect(result.body).toEqual(redashResult.data);
  });

  it("returns error for wrong API key", async () => {
    const redashQuery = async () => {
      return await axios
        .get(
          "https://redash.sovryn.app/api/queries/207/results.json?api_key=LkO9lvuzaAnKXihpH855A90yPlEKvjbitBR4KWLg"
        )
        .then((res) => {
          return res;
        })
        .catch((e) => {
          return e.response;
        });
    };
    const redashResult = await redashQuery();
    const result = await request(app)
      .get(
        "/proxy/api/queries/207/results.json?api_key=LkO9lvuzaAnKXihpH855A90yPlEKvjbitBR4KWLg"
      )
      .send();
    console.log(redashResult);
    expect(result.status).toBe(redashResult.status);
    expect(result.body).toEqual(redashResult.data);
  });
});

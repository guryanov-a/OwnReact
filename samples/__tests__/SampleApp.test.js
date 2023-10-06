import App from "../SampleApp";

describe("jsx", () => {
  it("works", () => {
    expect.hasAssertions();
    expect(App).toStrictEqual({
      props: {
        children: [
          {
            props: {
              nodeValue: "Hello, World!"
            },
            type: "TEXT ELEMENT"
          }
        ],
        prop1: "prop value"
      },
      type: "h1"
    });
  });
});

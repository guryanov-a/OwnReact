import { createInstance } from "../createInstance";
import instantiate from "../instantiate";

jest.mock("../instantiate");

describe("createInstance", () => {
    it("should create instance of a DOM element", () => {
        const container = document.createElement("div");
        const element = {
            type: "div",
            props: {
                children: [
                    {
                        type: "span",
                    },
                    {
                        type: "i",
                    },
                ],
            },
        };
        
        const expectedInstanceDom = document.createElement("div");
        const expectedInstanceDomChild1 = document.createElement("span");
        const expectedInstanceDomChild2 = document.createElement("i");
        expectedInstanceDom.appendChild(expectedInstanceDomChild1);
        expectedInstanceDom.appendChild(expectedInstanceDomChild2);
        const expectedInstance = {
            dom: expectedInstanceDom,
            element,
            childInstances: [
                {
                    dom: expectedInstanceDomChild1,
                    element: {
                        type: "span",
                    },
                },
                {
                    dom: expectedInstanceDomChild2,
                    element: {
                        type: "i",
                    },
                },
            ],
        };

        instantiate.mockImplementation(() => {
            return expectedInstance;
        });

        const instance = createInstance(container, element);
        
        expect(instance).toEqual(expectedInstance);
        expect(container.innerHTML).toEqual("<div><span></span><i></i></div>");
    });
});
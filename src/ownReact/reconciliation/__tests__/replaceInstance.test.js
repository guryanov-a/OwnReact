import { replaceInstance } from "../replaceInstance";
import { createInstance } from "../createInstance";

jest.mock("../createInstance");

describe("replaceInstance", () => {
    test.only("returns nextInstance", () => {
        const container = document.createElement("div");
        // setting up initial data
        const prevInstanceDom = document.createElement("div");
        const prevInstanceDomChild = document.createElement("span");
        const prevInstanceDomChild2 = document.createElement("i");
        prevInstanceDom.appendChild(prevInstanceDomChild);
        prevInstanceDom.appendChild(prevInstanceDomChild2);
        container.appendChild(prevInstanceDom);

        const prevInstance = {
            dom: prevInstanceDom,
            element: {
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
            },
            childInstances: [
                {
                    dom: prevInstanceDomChild,
                    element: {
                        type: "span",
                    },
                },
                {
                    dom: prevInstanceDomChild2,
                    element: {
                        type: "i",
                    },
                },
            ],
        };
        const nextElement = {
            type: "span",
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

        // setting up expected data
        const expectedNextInstanceDom = document.createElement("span");
        const expectedNextInstanceDomChild = document.createElement("span");
        const expectedNextInstanceDomChild2 = document.createElement("i");
        expectedNextInstanceDom.appendChild(expectedNextInstanceDomChild);
        expectedNextInstanceDom.appendChild(expectedNextInstanceDomChild2);
        
        const expectedNextInstance = {
            dom: expectedNextInstanceDom,
            element: {
                type: "span",
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
            },
            childInstances: [
                {
                    dom: expectedNextInstanceDomChild,
                    element: {
                        type: "span",
                    },
                },
                {
                    dom: expectedNextInstanceDomChild2,
                    element: {
                        type: "i",
                    },
                },
            ],
        };

        // mocking what is not under test
        createInstance.mockImplementation(() => {
            return expectedNextInstance;
        });

        // asserting
        expect(container.innerHTML).toBe("<div><span></span><i></i></div>");
        const nextInstance = replaceInstance(container, prevInstance, nextElement);
        expect(nextInstance).toEqual(expectedNextInstance);
        expect(container.innerHTML).toBe("<span><span></span><i></i></span>");
    });
});
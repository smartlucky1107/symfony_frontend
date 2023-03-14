import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AdvantageSection from "./advantageSection";

afterEach(cleanup);

describe("Advantage Section component", () => {
    it("Should correctly render component", () => {
        const { asFragment } = render(<AdvantageSection />);

        expect(asFragment()).toMatchSnapshot();
    });
});

import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import WalletsToggleList from "./walletsToggleList";

test("toggle list on click", () => {
    render(<WalletsToggleList />);

    const button = screen.getByRole("button");

    fireEvent.click(button);
});

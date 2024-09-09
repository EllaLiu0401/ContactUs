import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactList from "../page";

describe("ContactList test", () => {
  // mock fetch
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      if (url === `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact`) {
        return Promise.resolve({
          json: () =>
            Promise.resolve([
              {
                id: 1,
                firstName: "Ella",
                lastName: "Liu",
                email: "ellatong0515@gmail.com",
                phone: "0412345678",
                message: "Test note1",
                verified: 0,
              },
              {
                id: 2,
                firstName: "Vicent",
                lastName: "Hu",
                email: "vincenttt@example.com",
                phone: "0412345679",
                message: "Test note2",
                verified: 1,
              },
            ]),
        });
      }

      // mock update verify
      if (url.includes("/contact/1/verify")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () =>
            Promise.resolve({ message: "Contact marked as verified" }),
        });
      }

      // mock delete
      if (url.includes(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/1`)) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () =>
            Promise.resolve({ message: "Contact deleted successfully" }),
        });
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("render contact list title correctly", () => {
    render(<ContactList />);
    const contactTitle = screen.getByText(/Contact List/i);
    const firstNameTitle = screen.getByText(/First Name/i);
    const lastNameTitle = screen.getByText(/Last Name/i);
    const emailTitle = screen.getByText(/Email/i);
    const phoneTitle = screen.getByText(/Phone Number/i);
    const noteTitle = screen.getByText(/Note/i);
    const optionTitle = screen.getByText(/Option/i);

    expect(contactTitle).toBeInTheDocument();
    expect(firstNameTitle).toBeInTheDocument();
    expect(lastNameTitle).toBeInTheDocument();
    expect(emailTitle).toBeInTheDocument();
    expect(phoneTitle).toBeInTheDocument();
    expect(noteTitle).toBeInTheDocument();
    expect(optionTitle).toBeInTheDocument();
  });

  test("render contact list content correctly", async () => {
    render(<ContactList />);

    await waitFor(() => {
      expect(screen.getByText("Ella")).toBeInTheDocument();
      expect(screen.getByText("Liu")).toBeInTheDocument();
      expect(screen.getByText("ellatong0515@gmail.com")).toBeInTheDocument();
      expect(screen.getByText("0412345678")).toBeInTheDocument();
      expect(screen.getByText("Test note1")).toBeInTheDocument();
      expect(screen.getByText("Vicent")).toBeInTheDocument();
      expect(screen.getByText("Hu")).toBeInTheDocument();
      expect(screen.getByText("vincenttt@example.com")).toBeInTheDocument();
      expect(screen.getByText("0412345679")).toBeInTheDocument();
      expect(screen.getByText("Test note2")).toBeInTheDocument();
    });
  });

  test("check verify contact and update button state", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<ContactList />);
    });

    await waitFor(() => {
      expect(screen.getByText("Ella")).toBeInTheDocument();
    });

    const verifyButton = screen.getAllByText("Verify")[0];

    await user.click(verifyButton);

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/1/verify`,
      expect.objectContaining({ method: "PUT" })
    );
    // button should be disabled and text should be 'Verified'

    expect(verifyButton).toHaveTextContent("Verified");
    expect(verifyButton).toBeDisabled();
  });

  test("check detele contact", async () => {
    const user = userEvent.setup();
    render(<ContactList />);

    await waitFor(() => {
      expect(screen.getByText("Ella")).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByText("Delete")[0];

    await act(async () => {
      await user.click(deleteButton);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/1`,
        expect.objectContaining({ method: "DELETE" })
      );
    });

    expect(screen.queryByText("Ella")).not.toBeInTheDocument();
  });
});

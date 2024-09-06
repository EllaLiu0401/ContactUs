import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactDetail from "../ContactDetail";
import ContactForm from "../ContactForm";

describe("ContectDetail test", () => {
  test("renders contact details correctly", () => {
    render(<ContactDetail />);
    const welcomeText = screen.getByText(/Welcome to OpenAgent/i);
    const contactDetailText = screen.getByText(/Contact Us Details/i);
    const phoneText = screen.getByText(/Phone: 13 24 34/i);
    const emailText = screen.getByText(/Email: support@openagent.com.au/i);
    const addressDetailText = screen.getByText(/Postal Address:/i);
    const addressText = screen.getByText(/PO Box 419, Alexandria NSW 1435/i);
    const openingDetailText = screen.getByText(
      /Contact centre hours of operation/i
    );
    const openingText = screen.getByText(/Monday - Friday 8:30 - 5:00/i);

    expect(welcomeText).toBeInTheDocument();
    expect(contactDetailText).toBeInTheDocument();
    expect(phoneText).toBeInTheDocument();
    expect(emailText).toBeInTheDocument();
    expect(addressDetailText).toBeInTheDocument();
    expect(addressText).toBeInTheDocument();
    expect(openingDetailText).toBeInTheDocument();
    expect(openingText).toBeInTheDocument();
  });
});

describe("ContactForm test", () => {
  // get all inputs
  const getInputs = () => {
    const firstNameInput = screen.getByPlaceholderText(/First name/i);
    const lastNameInput = screen.getByPlaceholderText(/Last name/i);
    const emailInput = screen.getByPlaceholderText(/Email address/i);
    const phoneInput = screen.getByPlaceholderText(/Phone number/i);
    const messageInput = screen.getByPlaceholderText(
      /What do you want to speak to us about/i
    );
    const submitButton = screen.getByRole("button", { name: /SEND MESSAGE/i });
    return {
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      messageInput,
      submitButton,
    };
  };

  // clear all inputs
  const clearAllInputs = async (
    user,
    firstNameInput,
    lastNameInput,
    emailInput,
    phoneInput,
    messageInput
  ) => {
    await user.clear(firstNameInput);
    await user.clear(lastNameInput);
    await user.clear(emailInput);
    await user.clear(phoneInput);
    await user.clear(messageInput);
  };

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 201,
        ok: true,
        json: () => Promise.resolve({ id: 1 }),
        headers: {
          get: () => "application/json",
        },
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("email validation", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    // get all inputs
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      messageInput,
      submitButton,
    } = getInputs();

    // clear inputs
    await clearAllInputs(
      user,
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      messageInput
    );

    // type valid inputs
    await user.type(firstNameInput, "testFirst");
    await user.type(lastNameInput, "testLast");
    await user.type(phoneInput, "0421839976");
    await user.type(messageInput, "testMessage");

    // incorrect email
    await user.type(emailInput, "ellatest");
    await user.click(submitButton);

    // check error
    const emailError = await screen.findByText(/Please enter a valid email/i);
    expect(emailError).toBeInTheDocument();

    // correct email
    await user.clear(emailInput);
    await user.type(emailInput, "ellatest@gmail.com");
    await user.click(submitButton);

    const thankYouMessage = await screen.findAllByText(/Thank you/i);
    const feedbackMessage = await screen.findByText(
      /We'll be in touch shortly./i
    );
    expect(thankYouMessage).toHaveLength(2);
    expect(feedbackMessage).toBeInTheDocument();
  });

  test("phone number validation", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    // get all inputs
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      messageInput,
      submitButton,
    } = getInputs();

    // clear inputs
    await clearAllInputs(
      user,
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      messageInput
    );

    // type valid inputs
    await user.type(firstNameInput, "testFirst");
    await user.type(lastNameInput, "testLast");
    await user.type(emailInput, "ellatest@gmail.com");
    await user.type(messageInput, "testMessage");

    // incorrect phone number
    await user.type(phoneInput, "invalidNumber");
    await user.click(submitButton);

    // check error
    const phoneError = await screen.findByText(/Please enter a valid phone/i);
    expect(phoneError).toBeInTheDocument();

    // correct phone number
    await user.clear(phoneInput);
    await user.type(phoneInput, "0421839976");
    await user.click(submitButton);

    // check thank you message
    const thankYouMessage = await screen.findAllByText(/Thank you/i);
    const feedbackMessage = await screen.findByText(
      /We'll be in touch shortly./i
    );
    expect(thankYouMessage).toHaveLength(2);
    expect(feedbackMessage).toBeInTheDocument();
  });

  test("check all input fields, focus on empty field if fireld is empty", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // get all inputs
    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      messageInput,
      submitButton,
    } = getInputs();

    await clearAllInputs(
      user,
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      messageInput
    );

    // all inputs empty
    await user.click(submitButton);
    expect(firstNameInput).toHaveFocus();

    // first name empty
    await user.type(lastNameInput, "testLast");
    await user.type(emailInput, "ellatest@gmail.com");
    await user.type(phoneInput, "0421839976");
    await user.type(messageInput, "testMessage");
    await user.click(submitButton);
    expect(firstNameInput).toHaveFocus();

    // last name empty
    await clearAllInputs(
      user,
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      messageInput
    );

    await user.type(firstNameInput, "testFirst");
    await user.type(emailInput, "ellatest@gmail.com");
    await user.type(phoneInput, "0421839976");
    await user.type(messageInput, "testMessage");
    await user.click(submitButton);
    expect(lastNameInput).toHaveFocus();

    // email empty
    await clearAllInputs(
      user,
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      messageInput
    );

    await user.type(firstNameInput, "testFirst");
    await user.type(lastNameInput, "testLast");
    await user.type(phoneInput, "0421839976");
    await user.type(messageInput, "testMessage");
    await user.click(submitButton);
    expect(emailInput).toHaveFocus();

    // phone number empty
    await clearAllInputs(
      user,
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      messageInput
    );

    await user.type(firstNameInput, "testFirst");
    await user.type(lastNameInput, "testLast");
    await user.type(emailInput, "ellatest@gmail.com");
    await user.type(messageInput, "testMessage");
    await user.click(submitButton);
    expect(phoneInput).toHaveFocus();

    // message empty
    await clearAllInputs(
      user,
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      messageInput
    );

    await user.type(firstNameInput, "testFirst");
    await user.type(lastNameInput, "testLast");
    await user.type(emailInput, "ellatest@gmail.com");
    await user.type(phoneInput, "0421839976");
    await user.click(submitButton);
    expect(messageInput).toHaveFocus();
  });

  test("creates a contact successfully", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      messageInput,
      submitButton,
    } = getInputs();

    await clearAllInputs(
      user,
      firstNameInput,
      lastNameInput,
      emailInput,
      phoneInput,
      messageInput
    );

    await user.type(firstNameInput, "testFirst");
    await user.type(lastNameInput, "testLast");
    await user.type(emailInput, "ellatest@gmail.com");
    await user.type(phoneInput, "0421839976");
    await user.type(messageInput, "testMessage");

    await user.click(submitButton);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:9000/contact",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: "testFirst",
          last_name: "testLast",
          email: "ellatest@gmail.com",
          phone: "0421839976",
          message: "testMessage",
        }),
      })
    );

    const thankYouMessage = await screen.findAllByText(/Thank you/i);
    const feedbackMessage = await screen.findByText(
      /We'll be in touch shortly./i
    );
    expect(thankYouMessage).toHaveLength(2);
    expect(feedbackMessage).toBeInTheDocument();

    global.fetch.mockClear();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactDetail from "../ContactInfo";
import ContactForm from "../ContactInfo";
import { describe, expect } from "vitest";

describe("ContectDetail test", () => {
  test("renders contact details correctly", () => {
    render(<ContactDetail />);
    const welcomeText = screen.getByText(
      /Welcome to OpenAgent. We've been around since 2013, and our vision is to make it easy for people to buy, sell and own property/i
    );
    const introText = screen.getByText(
      /Here are the different ways you can contact us/i
    );
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
    expect(introText).toBeInTheDocument();
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
    const firstNameInput = screen.getByRole("textbox", { name: /first name/i });
    const lastNameInput = screen.getByRole("textbox", { name: /last name/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const phoneInput = screen.getByRole("textbox", { name: /phone/i });
    const messageInput = screen.getByRole("textbox", { name: /message/i });
    const submitButton = screen.getByRole("button", { name: /send message/i });
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
        ok: true,
        json: () => Promise.resolve({ id: 1 }),
      })
    );
  });

  afterEach(() => {
    global.fetch.mockClear();
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

    // check thank you message
    const thankYouMessage = await screen.findByText(/Thank you/i);
    const feedbackMessage = await screen.findByText(
      /Thank you for your feedback. We'll be in touch shortly./i
    );
    expect(thankYouMessage).toBeInTheDocument();
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
    const phoneError = await screen.findByText(
      /Please enter a valid phone number/i
    );
    expect(phoneError).toBeInTheDocument();

    // correct phone number
    await user.clear(phoneInput);
    await user.type(phoneInput, "0421839976");
    await user.click(submitButton);

    // check thank you message
    const thankYouMessage = await screen.findByText(/Thank you/i);
    const feedbackMessage = await screen.findByText(
      /Thank you for your feedback. We'll be in touch shortly./i
    );
    expect(thankYouMessage).toBeInTheDocument();
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

    await user.type(firstNameInput, "test");
    await user.type(lastNameInput, "test");
    await user.type(emailInput, "test@example.com");
    await user.type(phoneInput, "1234567890");
    await user.type(messageInput, "test");

    await user.click(submitButton);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/contacts",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: "test",
          last_name: "test",
          email: "test@example.com",
          phone: "1234567890",
          message: "test",
        }),
      })
    );

    const thankYouMessage = await screen.findByText(/Thank you/i);
    expect(thankYouMessage).toBeInTheDocument();

    global.fetch.mockClear();
  });
});

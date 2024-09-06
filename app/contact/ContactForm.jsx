"use client";

import React from "react";
import { useState, useRef } from "react";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";
import ContactThankyou from "./ContactThankyou";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Refs for each input field
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const messageRef = useRef(null);

  // email validation
  const emailValidate = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const phoneValidate = (num) => {
    const phoneRegex = /^(\(0[2-9]\)|0[2-9])\d{8}$/;
    return phoneRegex.test(num);
  };

  // handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      setEmailError(!emailValidate(value));
    }
    if (name === "phone") {
      setPhoneError(!phoneValidate(value));
    }
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName) {
      firstNameRef.current?.focus();
      return;
    }

    if (!formData.lastName) {
      lastNameRef.current?.focus();
      return;
    }

    if (!formData.email || emailError) {
      emailRef.current?.focus();
      return;
    }

    if (!formData.phone || phoneError) {
      phoneRef.current?.focus();
      return;
    }

    if (!formData.message) {
      messageRef.current?.focus();
      return;
    }
    try {
      const response = await fetch("http://localhost:9000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (response.ok) {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
          });
          setSubmitted(true);
        } else {
          console.error("Error creating contact:", data.error);
        }
      } else {
        console.error("Expected JSON response but got:", contentType);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  if (submitted) {
    return <ContactThankyou />;
  }
  return (
    <div className="bg-gray-100 min-h-lvh p-10 ">
      <p className="text-base font-medium mb-4">
        Fill in your details and we&apos;ll be in touch right away. Or if you
        prefer, call us on 13 24 34
      </p>
      <FormField
        name="firstName"
        type="text"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First name"
        ref={firstNameRef}
      />
      <FormField
        name="lastName"
        type="text"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last name"
        ref={lastNameRef}
      />
      <FormField
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email address"
        error={emailError}
        ref={emailRef}
      />
      <FormField
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone number"
        error={phoneError}
        ref={phoneRef}
      />
      <FormField
        name="message"
        type="text"
        value={formData.message}
        onChange={handleChange}
        placeholder="What do you want to speak to us about"
        ref={messageRef}
      />
      <SubmitButton onClick={handleSubmit}>SEND MESSAGE</SubmitButton>
      <p className="text-sm">
        By sending a message you agree to the
        <a
          href="#"
          className="text-green-600 underline hover:text-green-700 ml-1 mr-1"
        >
          Terms and Conditions
        </a>
        and
        <a
          href="#"
          className="text-green-600 underline hover:text-green-700 ml-1"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  );
}

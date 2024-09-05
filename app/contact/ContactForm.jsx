"use client";

import React from "react";
import { useState } from "react";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";

export default function ContactForm() {
  return (
    <div className="bg-gray-100 min-h-lvh p-10 ">
      <p className="text-base font-medium mb-4">
        Fill in your details and we&apos;ll be in touch right away. Or if you
        prefer, call us on 13 24 34
      </p>
      <FormField
        name="first name"
        type="text"
        value=""
        onChange={() => {}}
        placeholder="First name"
      />
      <FormField
        name="last name"
        type="text"
        value=""
        onChange={() => {}}
        placeholder="Last name"
      />
      <FormField
        name="email"
        type="email"
        value=""
        onChange={() => {}}
        placeholder="Email address"
      />
      <FormField
        name="phone"
        type="tel"
        value=""
        onChange={() => {}}
        placeholder="Phone number"
      />
      <FormField
        name="message"
        type="text"
        value=""
        onChange={() => {}}
        placeholder="What do you want to speak to us about"
      />
      <SubmitButton>SEND MESSAGE</SubmitButton>
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
        .
      </p>
    </div>
  );
}

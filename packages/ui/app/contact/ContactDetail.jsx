"use client";

import React from "react";
import ContactInfo from "./ContactInfo";

export default function ContactDetail() {
  return (
    <div>
      <p className="text-base font-medium mb-4">
        Welcome to OpenAgent. We&apos;ve been around since 2013, and our vision
        is to make it easy for people to buy, sell and own property.
      </p>
      <p className="text-base font-medium mb-4">
        Here are the different ways you can contact us
      </p>
      <ContactInfo title="Contact Us Details">
        <p className="text-base mb-1">Phone: 13 24 34</p>
        <p className="text-base mb-4">Email: support@openagent.com.au</p>
      </ContactInfo>
      <ContactInfo title="Postal Address:">
        <p className="text-base mb-4">PO Box 419, Alexandria NSW 1435</p>
      </ContactInfo>
      <ContactInfo title="Contact centre hours of operation">
        <p className="text-base">Monday - Friday 8:30 - 5:00</p>
      </ContactInfo>
    </div>
  );
}

"use client";
import ContactDetail from "./ContactDetail";
import ContactForm from "./ContactForm";
export default function ContactUs() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-7 px-36 py-6">
      <div className="w-full md:w-1/2">
        <ContactDetail />
      </div>
      <div className="w-full md:w-1/2">
        <ContactForm />
      </div>
    </div>
  );
}

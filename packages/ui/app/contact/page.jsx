"use client";
import Footer from "../utilities/Footer";
import Header from "../utilities/Header";
import Title from "../utilities/Title";
import ContactUs from "./ContactUs";

export default function Contact() {
  return (
    <div>
      <Header />
      <main>
        <Title px="px-6 md:px-16 lg:px-24 xl:px-36" py="pt-10">
          Contact us, we love to hear from you
        </Title>
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
}

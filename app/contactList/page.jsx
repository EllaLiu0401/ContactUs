"use client";
import ContactTable from "./ContactTable";

const mockContact = [
  {
    id: 1,
    first_name: "testFirst",
    last_name: "testLast",
    email: "ellatONG0515@gmail.com",
    phone: "0421839976",
    message: "testMessage",
    verified: 0,
    created_at: "2024-09-06 14:07:26",
  },
  {
    id: 2,
    first_name: "testFirst",
    last_name: "testLast",
    email: "ellatest@gmail.com",
    phone: "0421839976",
    message:
      "testMessageskdfhkdsfksdfhskdjfhkjshdfjksdhfkjshjkfdhjkaksjdhajsdkahsdjkashdkjashjkdhsjkahdjak",
    verified: 0,
    created_at: "2024-09-06 14:07:26",
  },
  {
    id: 2,
    first_name: "testFirst",
    last_name: "testLast",
    email: "ellatest@gmail.com",
    phone: "0421839976",
    message:
      "testMessageskdfhkdsfksdfhskdjfhkjshdfjksdhfkjshjkfdhjkaksjdhajsdkahsdjkashdkjashjkdhsjkahdjak",
    verified: 0,
    created_at: "2024-09-06 14:07:26",
  },
  {
    id: 2,
    first_name: "testFirst",
    last_name: "testLast",
    email: "ellatest@gmail.com",
    phone: "0421839976",
    message:
      "testMessageskdhfkjshjkfdhjkaksjdhajsdkahsdjkashdkjashjkdhsjkahdjak",
    verified: 0,
    created_at: "2024-09-06 14:07:26",
  },
  {
    id: 2,
    first_name: "testFirst",
    last_name: "testLast",
    email: "ellatest@gmail.com",
    phone: "0421839976",
    message:
      "testMessageskdfjshdfjksdhfkjshjkfdhjkaksjdhajsdkahsdjkashdkjashjkdhsjkahdjak",
    verified: 0,
    created_at: "2024-09-06 14:07:26",
  },
];
export default function ContactUs() {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-36 py-6 ">
      <h1 className="text-4xl text-left font-bold py-6">Contact List</h1>
      <ContactTable contacts={mockContact} />
    </div>
  );
}

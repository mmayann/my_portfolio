import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs.init("quFjNnomi6gi-Co7l"); 
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
        )
        .then((result) => {
          console.log(result.text);
   
          setName("");
          setEmail("");
          setMessage("");
        })
        .catch((error) => {
          console.log(error.text);

        });
    }
  };

  return (
    <section id="contact" className="bg-gray-100 px-8 py-20">
      <h2 className="text-3xl font-bold mb-4 text-center font-gray-700">
        Contact
      </h2>
      <form
        ref={form}
        className="grid items-center justify-center"
        onSubmit={sendEmail}
      >
        <div className="mb-4 mt-10">
          <label htmlFor="name" className="block">
            name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border-b border-gray-500 bg-gray-100 p-2 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="user_name"
          />
        </div>
        <div className="mb-4 mt-10">
          <label htmlFor="email" className="block">
            email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border-b border-gray-500 bg-gray-100 p-2 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="user_email"
          />
        </div>
        <div className="mb-4 mt-10 w-96">
          <label htmlFor="message" className="block">
            message
          </label>
          <textarea
            id="message"
            className="w-full border-b border-gray-500 p-2 focus:outline-none resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
          />
        </div>
        <div className="grid items-center justify-center mt-12">
          <button
            type="submit"
            className="bg-gray-300 text-gray-800 px-10 py-2 w-64 mx-auto rounded transition-colors duration-300 ease-in-out hover:bg-gray-400 active:bg-gray-500"
          >
            send
          </button>
        </div>
      </form>
    </section>
  );
}

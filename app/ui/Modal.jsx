"use client";

import React, { useEffect, useState } from "react";

const Modal = ({ showModal, setShowModal, children }) => {
  const [visible, setVisible] = useState(showModal);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (showModal) {
      setVisible(true);
      setAnimationClass("modal-open");
    } else {
      setAnimationClass("modal-close");
    }
  }, [showModal]);

  const handleAnimationEnd = () => {
    if (!showModal) {
      setVisible(false);
    }
  };

  return (
    <>
      {visible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50 transition-opacity duration-300"
          onAnimationEnd={handleAnimationEnd}
        >
          <div
            className={`relative w-auto max-w-3xl mx-auto my-6 ${animationClass}`}
          >
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
                <h3 className="text-3xl font-semibold">Modal Title</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">{children}</div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

// example usage:

/* const fields = [
  {
    name: "username",
    type: "text",
    label: "Username",
    placeholder: "Enter your username",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
  },
  {
    name: "age",
    type: "number",
    label: "Age",
    placeholder: "Enter your age",
  },
  {
    name: "gender",
    type: "select",
    label: "Gender",
    options: [
      { value: "", label: "Select gender" },
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
]; */

/* const onSubmit = (data) => {
  console.log(data);
}; */

"use client";

import { Fragment } from "react";
import {
  Transition,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(inputs.join(" "));
}

const CloseIcon = () => (
  <>
    <span className="sr-only">Close menu</span>
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </>
);

const Drawer = ({ children, open, setOpen, title }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <TransitionChild
          as="div"
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 bg-gray-800/75 transition-opacity"
        />

        <TransitionChild
          as="div"
          enter="transform transition ease-in-out duration-300 sm:duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-300 sm:duration-300"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
          className="fixed inset-0 h-full overflow-hidden"
        >
          <DialogPanel
            className={cn(
              "pointer-events-auto w-screen h-full max-w-xs",
              "bg-gray-800 text-white"
            )}
          >
            <div className="h-full flex flex-col py-6 bg-gray-100 shadow-xl overflow-y-scroll">
              <div className="px-4 flex items-center justify-between gap-2 sm:px-6">
                <DialogTitle className="text-3xl font-bold text-gray-600">
                  {title}
                </DialogTitle>
                <button
                  onClick={() => setOpen(false)}
                  className="transition-all text-gray-600 hover:text-red-600 rounded-md p-1 inline-flex items-center justify-center"
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="relative mt-6 flex-1 px-4 sm:px-6">
                {children}
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default Drawer;

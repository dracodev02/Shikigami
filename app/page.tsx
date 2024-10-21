"use client";
import { useEffect, useState } from "react";

enum ToastTypeEnum {
  SUCCESS = "success",
  ERROR = "error",
}

type ToastType = ToastTypeEnum.SUCCESS | ToastTypeEnum.ERROR;

const Toast = ({ message, type }: { message?: string; type?: ToastType }) => {
  return (
    <div
      id="toast-default"
      className="flex absolute animate-show-toast opacity-0 top-10 items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 z-10"
    >
      {type == ToastTypeEnum.SUCCESS ? (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="sr-only">Check icon</span>
        </div>
      ) : (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
          </svg>
          <span className="sr-only">Warning icon</span>
        </div>
      )}

      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-default"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

interface ToastProps {
  message: string;
  type: ToastType;
}

export default function Home() {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [toastProps, setToastProps] = useState<ToastProps>();
  const [isShowToast, setIsShowToast] = useState(false);
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);
  const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbzGESsk6VuzJRrZVGAEthzybdA7_0bPgyeveGKvE-gtR4hSA4tt5mM8rt3blG6Pjqwm/exec";

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailValidator.test(e.target.value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const checkEmailExists = (email: string, emails: string[]) => {
    if (emails.indexOf(email) !== -1) {
      return true;
    }
    return false;
  };

  const showToast = (message: string, type: ToastType) => {
    setToastProps({
      message: message,
      type: type,
    });
    setIsShowToast(true);
  };

  const getWaitList = () => {
    fetch(scriptURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEmails(data.data); // Adjust based on your response structure
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSubmit = async () => {
    setIsLoadingSubmit(true);

    if (checkEmailExists(email, emails)) {
      setIsLoadingSubmit(false);
      setToastProps({
        message: "Email already exists!",
        type: ToastTypeEnum.ERROR,
      });
      return;
    }
    const formData = new FormData();
    formData.append("Email", email);
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });

      setIsLoadingSubmit(false);
      if (response.ok) {
        emails.push(email);
        showToast(
          "Added email to waitlist successfully!",
          ToastTypeEnum.SUCCESS
        );
      } else {
        showToast(
          "Having some problems, please try again later!",
          ToastTypeEnum.ERROR
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        showToast(
          "Having some problems, please try again later!",
          ToastTypeEnum.ERROR
        );
      } else {
        showToast(
          "Having some problems, please try again later!",
          ToastTypeEnum.ERROR
        );
      }
    }
  };

  useEffect(() => {
    getWaitList();
  }, []);

  useEffect(() => {
    if (isShowToast) {
      setTimeout(() => {
        setIsShowToast(false);
      }, 5000);
    }
  }, [showToast]);

  useEffect(() => {
    console.log(emails);
  }, [emails]);

  return (
    <div className="flex w-full h-screen justify-center items-center">
      {isShowToast && (
        <Toast message={toastProps?.message} type={toastProps?.type} />
      )}
      <div className="relative flex items-center flex-col">
        <div className="relative w-[450px] max-md:w-[300px] max-w-[95%] group z-[1] mr-4">
          <img
            src="meow.png"
            className="w-full h-auto group-hover:scale-110 transition-all duration-300"
          />
          <img
            src="meow-light.png"
            className="w-full h-auto absolute top-0 left-0 drop-shadow-meow group-hover:scale-110 transition-all duration-300 group-hover:opacity-100 opacity-0"
          />
        </div>
        <div className="relative w-[450px] md:h-[200px] max-md:w-[350px] -mt-20">
          <div className="w-[96%] mx-auto h-full max-md:py-10 bg-[#EE1939] border-4 border-black rounded-[20px] px-6 flex flex-col justify-center">
            <p className="font-extrabold">Join the Shikigami waitlist</p>
            <p className="">Sign up to collect limited edition NFTs</p>
            <div className="bg-white px-4 py-3 rounded mt-4 flex justify-between gap-4">
              <input
                value={email}
                onChange={handleChangeEmail}
                className="focus:outline-none text-black bg-transparent flex-1"
                type="text"
                placeholder="meow@shikigami.com"
              />
              <button
                onClick={handleSubmit}
                className={`text-black font-extrabold active:scale-95 transition-all duration-300 ${
                  !isValid && "hidden"
                } `}
              >
                Join
              </button>
            </div>
          </div>
          <div className="absolute w-full h-full top-2 left-1/2 -translate-x-1/2 bg-white border-4 border-black rounded-3xl -z-[1]"></div>
        </div>
      </div>
    </div>
  );
}

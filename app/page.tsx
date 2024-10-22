"use client";
import addEmail from "@/api/addEmail";
import getAllEmails from "@/api/getAllEmails";
import { useEffect, useState } from "react";

enum ToastTypeEnum {
  SUCCESS = "success",
  ERROR = "error",
}

type ToastType = ToastTypeEnum.SUCCESS | ToastTypeEnum.ERROR;

const Toast = ({
  message,
  type,
  setIsShowToast,
}: {
  message?: string;
  type?: ToastType;
  setIsShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      id="toast-default"
      className={`flex absolute animate-show-toast opacity-0 top-10 items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 z-10 ${
        type === ToastTypeEnum.SUCCESS
          ? "border-l-4 border-green-500"
          : "border-l-4 border-orange-500"
      }`}
    >
      {type === ToastTypeEnum.SUCCESS ? (
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          {/* Icon Success */}
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
          {/* Icon Error */}
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
        onClick={() => setIsShowToast(false)}
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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
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

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailValidator.test(e.target.value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const checkEmailExists = (email: string, emails: string[]) => {
    return emails
      .map((email) => email?.toLowerCase())
      .includes(email.toLowerCase());
  };

  const showToast = (message: string, type: ToastType) => {
    setToastProps({
      message: message,
      type: type,
    });
    setIsShowToast(true);
  };

  const getWaitList = async () => {
    const emails = await getAllEmails();
    console.log(emails);
    setEmails(emails);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checkEmailExists(email, emails)) {
      showToast("Email already exists!", ToastTypeEnum.ERROR);
      return;
    }
    try {
      setIsLoadingSubmit(true);
      await addEmail(email);
      setIsLoadingSubmit(false);
      setEmails([...emails, email]);
      showToast("Added email to waitlist successfully!", ToastTypeEnum.SUCCESS);
    } catch (error) {
      setIsLoadingSubmit(false);
      console.error("Error adding email:", error);
      showToast(
        "Having some problems, please try again later!",
        ToastTypeEnum.ERROR
      );
    }
  };

  useEffect(() => {
    getWaitList();
  }, []);

  useEffect(() => {
    if (isShowToast) {
      const timer = setTimeout(() => {
        setIsShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isShowToast]);

  return (
    <div className="flex w-full h-screen justify-center items-center">
      {isShowToast && (
        <Toast
          message={toastProps?.message}
          type={toastProps?.type}
          setIsShowToast={setIsShowToast}
        />
      )}
      <div className="relative flex items-center flex-col">
        <div className="relative w-[450px] max-md:w-[300px] max-w-[95%] group z-[1] mr-4">
          <img
            src="meow.png"
            className="w-full h-auto group-hover:scale-110 transition-all duration-300"
            alt="Meow"
          />
          <img
            src="meow-light.png"
            className="w-full h-auto absolute top-0 left-0 drop-shadow-meow group-hover:scale-110 transition-all duration-300 group-hover:opacity-100 opacity-0"
            alt="Meow Light"
          />
        </div>
        <div className="relative w-[450px] md:h-[200px] max-md:w-[330px] -mt-20">
          <div className="w-[96%] mx-auto h-full max-md:py-10 bg-[#EE1939] border-4 border-black rounded-[20px] px-6 max-md:px-3 flex flex-col justify-center">
            <p className="font-extrabold text-2xl max-md:text-xl">
              Join the Shikigami waitlist
            </p>
            <p className="">Sign up to collect limited edition NFTs</p>
            <form
              onSubmit={handleSubmit}
              className="bg-white px-4 py-3 rounded mt-4 flex justify-between items-center gap-4"
            >
              <input
                value={email}
                onChange={handleChangeEmail}
                className="focus:outline-none text-black bg-transparent flex-1"
                type="email"
                placeholder="meow@shikigami.com"
                required
              />
              {isLoadingSubmit ? (
                <div className="w-5 h-5">
                  <img src="loading.svg" />
                </div>
              ) : (
                <button
                  type="submit"
                  className={`text-black font-extrabold active:scale-95 transition-all duration-300 ${
                    !isValid ? "hidden" : ""
                  }`}
                  disabled={!isValid || isLoadingSubmit}
                >
                  {isLoadingSubmit ? "Joining..." : "Join"}
                </button>
              )}
            </form>
          </div>
          <div className="absolute w-full h-full top-2 left-1/2 -translate-x-1/2 bg-white border-4 border-black rounded-3xl -z-[1]"></div>
        </div>
      </div>
    </div>
  );
}

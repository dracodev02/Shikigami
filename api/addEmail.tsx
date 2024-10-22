const addEmail = async (email: string) => {
  const emails = await fetch(process.env.NEXT_PUBLIC_API_URL + "/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await emails.json();
  return data;
};

export default addEmail;

const getAllEmails = async () => {
  const emails = await fetch(process.env.NEXT_PUBLIC_API_URL + "/emails", {
    method: "GET",
    headers: {
      contentType: "application/json",
    },
  });
  const data = await emails.json();
  return data;
};

export default getAllEmails;

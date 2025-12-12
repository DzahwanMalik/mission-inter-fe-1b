const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied!");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

export default copyText;

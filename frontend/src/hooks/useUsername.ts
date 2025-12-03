import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const useUser = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return ctx;
};

export default useUser;

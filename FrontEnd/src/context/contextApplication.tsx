import React, { useState } from "react";

const ContextApplication = React.createContext({
  isAuthenticate: false,
  setIsAuthenticate: (value: boolean) => {},
});

export const Application: React.FC = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  React.useEffect(() => {
    localStorage.getItem("jwt") && setIsAuthenticate(true);
  });

  return (
    <ContextApplication.Provider value={{ isAuthenticate, setIsAuthenticate }}>
      {children}
    </ContextApplication.Provider>
  );
};
export { ContextApplication };

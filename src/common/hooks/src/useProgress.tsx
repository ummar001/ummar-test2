import { LinearProgress } from "@mui/material";
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

interface IProgressContextProps {
  toggleLoading: (value: boolean) => void
}

const ProgressContext = createContext<IProgressContextProps>(
  {} as IProgressContextProps
);

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = (value: boolean) => {
    setIsLoading(value);
  };

  return (
    <ProgressContext.Provider value={{ toggleLoading }}>
      {isLoading && (
        <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 9999 }}>
          <LinearProgress
            sx={{
              barColorPrimary: {
                backgroundColor: "#FF5E5B",
              },
            }}
          />
        </div>
      )}
      {children}
    </ProgressContext.Provider>
  );
};

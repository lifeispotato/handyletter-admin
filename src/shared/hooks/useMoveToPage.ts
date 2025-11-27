import { useNavigate } from "react-router-dom";

interface NavigateOptions {
  replace?: boolean;
  state?: unknown;
}

const useMoveToPage = () => {
  const navigate = useNavigate();

  const moveToPage = (
    path: string | number,
    func?: () => void,
    params?: NavigateOptions
  ) => {
    if (func) {
      setTimeout(() => func(), 0);
    }

    if (typeof path === "number") {
      navigate(path);
    } else {
      navigate(path, params);
    }
  };

  return {
    moveToPage,
  };
};

export default useMoveToPage;

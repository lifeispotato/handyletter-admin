import { FadeLoader } from "react-spinners";

const LoadingSpinner: React.FC = () => {
  return (
    <div
      className="fixed inset-0 w-screen h-screen z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <FadeLoader
          color="#27beff"
          height={15}
          width={5}
          radius={2}
          margin={2}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;

import { getRecoil } from "recoil-nexus";
import { apiState } from "../../../store/apiState";
import PretendardText from "../../atoms/text/PretendardText";

const LoadingSpinner = () => {
  const isLoading = getRecoil(apiState);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <PretendardText className="text-white text-lg font-semibold">
          잠시만 기다려주세요...
        </PretendardText>
      </div>
    </div>
  );
};

export default LoadingSpinner;

import PretendardText from "../text/PretendardText";
import useStartAuth from "../../../hooks/useStartAuth";
import { cn } from "../../../../shared/utils/style";

interface PassButtonProps {
  className?: string;
  title: string;
}

export interface ParsedDataType {
  data: {
    res_cd: string;
    res_msg: string;
    up_hash: string;
    kcp_merchant_time: string;
    kcp_cert_lib_ver: string;
  };
  site_cd: string;
  ordr_idxx: string;
  web_siteid: string;
  web_siteid_hashYN: string;
}

const PassButton: React.FC<PassButtonProps> = ({ className = "" }) => {
  const { startAuth } = useStartAuth();

  return (
    <div
      onClick={() => {
        startAuth();
      }}
      className={cn([
        `mt-[30px] w-full h-[160px]
      flex items-center justify-center flex-col
     bg-pass rounded-[10px] cursor-pointer`,
        className,
      ])}
    >
      <img
        className={cn(["mb-[16px]"])}
        style={{}}
        src={"/assets/admin/icons/pass.svg"}
        alt={"pass"}
      />

      <PretendardText className={cn(["text-white", "text-[20px] font-bold"])}>
        본인 인증
      </PretendardText>
    </div>
  );
};

export default PassButton;

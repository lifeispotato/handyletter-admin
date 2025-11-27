import PretendardText from "../../shared/components/atoms/text/PretendardText";

const NotFound = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-[40px]">
      <img
        className="w-[128px] h-[128px]"
        src="/assets/admin/icons/404.svg"
        alt=""
      />
      <PretendardText
        className={"text-[36px] font-medium leading-[21.5px] text-black"}
      >
        요청하신 페이지를 찾을 수 없습니다.
      </PretendardText>
    </div>
  );
};

export default NotFound;

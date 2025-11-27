import DetailInfoTitle from "@/shared/components/atoms/text/DetailInfoTitle";
import PretendardText from "../../../../shared/components/atoms/text/PretendardText";
import classNameMerge from "../../../../shared/utils/classNameMerge";
import HomeDailySalesChart from "../organisms/HomeDailySalesChart";
const HomeLayout = () => {
  return (
    <>
      <section className="flex flex-col gap-[20px] mb-[40px]">
        <div className="w-full flex justify-between items-end">
          <div className="flex flex-col gap-2 w-full">
            <DetailInfoTitle className="text-[20px]">Welcome!</DetailInfoTitle>
            <PretendardText
              className={classNameMerge([
                "!font-bold !text-[40px] !leading-[46px]",
                "!tracking-[-0.3%] !text-gray-700",
              ])}
            >
              안녕하세요. 관리자님 :)
            </PretendardText>
          </div>
          <div className="bg-[#F2F4F5] flex justify-between rounded-[6px] p-2 min-w-fit ">
            <div className="flex  gap-2">
              <DetailInfoTitle className="min-w-fit w-full ">
                전체 사용자 수
              </DetailInfoTitle>
              <div className="h-full w-px bg-gray-400"></div>
              <DetailInfoTitle className="min-w-fit w-full ">
                000명
              </DetailInfoTitle>
            </div>
            <div className="flex  gap-2">
              <DetailInfoTitle className="min-w-fit w-full ">
                회원(가입/탈퇴)
              </DetailInfoTitle>
              <div className="h-full w-px bg-gray-400"></div>
              <DetailInfoTitle className="min-w-fit w-full ">
                0000/000
              </DetailInfoTitle>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-[20px] mb-[20px]">
        <PretendardText
          className={classNameMerge([
            "!font-bold !text-[16px] !leading-[22px]",
            "!tracking-[-0.3%] !text-gray-700",
          ])}
        >
          방문자 통계
        </PretendardText>
        <HomeDailySalesChart />
      </section>
      <section className="flex flex-col gap-[20px] mb-[20px]">
        <PretendardText
          className={classNameMerge([
            "!font-bold !text-[16px] !leading-[22px]",
            "!tracking-[-0.3%] !text-gray-700",
          ])}
        >
          이메일 오픈율
        </PretendardText>
        <HomeDailySalesChart />
      </section>
    </>
  );
};

export default HomeLayout;

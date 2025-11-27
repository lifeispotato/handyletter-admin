import moment from "moment";
import DetailBox from "../../../../shared/components/atoms/layout/detailPage/DetailBox";
import classNameMerge from "../../../../shared/utils/classNameMerge";
import { formatNumberWithCommas } from "../../../../shared/utils/formatNum";
import IconButton from "../../../../shared/components/molecules/button/IconButton";
import useHomeDailyVisitCount from "../../hooks/useHomeDailyVisitCount";

const HomeDailyVisitCount = () => {
  const { visitCount, visitDate, setVisitDate } = useHomeDailyVisitCount();

  return (
    <DetailBox className="w-[1044px] p-[30px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[24px]">
          <p
            className={classNameMerge([
              "font-sans !font-semibold !text-[15px]",
              "!leading-[22px] text-gray-500",
            ])}
          >
            일일 방문자 수
          </p>
          <div className="flex items-end gap-[6px]">
            <p
              className={classNameMerge([
                "font-sans !font-semibold !text-[40px]",
                "!leading-[100%] text-gray-700",
              ])}
            >
              {formatNumberWithCommas(visitCount)}
            </p>
            <p
              className={classNameMerge([
                "font-sans !font-medium !text-[14px]",
                "!leading-[22.75px] !tracking-[-0.3%] text-black",
              ])}
            >
              명
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[24px]">
          <p
            className={classNameMerge([
              "font-sans !font-normal !text-[15px]",
              "!leading-[21.25px] text-gray-500",
            ])}
          >
            {moment(visitDate).format("YYYY-MM-DD")}
          </p>
          <IconButton
            className="w-[28px] h-[28px] rotate-90"
            imgSrc="/assets/admin/icons/ic_arrow_gray_down.png"
            alt="왼쪽으로"
            onClick={() => {
              setVisitDate(moment(visitDate).subtract(1, "day").toDate());
            }}
          />
          <IconButton
            className="w-[28px] h-[28px] rotate-270"
            imgSrc="/assets/admin/icons/ic_arrow_gray_down.png"
            alt="오른쪽으로"
            onClick={() => {
              const nextDate = moment(visitDate).add(1, "day");
              if (nextDate.isSameOrBefore(moment(), "day")) {
                setVisitDate(nextDate.toDate());
              }
            }}
          />
        </div>
      </div>
    </DetailBox>
  );
};

export default HomeDailyVisitCount;

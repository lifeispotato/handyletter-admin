import { cn } from "../../lib/utils";

interface MarketCardProps {
  title: string;
  imageUrl: string;
  discount: number;
  price: number;
  type: string;
  location: string;
  className?: string;
  onClick?: () => void;
}

export const MarketCard = ({
  title,
  imageUrl,
  discount,
  price,
  type,
  location,
  className,
  onClick,
}: MarketCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        // Dimensions & Base Style
        "relative w-[293px] cursor-pointer group",
        className
      )}
    >
      {/* 1. Background Image */}
      <div className="rounded-[10px] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="aspect-square object-cover rounded-[10px] transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* 3. Content Container (Padding 24px) */}
      <div className="flex flex-col justify-between mt-[12px]">
        {/* --- TOP ROW: Badge & Heart --- */}
        <div className="flex items-start justify-between">
          {/* Badge (Only renders if text provided) */}
        </div>

        {/* --- BOTTOM ROW: Text Info --- */}
        <div className="flex flex-col gap-1">
          {/* Title */}
          <h3 className="font-sans font-semibold text-[16px] leading-[30px] text-gray-7 line-clamp-2">
            {title}
          </h3>

          {/* price */}
          <p className="font-sans text-[15px] text-error">
            {type} | {location}
          </p>
          <div className="flex gap-1 items-center">
            <p className="font-sans text-[15px] text-error font-medium">
              {discount}%
            </p>
            <p className="font-sans text-[15px] text-gray-5 font-medium line-through">
              {price.toLocaleString()}원
            </p>
            <p className="font-sans text-[20px] text-black font-semibold">
              {(price - (price * discount) / 100).toLocaleString()}원
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

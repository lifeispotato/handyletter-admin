import PretendardText from "../../atoms/text/PretendardText";

interface ProductCardProps {
  title: string;
  image: string;
}

const ProductCard = ({ title, image }: ProductCardProps) => {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="w-[48px] aspect-square bg-gray-200 rounded-[3px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-[3px]"
        />
      </div>
      <PretendardText className="font-normal text-[15px] text-gray-600">
        {title}
      </PretendardText>
    </div>
  );
};

export default ProductCard;

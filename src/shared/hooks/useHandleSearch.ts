import { useSearchParams } from "react-router-dom";

const useHandleSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (
    currentKeyword: string,
    setKeywordQuery: (keyword: string) => void
  ) => {
    if (!currentKeyword) {
      searchParams.delete("keyword");
      searchParams.delete("page");
      setSearchParams(searchParams);

      setKeywordQuery("");
      return;
    }

    searchParams.set("page", "1");
    searchParams.set("keyword", currentKeyword);
    setSearchParams(searchParams);

    setKeywordQuery(currentKeyword);
  };

  return { handleSearch };
};

export default useHandleSearch;

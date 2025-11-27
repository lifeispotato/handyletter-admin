import { ImageType } from "../types/data.types";
import { imgUrl, tempImgUrl } from "../constants/url";

interface TextEditorImgCleanerProps {
  detailContent: string;
  editorList: ImageType[];
}

export const textEditorImgCleaner = ({
  detailContent,
  editorList,
}: TextEditorImgCleanerProps) => {
  const tempImageUrls = new Set<string>();
  const processedDetailContent = (detailContent || "").replace(
    /<img[^>]+src="([^"]+)"/g,
    (match, src) => {
      const tempUrl = src.replace(tempImgUrl + "/", "");
      tempImageUrls.add(tempUrl);
      return match.replace(tempImgUrl, imgUrl);
    }
  );

  // editorList에서 사용되지 않는 이미지 제거
  const filteredEditorList = editorList.filter((editor) => {
    return tempImageUrls.has(editor.imageStoredName || "");
  });

  return { processedDetailContent, filteredEditorList };
};

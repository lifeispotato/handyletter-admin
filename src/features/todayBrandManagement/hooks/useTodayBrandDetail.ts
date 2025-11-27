import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import type { TodayBrandData } from "@/api/newsletter/todayBrand.types";
import { useLoadingStore } from "@/shared/store/useLoadingStore";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useTodayBrandDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const setLoading = useLoadingStore((state) => state.setLoading);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [todayBrandData, setTodayBrandData] = useState<TodayBrandData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        await sleep(600);
        
        // URL 경로를 기반으로 타입 판단
        let newsletterType: "TODAY_BRAND" | "SHORT_FORM" | "STORY" = "TODAY_BRAND";
        if (location.pathname.includes("/shortForm/")) {
          newsletterType = "SHORT_FORM";
        } else if (location.pathname.includes("/story/")) {
          newsletterType = "STORY";
        }
        
        if (newsletterType === "SHORT_FORM") {
          const mockData: TodayBrandData = {
            id: Number(id),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            title: "숏품 제목 숏품 제목 숏품 제목 숏품 제목",
            content: "",
            publishedAt: new Date().toISOString(),
            editorName: "",
            likeCount: 0,
            commentCount: 0,
            isHidden: false,
            newsletterType: "SHORT_FORM",
            videoContent: {
              thumbnail: "https://via.placeholder.com/90",
              fileName: "shortform_video.mp4",
              fileStoredName: "stored_shortform_video.mp4",
            },
          };
          setTodayBrandData(mockData);
          return;
        }

        if (newsletterType === "STORY") {
          const mockData: TodayBrandData = {
            id: Number(id),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            title: "영상 제목 영상 제목 영상 제목 영상 제목",
            content: "",
            publishedAt: new Date().toISOString(),
            editorName: "핸디에디터",
            likeCount: 0,
            commentCount: 0,
            isHidden: false,
            newsletterType: "STORY",
            videoContent: {
              thumbnail: "https://via.placeholder.com/90",
              fileName: "story_video.mp4",
              fileStoredName: "stored_story_video.mp4",
            },
          };
          setTodayBrandData(mockData);
          return;
        }

        const mockData: TodayBrandData = {
          id: Number(id),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          title: "제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목",
          content: "상세내용이 두 줄까지 들어갑니다. 상세내용이 두 줄까지 들어갑니다. 상세내용이 두 줄까지 들어갑니다. 상세내용이 두 줄까지 들어갑니다. 상세내용이 두 줄까지 들어갑니다. 상세내용이 두 줄까지 들어갑니다. 상세내용이 두 줄까지 들어갑니다. 상세...",
          publishedAt: new Date().toISOString(),
          editorName: "핸디에디터",
          likeCount: 123,
          commentCount: 45,
          isHidden: false,
          newsletterType: "TODAY_BRAND",
        };
        setTodayBrandData(mockData);
      } catch (error) {
        toast.error("데이터를 불러오는데 실패했습니다");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, location.pathname]);

  useEffect(() => {
    setLoading(isLoading || isPending);
  }, [isLoading, isPending, setLoading]);

  const handleDelete = async () => {
    if (!id) return;

    setIsPending(true);
    try {
      await sleep(1000);
      toast.success("삭제되었습니다");
    } catch (error) {
      toast.error("삭제에 실패했습니다");
    } finally {
      setIsPending(false);
    }
  };

  const handleToggleHidden = async () => {
    if (!id || !todayBrandData) return;

    setIsPending(true);
    try {
      await sleep(500);
      setTodayBrandData({
        ...todayBrandData,
        isHidden: !todayBrandData.isHidden,
      });
      toast.success(todayBrandData.isHidden ? "숨김 해제되었습니다" : "숨김 처리되었습니다");
    } catch (error) {
      toast.error("처리에 실패했습니다");
    } finally {
      setIsPending(false);
    }
  };

  return {
    todayBrandData,
    isLoading,
    isPending,
    handleDelete,
    handleToggleHidden,
  };
};

export default useTodayBrandDetail;


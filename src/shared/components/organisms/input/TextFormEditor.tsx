import { AxiosError } from "axios";
import BlotFormatter from "quill-blot-formatter";
import { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import commonApi from "../../../api/common.api";
import { tempImgUrl } from "../../../constants/url";
import { errorHandler } from "../../../utils/errorHandler";
import { cn } from "../../../utils/style";
import { ImageType } from "../../../types/data.types";

const Image = Quill.import("formats/image");

class CustomImageBlot extends Image {
  static create(
    value:
      | string
      | { src: string; style?: string; width?: string; height?: string }
  ) {
    const node = super.create(value);

    if (typeof value === "string") {
      node.setAttribute("src", value);
    }

    if (typeof value === "object") {
      node.setAttribute("src", value.src);
      if (value.style) node.setAttribute("style", value.style);
      if (value.width) node.setAttribute("width", value.width);
      if (value.height) node.setAttribute("height", value.height);
    }

    return node;
  }

  static value(node: HTMLElement) {
    return {
      src: node.getAttribute("src") || "",
      style: node.getAttribute("style") || "",
      width: node.getAttribute("width") || "",
      height: node.getAttribute("height") || "",
    };
  }
}

Quill.register(CustomImageBlot, true);
Quill.register("modules/blotFormatter", BlotFormatter);

const SizeStyle = Quill.import("attributors/style/size");
SizeStyle.whitelist = [
  "11px",
  "13px",
  "15px",
  "16px",
  "19px",
  "24px",
  "28px",
  "30px",
  "34px",
  "38px",
];
Quill.register(SizeStyle, true);

interface TextFormEditorProps {
  style?: React.CSSProperties;
  content: string;
  setContent: (value: string) => void;
  editorHeight?: string | number;
  maxHeight?: string | number;
  className?: string;
  imgList?: ImageType[];
  setImgList?: (
    value: ImageType[] | ((prev: ImageType[]) => ImageType[])
  ) => void;
}

const TextFormEditor: React.FC<TextFormEditorProps> = ({
  style,
  content,
  setContent,
  editorHeight = "200px",
  maxHeight = "600px",
  className,
  setImgList,
}) => {
  const quillRef = useRef<ReactQuill>(null);
  const { getFileUploadUrl, cloudFileUpload } = commonApi();

  const handleChange = (value: string) => {
    setContent(value);
  };

  const handleImage = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", "multiple");
    input.click();

    input.addEventListener("change", async () => {
      if (!input.files) return;

      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];

        try {
          const extension = file.name.split(".").pop()?.toLowerCase();
          if (!extension) throw new Error("파일 확장자를 추출할 수 없습니다.");

          const response = (
            (await getFileUploadUrl({
              fileType: "product",
              extension,
            })) as {
              data: {
                data: { content: { presignedUrl: string; objectKey: string } };
              };
            }
          ).data.data.content;

          const fileReader = new FileReader();

          fileReader.onload = async () => {
            const uploadResponse = (await cloudFileUpload(
              response.presignedUrl,
              file
            )) as {
              config: { data: { name: string } };
            };

            const IMG_URL = `${tempImgUrl}/${response.objectKey}`;

            setImgList?.((prevImgList) => [
              ...prevImgList,
              {
                imageOriginName: uploadResponse.config.data.name,
                imageStoredName: response.objectKey,
              },
            ]);

            const editor = quillRef.current?.getEditor();
            const range = editor?.getSelection();
            if (range) {
              editor.insertEmbed(range.index, "image", IMG_URL);
            }
          };

          fileReader.readAsDataURL(file);
        } catch (error) {
          errorHandler(error as AxiosError);
        }
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: handleImage,
        },
      },
      blotFormatter: {
        // 이미지 편집 기능 활성화
        enabled: true,
      },
      clipboard: {
        matchVisual: false,
      },
    };
  }, []);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className={cn("w-full max-w-[730px]", className)}>
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme="snow"
        style={{
          width: "100%",
          ...style,
        }}
        className="quill-editor"
      />
      <style>
        {`
          .quill-editor {
            height: auto;
          }
          .quill-editor .ql-container.ql-snow {
            min-height: ${
              typeof editorHeight === "number"
                ? `${editorHeight}px`
                : editorHeight
            };
            max-height: ${
              typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight
            };
            overflow-y: hidden;
          }
          .quill-editor .ql-editor {
            min-height: ${
              typeof editorHeight === "number"
                ? `${editorHeight}px`
                : editorHeight
            };
            max-height: ${
              typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight
            };
            overflow-y: auto;
          }
        `}
      </style>
    </div>
  );
};

export default TextFormEditor;

// import { AxiosError } from "axios";
// import BlotFormatter from "quill-blot-formatter";
// import { useEffect, useMemo, useRef } from "react";
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import commonApi from "../../../api/common.api";
// import { tempImgUrl } from "../../../constants/url";
// import { errorHandler } from "../../../utils/errorHandler";
// import { cn } from "../../../utils/style";
// import { ImageType } from "../../../types/data.types";

// const Image = Quill.import("formats/image");

// // ⬇️ (1) IMG 안전 속성만 보강
// class CustomImageBlot extends Image {
//   static create(
//     value:
//       | string
//       | { src: string; style?: string; width?: string; height?: string }
//   ) {
//     const node = super.create(value) as HTMLImageElement;

//     // 안전 속성
//     node.setAttribute("referrerpolicy", "no-referrer");
//     node.setAttribute("loading", "lazy");
//     node.setAttribute("decoding", "async");

//     if (typeof value === "string") {
//       node.setAttribute("src", value);
//     } else {
//       node.setAttribute("src", value.src);
//       if (value.style) node.setAttribute("style", value.style);
//       if (value.width) node.setAttribute("width", value.width);
//       if (value.height) node.setAttribute("height", value.height);
//     }
//     return node;
//   }

//   static value(node: HTMLElement) {
//     return {
//       src: node.getAttribute("src") || "",
//       style: node.getAttribute("style") || "",
//       width: node.getAttribute("width") || "",
//       height: node.getAttribute("height") || "",
//     };
//   }
// }

// Quill.register(CustomImageBlot, true);
// Quill.register("modules/blotFormatter", BlotFormatter);

// const SizeStyle = Quill.import("attributors/style/size");
// SizeStyle.whitelist = [
//   "11px",
//   "13px",
//   "15px",
//   "16px",
//   "19px",
//   "24px",
//   "28px",
//   "30px",
//   "34px",
//   "38px",
// ];
// Quill.register(SizeStyle, true);

// interface TextFormEditorProps {
//   style?: React.CSSProperties;
//   content: string;
//   setContent: (value: string) => void;
//   editorHeight?: string | number;
//   maxHeight?: string | number;
//   className?: string;
//   imgList?: ImageType[];
//   setImgList?: (
//     value: ImageType[] | ((prev: ImageType[]) => ImageType[])
//   ) => void;
// }

// const TextFormEditor: React.FC<TextFormEditorProps> = ({
//   style,
//   content,
//   setContent,
//   editorHeight = "200px",
//   maxHeight = "600px",
//   className,
//   setImgList,
// }) => {
//   const quillRef = useRef<ReactQuill>(null);
//   const { getFileUploadUrl, cloudFileUpload } = commonApi();

//   const handleChange = (value: string) => {
//     setContent(value);
//   };

//   const handleImage = () => {
//     const input = document.createElement("input");

//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.setAttribute("multiple", "multiple");
//     input.click();

//     input.addEventListener("change", async () => {
//       if (!input.files) return;

//       for (let i = 0; i < input.files.length; i++) {
//         const file = input.files[i];

//         try {
//           const extension = file.name.split(".").pop()?.toLowerCase();
//           if (!extension) throw new Error("파일 확장자를 추출할 수 없습니다.");

//           const response = (
//             (await getFileUploadUrl({
//               fileType: "product",
//               extension,
//             })) as {
//               data: {
//                 data: { content: { presignedUrl: string; objectKey: string } };
//               };
//             }
//           ).data.data.content;

//           // 업로드
//           const uploadResponse = (await cloudFileUpload(
//             response.presignedUrl,
//             file
//           )) as {
//             config: { data: { name: string } };
//           };

//           const IMG_URL = `${tempImgUrl}/${response.objectKey}`;

//           setImgList?.((prevImgList) => [
//             ...(prevImgList ?? []),
//             {
//               imageOriginName: uploadResponse.config.data.name,
//               imageStoredName: response.objectKey,
//             },
//           ]);

//           const editor = quillRef.current?.getEditor();
//           const range = editor?.getSelection();
//           if (range && editor) {
//             editor.insertEmbed(range.index, "image", IMG_URL, "user");
//             editor.setSelection(range.index + 1, 0);
//           }
//         } catch (error) {
//           errorHandler(error as AxiosError);
//         }
//       }
//     });
//   };

//   // ⬇️ (2) 붙여넣기/드롭 이미지 처리: 파일이면 dataURL, 외부 <img>면 S3로 업로드 후 우리 URL 삽입
//   useEffect(() => {
//     const editor = quillRef.current?.getEditor();
//     const root = editor?.root as HTMLElement | undefined;
//     if (!editor || !root) return;

//     const mimeToExt = (mime: string) => {
//       const m = mime.toLowerCase();
//       if (m.includes("png")) return "png";
//       if (m.includes("jpeg") || m.includes("jpg")) return "jpg";
//       if (m.includes("webp")) return "webp";
//       if (m.includes("gif")) return "gif";
//       return "png";
//     };

//     const insertImageAtCursor = (src: string) => {
//       const sel = editor.getSelection(true);
//       const index = sel ? sel.index : editor.getLength();
//       editor.insertEmbed(index, "image", src, "user");
//       editor.setSelection(index + 1, 0, "user");
//     };

//     const handleFiles = (files: FileList | File[]) => {
//       Array.from(files).forEach((file) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//           insertImageAtCursor(reader.result as string); // data:image/...;base64,
//         };
//         reader.readAsDataURL(file);
//       });
//     };

//     const uploadBlobToS3AndInsert = async (blob: Blob) => {
//       const ext = mimeToExt(blob.type || "image/png");
//       const presign = (await getFileUploadUrl({
//         fileType: "product",
//         extension: ext,
//       })) as {
//         data: {
//           data: { content: { presignedUrl: string; objectKey: string } };
//         };
//       };
//       const { presignedUrl, objectKey } = presign.data.data.content;

//       const file = new File([blob], `pasted.${ext}`, {
//         type: blob.type || `image/${ext}`,
//       });
//       await cloudFileUpload(presignedUrl, file);

//       const url = `${tempImgUrl}/${objectKey}`;
//       insertImageAtCursor(url);
//       setImgList?.((prev) => [
//         ...(prev ?? []),
//         { imageOriginName: file.name, imageStoredName: objectKey },
//       ]);
//     };

//     const handlePaste = async (e: ClipboardEvent) => {
//       const dt = e.clipboardData;
//       if (!dt) return;

//       // 1) 클립보드에 이미지 파일이 있으면 → dataURL로 바로 삽입 (Quill 데모와 동일)
//       const fileItems = Array.from(dt.items).filter(
//         (it) => it.kind === "file" && it.type.startsWith("image/")
//       );
//       if (fileItems.length) {
//         e.preventDefault();
//         const files = fileItems
//           .map((it) => it.getAsFile())
//           .filter((f): f is File => !!f);
//         handleFiles(files);
//         return;
//       }

//       // 2) HTML에 외부 <img src="http...">만 있는 경우 → 브라우저로 내려받아 S3 업로드 후 우리 URL 삽입
//       const html = dt.getData("text/html");
//       if (html && /<img[^>]+src=["']https?:\/\//i.test(html)) {
//         e.preventDefault();

//         const doc = new DOMParser().parseFromString(html, "text/html");
//         const imgs = Array.from(doc.images);
//         for (const img of imgs) {
//           const src = img.getAttribute("src");
//           if (!src) continue;

//           try {
//             // Naver 등 Referer 차단 회피
//             const res = await fetch(src, {
//               referrerPolicy: "no-referrer",
//               // credentials: 'omit' 기본, mode:'cors' 기본
//             });
//             if (!res.ok) throw new Error(`fetch ${res.status}`);
//             const blob = await res.blob();

//             // CORS 허용일 때만 읽을 수 있음. 허용되지 않으면 여기서 throw
//             await uploadBlobToS3AndInsert(blob);
//           } catch {
//             // 실패 시: 최소한 원본 URL이라도 삽입 (referrerpolicy 세팅됨)
//             insertImageAtCursor(src);
//           }
//         }
//         return;
//       }
//       // 텍스트만이면 기본 동작 유지
//     };

//     const handleDrop = (e: DragEvent) => {
//       const dt = e.dataTransfer;
//       if (!dt) return;
//       const hasImage = Array.from(dt.items).some(
//         (it) => it.kind === "file" && it.type.startsWith("image/")
//       );
//       if (hasImage) {
//         e.preventDefault();
//         const files = Array.from(dt.files);
//         handleFiles(files);
//       }
//     };

//     root.addEventListener("paste", handlePaste as any, { capture: true });
//     root.addEventListener("drop", handleDrop as any, { capture: true });

//     return () => {
//       root.removeEventListener(
//         "paste",
//         handlePaste as any,
//         {
//           capture: true,
//         } as any
//       );
//       root.removeEventListener(
//         "drop",
//         handleDrop as any,
//         {
//           capture: true,
//         } as any
//       );
//     };
//   }, [getFileUploadUrl, cloudFileUpload, setImgList]);

//   const modules = useMemo(() => {
//     return {
//       toolbar: {
//         container: [
//           [{ header: [1, 2, false] }],
//           ["bold", "italic", "underline", "strike"],
//           [{ list: "ordered" }, { list: "bullet" }],
//           ["link", "image"],
//           ["clean"],
//         ],
//         handlers: {
//           image: handleImage,
//         },
//       },
//       blotFormatter: {
//         enabled: true,
//       },
//       clipboard: {
//         matchVisual: false,
//       },
//     };
//   }, []); // ← 기존대로 고정

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "list",
//     "bullet",
//     "link",
//     "image",
//   ];

//   return (
//     <div className={cn("w-full max-w-[730px]", className)}>
//       <ReactQuill
//         ref={quillRef}
//         value={content}
//         onChange={handleChange}
//         modules={modules}
//         formats={formats}
//         theme="snow"
//         style={{
//           width: "100%",
//           ...style,
//         }}
//         className="quill-editor"
//       />
//       <style>
//         {`
//           .quill-editor { height: auto; }
//           .quill-editor .ql-container.ql-snow {
//             min-height: ${
//               typeof editorHeight === "number"
//                 ? `${editorHeight}px`
//                 : editorHeight
//             };
//             max-height: ${
//               typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight
//             };
//             overflow-y: hidden;
//           }
//           .quill-editor .ql-editor {
//             min-height: ${
//               typeof editorHeight === "number"
//                 ? `${editorHeight}px`
//                 : editorHeight
//             };
//             max-height: ${
//               typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight
//             };
//             overflow-y: auto;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default TextFormEditor;

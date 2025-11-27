declare module "react-quill" {
  import { Component } from "react";

  interface ReactQuillProps {
    value?: string;
    defaultValue?: string;
    readOnly?: boolean;
    placeholder?: string;
    theme?: string;
    onChange?: (content: string) => void;
    onChangeSelection?: (range: { index: number; length: number }) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onKeyPress?: () => void;
    onKeyDown?: () => void;
    onKeyUp?: () => void;
    style?: React.CSSProperties;
    className?: string;
    modules?: {
      [key: string]: any;
    };
    formats?: string[];
    bounds?: string | HTMLElement;
    scrollingContainer?: string | HTMLElement;
    preserveWhitespace?: boolean;
    children?: React.ReactNode;
  }

  class ReactQuill extends Component<ReactQuillProps> {
    getEditor(): any;
    getEditorContents(): string;
    getEditorSelection(): { index: number; length: number };
    focus(): void;
    blur(): void;
  }

  export default ReactQuill;
  export const Quill: any;
}

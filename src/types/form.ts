export type InputType =
  | {
      label: string;
      placeholder: string;
      type: "text" | "email" | "password";
      id: string;
    }
  | {
      label: Array<string>;
      type: "file";
      id: string;
    };

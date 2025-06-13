export interface InputType {
  label: string | Array<string>;
  placeholder?: string;
  type: string;
  id: string;
}

export interface SigupData {
  email: string;
  fullName: string;
  password: String;
  ConfirmPassword: string;
  userName: string;
  profile: Blob | null;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgetPasswordData {
  email: string;
  otp: Array<string>;
  password: string;
  ConfirmNewPassword: string;
}

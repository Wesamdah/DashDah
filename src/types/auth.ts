export interface SigupData {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  username: string;
  avatar: Blob | null;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgetPasswordData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

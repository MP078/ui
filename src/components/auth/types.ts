export interface AuthFormState {
  email: string;
  password: string;
  isLoading: boolean;
  error?: string;
}

export interface RegisterFormState extends AuthFormState {
  name: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

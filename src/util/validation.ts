// src/utils/validation.ts

export type ValidationRule = {
  required?: boolean;
  //   minLength?: number;
  //   maxLength?: number;
  //   pattern?: RegExp;
  //   custom?: (value: any) => boolean;
  message?: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: Record<string, string>;
};

// 단일 필드 검증
export const validateField = (
  value: any,
  rules: ValidationRule
): string | null => {
  // 필수 체크
  if (rules.required && !value) {
    return rules.message || "필수 입력 항목입니다.";
  }

  //   // 값이 없으면 다른 검증 스킵
  //   if (!value) return null;

  //   // 최소 길이
  //   if (rules.minLength && value.length < rules.minLength) {
  //     return rules.message || `최소 ${rules.minLength}자 이상 입력해주세요.`;
  //   }

  //   // 최대 길이
  //   if (rules.maxLength && value.length > rules.maxLength) {
  //     return rules.message || `최대 ${rules.maxLength}자까지 입력 가능합니다.`;
  //   }

  //   // 정규식 패턴
  //   if (rules.pattern && !rules.pattern.test(value)) {
  //     return rules.message || "올바른 형식이 아닙니다.";
  //   }

  //   // 커스텀 검증
  //   if (rules.custom && !rules.custom(value)) {
  //     return rules.message || "유효하지 않은 값입니다.";
  //   }

  return null;
};

// 여러 필드 검증
export const validateFields = (
  values: Record<string, any>,
  rules: Record<string, ValidationRule>
): ValidationResult => {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((field) => {
    const error = validateField(values[field], rules[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// 자주 사용하는 검증 규칙 미리 정의
export const commonRules = {
  required: (message?: string): ValidationRule => ({
    required: true,
    message: message || "필수 입력 항목입니다.",
  }),

  //   email: (message?: string): ValidationRule => ({
  //     pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  //     message: message || "올바른 이메일 형식이 아닙니다.",
  //   }),

  //   phone: (message?: string): ValidationRule => ({
  //     pattern: /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/,
  //     message: message || "올바른 전화번호 형식이 아닙니다.",
  //   }),

  //   minLength: (length: number, message?: string): ValidationRule => ({
  //     minLength: length,
  //     message: message || `최소 ${length}자 이상 입력해주세요.`,
  //   }),
};

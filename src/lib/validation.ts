import { ValidationError } from './errors';

type Validator = (value: unknown) => boolean;

interface FieldRule {
  validate: Validator;
  message: string;
}

function required(fieldName: string): FieldRule {
  return {
    validate: (v) => v !== null && v !== undefined && v !== '',
    message: `${fieldName} is required.`,
  };
}

function minLength(fieldName: string, min: number): FieldRule {
  return {
    validate: (v) => typeof v === 'string' && v.length >= min,
    message: `${fieldName} must be at least ${min} characters.`,
  };
}

function maxLength(fieldName: string, max: number): FieldRule {
  return {
    validate: (v) => typeof v === 'string' && v.length <= max,
    message: `${fieldName} must be at most ${max} characters.`,
  };
}

function isEmail(fieldName: string): FieldRule {
  return {
    validate: (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    message: `${fieldName} must be a valid email address.`,
  };
}

function isNumber(fieldName: string, min?: number, max?: number): FieldRule {
  return {
    validate: (v) => {
      if (typeof v !== 'number' || isNaN(v)) return false;
      if (min !== undefined && v < min) return false;
      if (max !== undefined && v > max) return false;
      return true;
    },
    message: min !== undefined && max !== undefined
      ? `${fieldName} must be between ${min} and ${max}.`
      : `${fieldName} must be a valid number.`,
  };
}

function isIn(fieldName: string, allowed: readonly (string | number)[]): FieldRule {
  return {
    validate: (v) => allowed.includes(v as string | number),
    message: `${fieldName} must be one of: ${allowed.join(', ')}.`,
  };
}

function isUrl(fieldName: string): FieldRule {
  return {
    validate: (v) => {
      if (typeof v !== 'string' || v === '') return true; // optional
      try {
        new URL(v);
        return true;
      } catch {
        return false;
      }
    },
    message: `${fieldName} must be a valid URL.`,
  };
}

function isSlug(fieldName: string): FieldRule {
  return {
    validate: (v) => typeof v === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v),
    message: `${fieldName} must be a valid slug (lowercase, hyphens).`,
  };
}

type ValidationSchema = Record<string, FieldRule[]>;

export function validate(data: Record<string, unknown>, schema: ValidationSchema): void {
  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];
    for (const rule of rules) {
      if (!rule.validate(value)) {
        throw new ValidationError(rule.message, field);
      }
    }
  }
}

export const validators = {
  required,
  minLength,
  maxLength,
  isEmail,
  isNumber,
  isIn,
  isUrl,
  isSlug,
};

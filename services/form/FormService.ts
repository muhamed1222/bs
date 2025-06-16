import { logService } from '../logging/LogService';

export type ValidationRule<T> = {
  validate: (value: T) => boolean;
  message: string;
};

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isDirty: boolean;
}

export class FormService<T extends Record<string, unknown>> {
  private initialState: T;
  private validationRules: ValidationRules<T>;
  private state: FormState<T>;

  constructor(initialValues: T, validationRules: ValidationRules<T> = {}) {
    this.initialState = initialValues;
    this.validationRules = validationRules;
    this.state = this.createInitialState();
  }

  private createInitialState(): FormState<T> {
    return {
      values: { ...this.initialState },
      errors: {},
      touched: {},
      isValid: true,
      isDirty: false
    };
  }

  public getState(): FormState<T> {
    return { ...this.state };
  }

  public setFieldValue<K extends keyof T>(field: K, value: T[K]): void {
    this.state.values[field] = value;
    this.state.touched[field] = true;
    this.state.isDirty = true;
    this.validateField(field);
    this.updateFormValidity();
    logService.debug(`Field ${String(field)} updated`, { value });
  }

  public setFieldTouched<K extends keyof T>(field: K, touched = true): void {
    this.state.touched[field] = touched;
    this.validateField(field);
    this.updateFormValidity();
  }

  public validateField<K extends keyof T>(field: K): void {
    const value = this.state.values[field];
    const rules = this.validationRules[field] || [];
    const errors: string[] = [];

    for (const rule of rules) {
      if (!rule.validate(value)) {
        errors.push(rule.message);
      }
    }

    if (errors.length > 0) {
      this.state.errors[field] = errors[0];
    } else {
      delete this.state.errors[field];
    }
  }

  public validateForm(): boolean {
    Object.keys(this.state.values).forEach((key) => {
      this.validateField(key as keyof T);
    });
    this.updateFormValidity();
    return this.state.isValid;
  }

  private updateFormValidity(): void {
    this.state.isValid = Object.keys(this.state.errors).length === 0;
  }

  public reset(): void {
    this.state = this.createInitialState();
    logService.info('Form reset to initial state');
  }

  public getFieldError<K extends keyof T>(field: K): string | undefined {
    return this.state.errors[field];
  }

  public isFieldTouched<K extends keyof T>(field: K): boolean {
    return !!this.state.touched[field];
  }

  public getFieldValue<K extends keyof T>(field: K): T[K] {
    return this.state.values[field];
  }

  public setValues(values: Partial<T>): void {
    Object.entries(values).forEach(([key, value]) => {
      this.setFieldValue(key as keyof T, value);
    });
    logService.debug('Multiple fields updated', { values });
  }

  public getValues(): T {
    return { ...this.state.values };
  }

  public getErrors(): Partial<Record<keyof T, string>> {
    return { ...this.state.errors };
  }

  public isFormValid(): boolean {
    return this.state.isValid;
  }

  public isFormDirty(): boolean {
    return this.state.isDirty;
  }
} 
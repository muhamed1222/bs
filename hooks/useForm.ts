import React, { useState, useCallback, useEffect } from 'react';
import { FormService, ValidationRules } from '../services/form/FormService';
import { logService } from '../services/logging/LogService';

interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: ValidationRules<T>;
  onSubmit?: (values: T) => void | Promise<void>;
  onChange?: (values: T) => void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit,
  onChange
}: UseFormOptions<T>) {
  const [formService] = useState(() => new FormService(initialValues, validationRules));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState(formService.getState());

  useEffect(() => {
    onChange?.(state.values);
  }, [state.values, onChange]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!formService.isFormValid()) {
      logService.warn('Form submission attempted with invalid data');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit?.(state.values);
      logService.info('Form submitted successfully');
    } catch (error) {
      logService.error('Form submission failed', { message: error instanceof Error ? error.message : String(error) });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [formService, state.values, onSubmit]);

  const setFieldValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    formService.setFieldValue(field, value);
    setState(formService.getState());
  }, [formService]);

  const setFieldTouched = useCallback(<K extends keyof T>(field: K, touched = true) => {
    formService.setFieldTouched(field, touched);
    setState(formService.getState());
  }, [formService]);

  const reset = useCallback(() => {
    formService.reset();
    setState(formService.getState());
  }, [formService]);

  const validateField = useCallback(<K extends keyof T>(field: K) => {
    formService.validateField(field);
    setState(formService.getState());
  }, [formService]);

  const validateForm = useCallback(() => {
    const isValid = formService.validateForm();
    setState(formService.getState());
    return isValid;
  }, [formService]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isValid: state.isValid,
    isDirty: state.isDirty,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    reset,
    validateField,
    validateForm,
    handleSubmit
  };
} 
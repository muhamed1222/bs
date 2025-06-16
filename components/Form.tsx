import React from 'react';
import { FormField } from './FormField';
import { LoadingState } from './LoadingState';
import { useForm } from '../hooks/useForm';

interface FormProps<T> {
  onSubmit: (values: T) => void | Promise<void>;
  initialValues: T;
  validationRules?: Record<keyof T, Array<{
    validate: (value: any) => boolean;
    message: string;
  }>>;
  children: (props: {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    touched: Partial<Record<keyof T, boolean>>;
    isSubmitting: boolean;
    handleSubmit: (e?: React.FormEvent) => Promise<void>;
    setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
    setFieldTouched: <K extends keyof T>(field: K, touched?: boolean) => void;
    reset: () => void;
  }) => React.ReactNode;
  className?: string;
}

export function Form<T extends Record<string, any>>({
  onSubmit,
  initialValues,
  validationRules,
  children,
  className = ''
}: FormProps<T>) {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    reset
  } = useForm<T>({
    initialValues,
    validationRules,
    onSubmit
  });

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
      noValidate
    >
      <LoadingState loading={isSubmitting}>
        {children({
          values,
          errors,
          touched,
          isSubmitting,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          reset
        })}
      </LoadingState>
    </form>
  );
}

// Пример использования:
/*
function LoginForm() {
  return (
    <Form
      initialValues={{
        email: '',
        password: ''
      }}
      validationRules={{
        email: [
          {
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Введите корректный email'
          }
        ],
        password: [
          {
            validate: (value) => value.length >= 6,
            message: 'Пароль должен содержать минимум 6 символов'
          }
        ]
      }}
      onSubmit={async (values) => {
        // Обработка отправки формы
      }}
    >
      {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
        <>
          <FormField
            name="email"
            label="Email"
            type="email"
            value={values.email}
            error={errors.email}
            touched={touched.email}
            onChange={(value) => setFieldValue('email', value)}
            onBlur={() => setFieldTouched('email')}
            required
          />
          <FormField
            name="password"
            label="Пароль"
            type="password"
            value={values.password}
            error={errors.password}
            touched={touched.password}
            onChange={(value) => setFieldValue('password', value)}
            onBlur={() => setFieldTouched('password')}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Войти
          </button>
        </>
      )}
    </Form>
  );
}
*/ 
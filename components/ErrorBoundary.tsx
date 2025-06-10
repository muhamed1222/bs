// Граница ошибок
import React from 'react';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  State
> {
  state: State = { hasError: false };

  static getDerivedStateFromError(_error: unknown) {
    // потенциально здесь можно отправить ошибку на сервер аналитики
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('ErrorBoundary caught', error);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-200 text-red-800">
          <p>Что-то пошло не так.</p>
          <button
            onClick={this.handleReset}
            className="mt-2 text-sm underline text-blue-600 hover:text-blue-800"
          >
            Попробовать снова
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Класс-компонент перехватывает ошибки дочерних компонентов

import { useState, useCallback, useEffect } from 'react';
import {
  recordView,
  recordLinkClick,
  recordReaction,
  addComment,
  deleteComment,
  getAnalytics,
  setIncognito,
  isIncognito,
  AnalyticsData,
} from '../services/analytics';
import { useToast } from '../components/ToastProvider';

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData>(() => getAnalytics());
  const { showSuccess } = useToast();

  const refresh = useCallback(() => {
    setData(getAnalytics());
  }, []);

  const view = useCallback(() => {
    recordView();
    refresh();
  }, [refresh]);

  const click = useCallback(
    (id: string) => {
      recordLinkClick(id);
      showSuccess('Клик по ссылке');
      refresh();
    },
    [refresh],
  );

  const react = useCallback(
    (emoji: string) => {
      recordReaction(emoji);
      showSuccess('Реакция сохранена');
      refresh();
    },
    [refresh],
  );

  const comment = useCallback(
    (text: string) => {
      addComment(text);
      showSuccess('Комментарий добавлен');
      refresh();
    },
    [refresh],
  );

  const removeComment = useCallback(
    (id: string) => {
      deleteComment(id);
      refresh();
    },
    [refresh],
  );

  const setIncog = useCallback(
    (val: boolean) => {
      setIncognito(val);
      refresh();
    },
    [refresh],
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    data,
    view,
    click,
    react,
    comment,
    removeComment,
    setIncognito: setIncog,
    isIncognito,
  };
}

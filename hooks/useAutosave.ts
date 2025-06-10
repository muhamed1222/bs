import { useEffect, useState } from 'react';
import { saveData, loadData, deleteData } from '../services/cloud';
import { useToast } from '../components/ToastProvider';

export function useAutosave<T>(userId: string, key: string, state: T) {
  const storageKey = `draft_${userId}_${key}`;
  const [saved, setSaved] = useState(true);
  const { showError } = useToast();

  // Save state to cloud/local storage with debounce
  useEffect(() => {
    setSaved(false);
    const handle = setTimeout(async () => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
        await saveData('drafts', storageKey, state);
        setSaved(true);
      } catch (e) {
        setSaved(false);
        showError('Ошибка автосохранения');
      }
    }, 500);
    return () => clearTimeout(handle);
  }, [state, storageKey, showError]);

  const loadDraft = (): T | undefined => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        return JSON.parse(raw) as T;
      } catch {
        // fallthrough
      }
    }
    // try cloud
    let data: T | undefined;
    loadData<T>('drafts', storageKey)
      .then((d) => {
        if (d) {
          localStorage.setItem(storageKey, JSON.stringify(d));
        }
      })
      .catch(() => {
        showError('Ошибка загрузки черновика');
      });
    return data;
  };

  const clearDraft = () => {
    localStorage.removeItem(storageKey);
    deleteData('drafts', storageKey).catch(() => {
      showError('Ошибка удаления черновика');
    });
  };

  return { saved, loadDraft, clearDraft };
}

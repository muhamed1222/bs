import React, { useEffect, useState } from 'react';
import { saveData, loadData } from '../services/cloud';
import { useUndoRedo } from '../hooks/useUndoRedo';
import { useAutosave } from '../hooks/useAutosave';
import { UserProfile } from '../types';
import { Button } from '../ui/Button';
import { Toast } from './Toast';
import { isValidEmail, isValidText } from '../utils/validators';

interface Props {
  userId: string;
  onUnsavedChanges?: (changed: boolean) => void;
  onSaveSuccess?: () => void;
  onError?: (err: unknown) => void;
}

const defaultProfile: UserProfile = { name: '', email: '', bio: '' };

export const ProfileEditor: React.FC<Props> = ({
  userId,
  onUnsavedChanges,
  onSaveSuccess,
  onError,
}) => {
  const [toast, setToast] = useState<string | null>(null);
  const { state, set, undo, redo, canUndo, canRedo } =
    useUndoRedo<UserProfile>(defaultProfile);
  const { saved, loadDraft, clearDraft } = useAutosave(
    userId,
    'profile',
    state
  );

  useEffect(() => {
    onUnsavedChanges?.(!saved);
  }, [saved, onUnsavedChanges]);

  useEffect(() => {
    const load = async () => {
      const draft = loadDraft();
      if (draft) {
        if (window.confirm('Найден черновик профиля. Восстановить?')) {
          set(draft);
        } else {
          clearDraft();
        }
      }
      // подгружаем сохранённый профиль из облака
      try {
        const data = await loadData<UserProfile>('profiles', userId);
        if (data) {
          localStorage.setItem(`profile_${userId}`, JSON.stringify(data));
          set(data);
        }
      } catch (err) {
        onError?.(err);
      }
    };
    void load();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!saved) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [saved]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [undo, redo]);

  const handleChange =
    (field: keyof UserProfile) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      set({ ...state, [field]: e.target.value });
    };

  // Исправленный обработчик публикации
  const handlePublish = async () => {
    try {
      localStorage.setItem(`profile_${userId}`, JSON.stringify(state));
      await saveData('profiles', userId, state);
      clearDraft();
      setToast('Профиль опубликован');
      onSaveSuccess?.();
    } catch (err) {
      setToast('Ошибка при сохранении');
      onError?.(err);
    }
  };

  const validName = isValidText(state.name, 50);
  const validEmail = isValidEmail(state.email);
  const validBio = isValidText(state.bio, 200);

  // Можно публиковать, если все поля валидны и есть несохранённые изменения
  const canPublish = validName && validEmail && validBio && !saved;

  const isFieldChanged = (field: keyof UserProfile) => {
    const raw = localStorage.getItem(`profile_${userId}`);
    if (raw) {
      try {
        const savedData: UserProfile = JSON.parse(raw);
        return savedData[field] !== state[field];
      } catch {
        // ignore
      }
    }
    // fall back to cloud without blocking
    loadData<UserProfile>('profiles', userId)
      .then((d) => {
        if (d) {
          localStorage.setItem(`profile_${userId}`, JSON.stringify(d));
        }
      })
      .catch(() => {
        /* ignore */
      });
    return false;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button onClick={undo} disabled={!canUndo}>
          Undo
        </Button>
        <Button onClick={redo} disabled={!canRedo}>
          Redo
        </Button>
        <Button onClick={handlePublish} disabled={!canPublish}>
          Сохранить
        </Button>
        <span className="text-sm text-gray-600">
          {saved ? 'изменения сохранены' : 'есть несохранённые изменения'}
        </span>
      </div>
      <div className="space-y-2">
        <label
          className={`block ${isFieldChanged('name') ? 'bg-yellow-100' : ''}`}
        >
          Имя
          <input
            className={`border p-2 w-full ${validName ? '' : 'border-red-500'}`}
            value={state.name}
            onChange={handleChange('name')}
            maxLength={50}
          />
          {!validName && (
            <span className="text-red-600 text-sm">Введите имя</span>
          )}
        </label>
        <label
          className={`block ${isFieldChanged('email') ? 'bg-yellow-100' : ''}`}
        >
          Email
          <input
            className={`border p-2 w-full ${validEmail ? '' : 'border-red-500'}`}
            value={state.email}
            onChange={handleChange('email')}
          />
          {!validEmail && (
            <span className="text-red-600 text-sm">Некорректный email</span>
          )}
        </label>
        <label
          className={`block ${isFieldChanged('bio') ? 'bg-yellow-100' : ''}`}
        >
          Биография
          <textarea
            className={`border p-2 w-full h-24 ${validBio ? '' : 'border-red-500'}`}
            value={state.bio}
            onChange={handleChange('bio')}
            maxLength={200}
          />
          {!validBio && (
            <span className="text-red-600 text-sm">Заполните биографию</span>
          )}
        </label>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

// Редактор профиля с черновиками и поддержкой отмены изменений

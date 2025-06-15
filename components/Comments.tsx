// Список комментариев
import React, { useEffect, useRef, useState } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

export const Comments: React.FC = () => {
  // Список комментариев
  const { data, comment, removeComment } = useAnalytics();
  const [text, setText] = useState(() => localStorage.getItem('commentDraft') || '');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('commentDraft', text);
  }, [text]);

  const submit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      await Promise.resolve(comment(text.trim().slice(0, 140)));
      setText('');
      localStorage.removeItem('commentDraft');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: number) => {
    if (!window.confirm('Удалить комментарий?')) return;
    setLoading(true);
    try {
      await Promise.resolve(removeComment(id.toString()));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <div>
        <input
          ref={inputRef}
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={140}
          placeholder="Добавить комментарий"
          className="border p-1 mr-2 rounded"
        />
        <button
          onClick={submit}
          disabled={loading}
          className="px-2 py-1 bg-indigo-500 text-white rounded disabled:opacity-50"
        >
          {loading ? '...' : 'Отправить'}
        </button>
      </div>
      <ul className="space-y-1 text-sm">
          {data.comments.map((c) => (
            <li key={c.id} className="flex justify-between bg-gray-100 p-1 rounded">
              <span>{c.text}</span>
             <button onClick={() => handleRemove(Number(c.id))} className="text-red-600 ml-2">
                удалить
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

// Комментарии посетителей с возможностью добавлять и удалять записи

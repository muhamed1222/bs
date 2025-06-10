import React, { useCallback, useRef, useState } from 'react'; // базовые хуки React
import Cropper from 'react-easy-crop'; // библиотека для кадрирования изображений
import { CroppedArea, getCroppedImg } from '../utils/cropImage'; // утилиты для получения обрезанного изображения

interface Props {
  onChange?: (dataUrl: string | null) => void;
}

export const AvatarUploader: React.FC<Props> = ({ onChange }) => {
  // Компонент для загрузки и обрезки аватара
  const [imageSrc, setImageSrc] = useState<string | null>(null); // исходное изображение
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // текущая позиция кадра
  const [zoom, setZoom] = useState(1); // масштаб
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null); // координаты обрезки
  const [avatar, setAvatar] = useState<string | null>(null); // готовый аватар
  const [error, setError] = useState<string | null>(null); // сообщение об ошибке
  const inputRef = useRef<HTMLInputElement>(null); // скрытый input для выбора файла

  // Обработка выбранного файла
  const onFile = useCallback((file: File) => {
    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      setError('Неверный тип файла');
      return;
    }
    // Ограничиваем размер аватара
    if (file.size > 2 * 1024 * 1024) {
      setError('Размер файла превышает 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  }, []);

  // Пользователь выбрал файл через диалог
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  };

  // Обрабатываем перетаскивание файла в область
  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  // Сохраняем координаты выбранной области
  const onCropComplete = useCallback(
    (_: unknown, croppedArea: CroppedArea) => {
      setCroppedAreaPixels(croppedArea);
    },
    []
  );

  // Создаём аватар из выбранной области
  const saveCrop = useCallback(async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
        setAvatar(cropped);
        onChange?.(cropped);
        setImageSrc(null);
      } catch (e) {
        console.error(e);
        setError('Не удалось обработать изображение');
      }
    }
  }, [imageSrc, croppedAreaPixels, onChange]);

  // Удаляем текущее изображение
  const remove = () => {
    setAvatar(null);
    onChange?.(null);
  };

  return (
    <div className="space-y-2">
      <div
        className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden relative flex items-center justify-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        {avatar ? (
          // Превью уже сохранённого аватара
          <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          // Подсказка, если аватар ещё не выбран
          <span className="text-gray-500">Аватар</span>
        )}
        {imageSrc && (
          // Появляется окно кадрирования
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10">
            <div className="relative w-28 h-28 bg-white">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="flex gap-2 mt-2">
              {/* Применить обрезку */}
              <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={saveCrop}>
                Ок
              </button>
              {/* Отменить выбор */}
              <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setImageSrc(null)}>
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Фактический input для выбора файла */}
      <input ref={inputRef} type="file" accept="image/*" onChange={onInputChange} className="hidden" />
      <div className="flex gap-2">
        {/* Кнопка открытия диалога выбора */}
        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded" onClick={() => inputRef.current?.click()}>
          Загрузить
        </button>
        {avatar && (
          // Кнопка удаления текущего аватара
          <button className="px-3 py-1 text-sm bg-red-500 text-white rounded" onClick={remove}>
            Удалить
          </button>
        )}
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

// Компонент для загрузки и обрезки аватара пользователя

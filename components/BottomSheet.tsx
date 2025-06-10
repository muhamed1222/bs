

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<Props> = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 bg-black/30 flex items-end md:hidden transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-t-lg w-full p-4 transition-transform duration-300 ${open ? 'translate-y-0' : 'translate-y-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// Модальное «дно» для мобильных экранов

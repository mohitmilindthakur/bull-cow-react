import { memo } from 'react';

interface KeyboardRowProps {
  letters: string;
  onClick: (key: string) => void;
}

const KeyboardRow: React.FC<KeyboardRowProps> = ({
  letters: lettersProp,
  onClick,
}) => {
  let letters = lettersProp.split('');

  const _onClick = (key: string) => {
    return () => {
      onClick(key);
    };
  };

  return (
    <div className="flex gap-5 mt-5">
      {letters.map((l) => (
        <span
          key={l}
          onClick={_onClick(l)}
          className="w-12 h-12 uppercase flex justify-center items-center hover:bg-slate-100 cursor-pointer text-semibold text-2xl border border-gray-500"
        >
          {l}
        </span>
      ))}
    </div>
  );
};

export default memo(KeyboardRow);

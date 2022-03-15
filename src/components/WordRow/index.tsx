import { memo } from 'react';

interface WordRowProps {
  letters: string;
  bullCowCount?: {
    bulls: number;
    cows: number;
  };
  computed?: boolean;
}

export const WORD_LENGTH = 5;

const WordRow: React.FC<WordRowProps> = ({
  letters: lettersProp,
  computed = false,
  bullCowCount = { bulls: 0, cows: 0 },
}) => {
  let letters = lettersProp.split('');
  if (letters.length < WORD_LENGTH) {
    let remainingLetters = WORD_LENGTH - letters.length;
    letters = letters.concat(Array(remainingLetters).fill(''));
  }

  return (
    <div className="flex">
      <div className={`mr-5 table ${!computed && 'invisible'}`}>
        <div className="table-row">
          <span className="table-cell pr-5">Bulls </span>
          <span className="table-cell">{bullCowCount?.bulls}</span>
        </div>

        <div className="table-row">
          <span className="table-cell">Cows </span>
          <span className="table-cell">{bullCowCount?.cows}</span>
        </div>
      </div>
      <div className="grid gap-5 grid-cols-5">
        {letters.map((item, index) => (
          <Character value={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default memo(WordRow);

interface CharacterProps {
  value: string;
}

const Character: React.FC<CharacterProps> = memo(({ value }) => {
  return (
    <div className="h-12 w-12 text-2xl uppercase border-2 flex items-center justify-center">
      {value}
    </div>
  );
});

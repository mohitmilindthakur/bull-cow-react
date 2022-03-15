import KeyboardRow from "../KeyboardRow";
import {memo} from 'react';


interface KeyboardProps {
    onClick: (key: string) => void;
}

const keyboard = [
    "qwertyuiop",
    "asdfghjkl",
    "↵zxcvbnm←"
]

const Keyboard: React.FC<KeyboardProps> = ({onClick}) => {
    return (
        <div className="flex flex-col justify-center items-center">
            {
                keyboard.map(item => (
                    <KeyboardRow letters={item} key={item} onClick={onClick} />
                ))
            }
        </div>
    )
}




export default memo(Keyboard);
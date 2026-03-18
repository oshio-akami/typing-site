import { useState } from "react";

type Props = {
  className?: string;
};

export default function CharacterView({ className = "" }: Props) {
  const [animation, setAnimation] = useState(false);
  return (
    <img
      src="typing-character.webp"
      className={`object-contain ${className} ${animation && "animate-bounce"}`}
      onClick={() => {
        setAnimation(true);
        setTimeout(() => setAnimation(false), 1000);
      }}
    />
  );
}

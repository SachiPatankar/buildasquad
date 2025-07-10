import React, { useEffect, useState } from "react";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  onDone?: () => void;
  wordGap?: string | number;
}

export const TextGenerateEffect: React.FC<TextGenerateEffectProps> = ({ words, className = "", onDone, wordGap = 0 }) => {
  const wordList = words.split(" ");
  const [visible, setVisible] = useState(Array(wordList.length).fill(false));

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    // Animate each word in sequence
    wordList.forEach((_, i) => {
      timeouts.push(
        setTimeout(() => {
          setVisible((v) => {
            const copy = [...v];
            copy[i] = true;
            return copy;
          });
        }, i * 100) // faster: 100ms per word
      );
    });
    // Call onDone only after the last word's transition is fully finished
    if (onDone) {
      const lastWordAppear = (wordList.length) * 100; // match above
      const transitionDuration = 300; // ms, matches duration-300 in class
      const buffer = 50; // small buffer to ensure it's fully visible
      timeouts.push(
        setTimeout(() => {
          onDone();
        }, lastWordAppear + transitionDuration + buffer)
      );
    }
    return () => timeouts.forEach(clearTimeout);
    // eslint-disable-next-line
  }, [words]);

  return (
    <span className={`inline-block ${className}`.trim()}>
      {wordList.map((word, i) => (
        <span
          key={i}
          className={`inline-block transition-all duration-300 ease-out ${
            visible[i]
              ? "opacity-100 blur-0 translate-y-0"
              : "opacity-0 blur-md translate-y-4"
          }`}
          style={{
            transitionDelay: `${i * 0.08}s`, // faster: 80ms per word
            marginRight: i !== wordList.length - 1 ? wordGap : 0,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}; 
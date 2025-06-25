import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

const words = ["Register", "Sign Up"];
let currentWordIndex = 0;
let currentLetterIndex = 0;
let isErasing = false;

const Animation1 = () => {
  const [text, setText] = useState("");
  const [dotPosition, setDotPosition] = useState(0);
  const textRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isErasing) {
        if (currentLetterIndex < words[currentWordIndex].length) {
          setText(words[currentWordIndex].slice(0, currentLetterIndex + 1));
          currentLetterIndex++;
        } else {
          setTimeout(() => {
            isErasing = true;
          }, 1000);
        }
      } else {
        if (currentLetterIndex > 0) {
          setText(words[currentWordIndex].slice(0, currentLetterIndex - 1));
          currentLetterIndex--;
        } else {
          isErasing = false;
          currentWordIndex = (currentWordIndex + 1) % words.length;
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const textElement = textRef.current;
    if (textElement) {
      const textWidth = textElement.offsetWidth;
      const letterWidth = textWidth / text.length || 25; // Default letter width
      setDotPosition(letterWidth * text.length);
    }
  }, [text]);

  return (
    <div
      style={{
        width: "600px", // Larger width for the animation container
        height: "100px", // Larger height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden", // Prevent content overflow
        position: "relative",
        margin: "0 auto", // Center the animation
      }}
    >
      <div style={{ position: "relative" }}>
        <animated.div
          style={{
            width: "10px", // Larger dot size
            height: "10px",
            backgroundColor: "pink",
            borderRadius: "50%",
            position: "absolute",
            left: `${dotPosition}px`,
            bottom: "-10px", // Positioning dot slightly below the text
            transition: "left 0.2s ease-in-out",
          }}
        />
        <span
          ref={textRef}
          style={{
            fontFamily: "monospace",
            fontSize: "3rem", // Increase font size
            fontWeight: "bold", // Make text bold for better visibility
            color: words[currentWordIndex] === "Sign Up" ? "#A78BFA" : "white",
            
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default Animation1;

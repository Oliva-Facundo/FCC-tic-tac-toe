import { useEffect, useState } from "react";

const MouseFollow = () => {
  const [mouseMove, setMouseMove] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseMove({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: -7,
          left: -10,
          width: 30,
          height: 30,
          borderRadius: "50%",
          boxShadow: "0 0 10px 0 rgba(239, 71, 111, 0.5)",
          animation: "pulse 2s infinite",
          transform: `translate(${mouseMove.x}px, ${mouseMove.y}px)`,
          zIndex: 10,
          opacity: 1,
          pointerEvents: "none",
        }}
      />
    </>
  );
};

export default MouseFollow;

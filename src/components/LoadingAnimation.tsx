import React, { useState, useRef, useEffect } from "react";

const numberOfCircles = 12;
const animationDuration = 2.5;
const delayBetweenCircles = animationDuration;

const LoadingAnimation: React.FC = () => {
  const containerRef = useRef<SVGSVGElement | null>(null);
  const [containerSize, setContainerSize] = useState(600);
  const radiusOfBigCircle = containerSize / 2;
  const radiusOfSmallCircle = radiusOfBigCircle / 3;

  const circles = Array.from({ length: numberOfCircles }).map((_, index) => {
    const angle = (index / numberOfCircles) * 2 * Math.PI;
    const cx =
      (radiusOfBigCircle - radiusOfSmallCircle) * Math.cos(angle) +
      radiusOfBigCircle;
    const cy =
      (radiusOfBigCircle - radiusOfSmallCircle) * Math.sin(angle) +
      radiusOfBigCircle;

    return (
      <circle
        key={index}
        cx={cx}
        cy={cy}
        r={radiusOfSmallCircle}
        fill="none"
        stroke="rgba(166, 213, 250, 1)"
        strokeWidth="2"
        opacity="0"
        className="animate-drawCircle"
        strokeDasharray={`${2 * Math.PI * radiusOfSmallCircle}`}
        strokeDashoffset={`${2 * Math.PI * radiusOfSmallCircle}`}
        style={{
          animationDelay: `${index * delayBetweenCircles}s`,
        }}
      />
    );
  });

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setContainerSize(width);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${containerSize} ${containerSize}`}
        ref={containerRef}
      >
        {circles}
      </svg>
    </div>
  );
};

export default LoadingAnimation;
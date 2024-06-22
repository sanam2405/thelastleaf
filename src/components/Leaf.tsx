import { useRef, useEffect, FC, ReactNode, CSSProperties } from "react";

interface FloatingImagesType {
  container: HTMLDivElement | null;
  image: HTMLImageElement | null;
  lastTime: number;
  isPaused: boolean;
  x: number;
  y: number;
  angle: number;
}

interface leafMotionSpeed {
  SMALL_SCREEN: number;
  LARGE_SCREEN: number;
}

interface LeafProps {
  numberOfLeaves: number;
  leafPath: string;
  children: ReactNode;
  customStyles?: CSSProperties;
  leafStyles?: CSSProperties;
  leafMotion?: leafMotionSpeed;
  interactive?: boolean;
}

const defaultStyles: CSSProperties = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  margin: "0px",
  padding: "0px",
};

export const Leaf: FC<LeafProps> = ({
  children,
  numberOfLeaves,
  leafPath,
  customStyles,
  leafStyles,
  interactive = true,
  leafMotion = { SMALL_SCREEN: 35, LARGE_SCREEN: 10 },
}) => {
  const containerRefs = useRef<Array<HTMLDivElement | null>>(
    Array(numberOfLeaves).fill(null),
  );
  const imageRefs = useRef<Array<HTMLImageElement | null>>(
    Array(numberOfLeaves).fill(null),
  );
  const floatingImages = useRef<FloatingImagesType[]>([]);

  useEffect(() => {
    const initFloatingImages = () => {
      floatingImages.current = Array.from(
        { length: numberOfLeaves },
        (_, i) => ({
          container: containerRefs.current[i],
          image: imageRefs.current[i],
          lastTime: 0,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          angle: Math.random() * 360,
          isPaused: false,
        }),
      );
    };
    initFloatingImages();
  }, [numberOfLeaves]);

  useEffect(() => {
    floatingImages.current.forEach((image) => {
      if (image.container && image.image && interactive) {
        image.isPaused = false;

        const pauseImage = () => {
          image.isPaused = true;
        };

        const resumeImage = () => {
          image.isPaused = false;
        };

        image.image.addEventListener("mouseenter", pauseImage);
        image.image.addEventListener("touchstart", pauseImage);
        image.image.addEventListener("mouseleave", resumeImage);
        image.image.addEventListener("touchend", resumeImage);
      }
    });

    const moveImages = (currentTime: number) => {
      floatingImages.current.forEach((image) => {
        if (image.container && image.image) {
          const timeDelta = currentTime - image.lastTime;
          const smallScreen = window.matchMedia("(max-width: 767px)").matches;
          image.lastTime = currentTime;

          if (!image.isPaused) {
            const speedFactor = smallScreen
              ? leafMotion.SMALL_SCREEN
              : leafMotion.LARGE_SCREEN;
            image.x +=
              (Math.sin((image.angle * Math.PI) / 180) * timeDelta) /
              speedFactor;
            image.y +=
              (Math.cos((image.angle * Math.PI) / 180) * timeDelta) /
              speedFactor;
            image.angle += 0.1;
          }

          if (image.x > window.innerWidth || image.y > window.innerHeight) {
            image.container.style.opacity = "0.1";
            const getRandomDirection = Math.ceil(Math.random() * 10) % 4;
            image.x =
              getRandomDirection % 2 === 0
                ? 0.85 * window.innerWidth
                : -0.85 * window.innerWidth;
            image.y = image.image.height;
            image.angle = Math.random() * 360;

            setTimeout(() => {
              if (image.container) {
                image.container.style.opacity = "0.9";
                image.container.style.transition = "opacity 1s ease-in-out";
              }
            }, 1000);
          }

          const opacity = 0.85 + 0.1 * Math.sin(currentTime / 1000);
          image.container.style.opacity = opacity.toString();
          image.image.style.transform = `translate(${image.x}px, ${image.y}px) rotate(${image.angle}deg)`;
        }
      });

      requestAnimationFrame(moveImages);
    };

    requestAnimationFrame(moveImages);
  }, [interactive]);

  return (
    <div
      style={customStyles ? customStyles : defaultStyles}
      className="overflow-x-hidden"
    >
      {Array.from({ length: numberOfLeaves }, (_, i) => (
        <div key={i} className="parent">
          <div
            ref={(el) => (containerRefs.current[i] = el)}
            className="inline-block m-0 p-0 vertical-align-top animate-fadeIn bg-transparent opacity-90"
            // style={leafStyles}
          >
            <img
              src={leafPath}
              alt="thelastleaf"
              ref={(el) => (imageRefs.current[i] = el)}
              className="block m-0 p-0 opacity-90"
              style={{
                ...leafStyles,
                pointerEvents: interactive ? "auto" : "none",
              }}
            />
          </div>
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <div style={{ pointerEvents: "auto" }}>{children}</div>
      </div>
    </div>
  );
};

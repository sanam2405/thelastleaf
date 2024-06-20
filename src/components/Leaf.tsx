import { useRef, useEffect } from "react";
import styles from "../styles/Leaf.module.css";

interface FloatingImagesType {
  container: HTMLDivElement | null;
  image: HTMLImageElement | null;
  lastTime: number;
  isPaused: boolean;
  x: number;
  y: number;
  angle: number;
}

const FloatingImages = () => {
  const containerRefs = useRef<Array<HTMLDivElement | null>>(
    Array(21).fill(null),
  );
  const imageRefs = useRef<Array<HTMLImageElement | null>>(
    Array(21).fill(null),
  );
  const floatingImages = useRef<FloatingImagesType[]>([]);

  useEffect(() => {
    const initFloatingImages = () => {
      floatingImages.current = Array.from({ length: 21 }, (_, i) => ({
        container: containerRefs.current[i],
        image: imageRefs.current[i],
        lastTime: 0,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        angle: Math.random() * 360,
        isPaused: false,
      }));
    };
    initFloatingImages();
  }, []);

  useEffect(() => {
    floatingImages.current.forEach((image) => {
      if (image.container && image.image) {
        image.isPaused = false;

        // Pause the image movement when hovering or touching
        image.image.addEventListener("mouseenter", () => {
          image.isPaused = true;
        });

        image.image.addEventListener("touchstart", () => {
          image.isPaused = true;
        });

        // Resume the image movement when the hover or touch ends
        image.image.addEventListener("mouseleave", () => {
          image.isPaused = false;
        });

        image.image.addEventListener("touchend", () => {
          image.isPaused = false;
        });
      }
    });

    const moveImages = (currentTime: number) => {
      floatingImages.current.forEach((image) => {
        if (image.container && image.image) {
          const timeDelta = currentTime - image.lastTime;
          const smallScreen = window.matchMedia("(max-width: 767px)").matches;
          image.lastTime = currentTime;

          if (!image.isPaused) {
            if (smallScreen) {
              image.x +=
                (Math.sin((image.angle * Math.PI) / 180) * timeDelta) / 35;
              image.y +=
                (Math.cos((image.angle * Math.PI) / 180) * timeDelta) / 35;
            } else {
              image.x +=
                (Math.sin((image.angle * Math.PI) / 180) * timeDelta) / 10;
              image.y +=
                (Math.cos((image.angle * Math.PI) / 180) * timeDelta) / 10;
            }
            image.angle += 0.1;
          }

          if (image.x > window.innerWidth || image.y > window.innerHeight) {
            image.container.style.opacity = "0.1";

            const getRandomDirection = Math.ceil(Math.random() * 10) % 4;

            if (getRandomDirection === 0) {
              image.x = 0.85 * window.innerWidth;
              image.y = image.image.height;
            } else if (getRandomDirection === 1) {
              image.x = -0.85 * window.innerWidth;
              image.y = image.image.height;
            } else if (getRandomDirection === 2) {
              image.x = 0.85 * window.innerWidth;
              image.y = image.image.height;
            } else {
              image.x = -0.85 * window.innerWidth;
              image.y = image.image.height;
            }
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
  }, []);

  return (
    <div id="lastleaf-div">
      {Array.from({ length: 21 }, (_, i) => (
        <div key={i} className="parent">
          <div
            id={`floating-image-container-${i + 1}`}
            ref={(el) => (containerRefs.current[i] = el)}
            className={styles.floatingImageContainer}
          >
            <img
              src="/thelastleaf.png"
              alt="thelastleaf"
              id={`floating-image-${i + 1}`}
              ref={(el) => (imageRefs.current[i] = el)}
              className={styles.floatingImage}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingImages;

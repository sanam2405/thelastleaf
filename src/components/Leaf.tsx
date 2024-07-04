import { useRef, useEffect, FC, ReactNode, CSSProperties } from "react";
import { TimelineMax, TweenMax, Power1 } from "gsap";

interface FloatingImagesType {
  container: HTMLDivElement | null;
  image: HTMLImageElement | null;
  lastTime: number;
  isPaused: boolean;
  x: number;
  y: number;
  angle: number;
}

interface IleafMotion {
  SMALL_SCREEN: number;
  LARGE_SCREEN: number;
}

interface IleafStyles {
  SMALL_SCREEN: CSSProperties;
  LARGE_SCREEN: CSSProperties;
}

interface LeafProps {
  numberOfLeaves: number;
  leafPath: string;
  children: ReactNode;
  customStyles?: CSSProperties;
  leafStyles?: IleafStyles;
  leafMotion?: IleafMotion;
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

  // Reference for the single GSAP animated leaf
  const gsapLeafRef = useRef<HTMLDivElement>(null);
  const gsapImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (gsapLeafRef.current) {
      const tl = new TimelineMax({ repeat: -1 });
      tl.set(gsapLeafRef.current, { rotation: 5 });

      const swingLeaf = () => {
        tl.add([
          TweenMax.to(gsapLeafRef.current, 2, {
            left: 500,
            rotation: -5,
            ease: Power1.easeInOut,
          }),
          TweenMax.to(gsapLeafRef.current, 2, {
            top: "+=30",
            ease: Power1.easeOut,
          }),
        ]).add([
          TweenMax.to(gsapLeafRef.current, 2, {
            left: 0,
            rotation: 5,
            ease: Power1.easeInOut,
          }),
          TweenMax.to(gsapLeafRef.current, 2, {
            top: "+=30",
            ease: Power1.easeOut,
          }),
        ]);
      };

      swingLeaf();
      swingLeaf();
      swingLeaf();
    }
  }, []);

  useEffect(() => {
    const initFloatingImages = () => {
      floatingImages.current = Array.from(
        { length: numberOfLeaves - 1 }, // One less because of the GSAP animated leaf
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
    const pauseLeafs = () => {
      floatingImages.current.forEach((image) => {
        if (image.container && image.image && interactive) {
          image.isPaused = true;
        }
      });
      gsapLeafRef.current?.setAttribute("data-is-paused", "true");
    };

    const resumeLeafs = () => {
      floatingImages.current.forEach((image) => {
        if (image.container && image.image && interactive) {
          image.isPaused = false;
        }
      });
      gsapLeafRef.current?.removeAttribute("data-is-paused");
    };

    floatingImages.current.forEach((image) => {
      if (image.container && image.image && interactive) {
        image.image.addEventListener("mouseenter", pauseLeafs);
        image.image.addEventListener("touchstart", pauseLeafs);
        image.image.addEventListener("mouseleave", resumeLeafs);
        image.image.addEventListener("touchend", resumeLeafs);
      }
    });

    gsapImageRef.current?.addEventListener("mouseenter", pauseLeafs);
    gsapImageRef.current?.addEventListener("touchstart", pauseLeafs);
    gsapImageRef.current?.addEventListener("mouseleave", resumeLeafs);
    gsapImageRef.current?.addEventListener("touchend", resumeLeafs);

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
  }, [interactive, leafMotion]);

  return (
    <div
      style={customStyles ? customStyles : defaultStyles}
      className="overflow-x-hidden"
    >
      {Array.from({ length: numberOfLeaves - 1 }, (_, i) => (
        <div key={i} className="parent">
          <div
            ref={(el) => (containerRefs.current[i] = el)}
            className="inline-block m-0 p-0 vertical-align-top animate-fadeIn bg-transparent opacity-90"
          >
            <img
              src={leafPath}
              alt="thelastleaf"
              ref={(el) => (imageRefs.current[i] = el)}
              className="block m-0 p-0 opacity-90"
              style={{
                ...(window.matchMedia("(max-width: 767px)").matches
                  ? leafStyles?.SMALL_SCREEN
                  : leafStyles?.LARGE_SCREEN),
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

      <div
        id="leaf"
        ref={gsapLeafRef}
        style={{
          ...(window.matchMedia("(max-width: 767px)").matches
            ? leafStyles?.SMALL_SCREEN
            : leafStyles?.LARGE_SCREEN),
          position: "relative",
          textAlign: "center",
          backgroundColor: "transparent",
          pointerEvents: interactive ? "auto" : "none",
        }}
      >
        <img
          src={leafPath}
          alt="gsap-leaf"
          ref={gsapImageRef}
          style={{
            ...(window.matchMedia("(max-width: 767px)").matches
              ? leafStyles?.SMALL_SCREEN
              : leafStyles?.LARGE_SCREEN),
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

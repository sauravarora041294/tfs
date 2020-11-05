export const fadeInImage = (
  placeholderRef: React.MutableRefObject<any>,
  containerRef: React.MutableRefObject<any>,
) => {
  placeholderRef.current.style.display = "none";
  containerRef.current.classList.add("fade-in");
  containerRef.current.style.opacity = 1;
};

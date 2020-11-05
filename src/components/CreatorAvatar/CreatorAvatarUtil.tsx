const fadeInImage = (
  placeholderRef: React.MutableRefObject<any>,
  containerRef: React.MutableRefObject<any>,
  large: Boolean,
) => {
  if (placeholderRef.current) placeholderRef.current.style.display = "none";
  if (containerRef.current) containerRef.current.style.display = "block";

  if (containerRef.current) containerRef.current.classList.add("fade-in");
  if (containerRef.current) containerRef.current.style.opacity = 1;
};

export { fadeInImage };

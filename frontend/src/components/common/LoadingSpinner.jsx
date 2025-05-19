const LoadingSpinner = ({ size = "xl" }) => {
  const sizeClass = `loading-${size}`;

  return <span className={`loading loading-infinity ${sizeClass}`} />;
};
export default LoadingSpinner;

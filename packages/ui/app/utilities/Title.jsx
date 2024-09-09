function Title({ children, px, py }) {
  return (
    <h1
      className={`text-xl sm:text-2xl md:text-3xl text-left font-bold  ${px} ${py}`}
    >
      {children}
    </h1>
  );
}

export default Title;

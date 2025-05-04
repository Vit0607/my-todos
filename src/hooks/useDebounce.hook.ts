export const useDebounce = (
  setter: React.Dispatch<React.SetStateAction<string>>,
  delay = 2000
) => {
  const debouncedSetter = (value: string) => {
    const timer = setTimeout(() => {
      setter(value);
    }, delay);

    return () => clearTimeout(timer);
  };

  return debouncedSetter;
};

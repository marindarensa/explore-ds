// Pure logic: tidak tergantung React
export function controllable<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (v: T) => void
) {
  let value = controlledValue ?? defaultValue;

  const setValue = (next: T) => {
    value = next;
    onChange?.(next);
  };

  return [() => value, setValue] as const;
}

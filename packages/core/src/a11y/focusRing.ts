export function focusRingHandler(callback: (visible: boolean) => void) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Tab") callback(true);
  };
  const handleMouseDown = () => callback(false);

  return {
    attach() {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("mousedown", handleMouseDown);
    },
    detach() {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    }
  };
}

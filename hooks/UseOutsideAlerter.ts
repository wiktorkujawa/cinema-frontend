import { useEffect, MutableRefObject } from 'react';

function useOutsideAlerter(ref: MutableRefObject<HTMLElement | null>, onOutsideClick: () => void) {
  useEffect(() => {
    /**
     * Invoke the callback if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
}

export default useOutsideAlerter;
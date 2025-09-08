import { useCallback, useEffect, useState } from 'react';

export const useKeyCombination = (keyCombination, callback) => {
  const [isActive, setIsActive] = useState(false);

  const handleKeyDown = useCallback(
    (event) => {
      const keys = keyCombination
        .toLowerCase()
        .split('+')
        .map((k) => k.trim());
      const shift = keys.includes('shift') ? event.shiftKey : true;
      const ctrl = keys.includes('ctrl') ? event.ctrlKey : true;
      const alt = keys.includes('alt') ? event.altKey : true;
      const meta = keys.includes('meta') ? event.metaKey : true;
      const mainKey = keys.find((k) => !['shift', 'ctrl', 'alt', 'meta'].includes(k));
      if (
        shift &&
        ctrl &&
        alt &&
        meta &&
        event.key.toLowerCase() === (mainKey || '').toLowerCase()
      ) {
        setIsActive(true);
        if (typeof callback === 'function') callback();
      }
    },
    [keyCombination, callback],
  );

  const handleKeyUp = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return isActive;
};

import {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

/**
 * Returns if the keyboard is open / closed
 *
 * @return {bool} isOpen
 */
export function useKeyboardStatus() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setIsOpen(true),
    );
    const keyboardHideListener = Keyboard.addListener('keyboardWillHide', () =>
      setIsOpen(false),
    );

    return () => {
      if (keyboardShowListener) {
        keyboardShowListener.remove();
      }
      if (keyboardHideListener) {
        keyboardHideListener.remove();
      }
    };
  });

  return isOpen;
}

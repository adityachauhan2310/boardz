import { useCallback, useContext } from 'react';
import { usePopup } from '../lib/popup';

import { ClosableContext } from '../contexts';

export default (Step, { onOpen, onClose, ...props } = {}) => {
  const [activateClosable, deactivateClosable] = useContext(ClosableContext);

  const handleOpen = useCallback(() => {
    activateClosable();

    if (onOpen) {
      onOpen();
    }
  }, [onOpen, activateClosable]);

  const handleClose = useCallback(() => {
    deactivateClosable();

    if (onClose) {
      onClose();
    }
  }, [onClose, deactivateClosable]);

  return usePopup(Step, {
    ...props,
    onOpen: handleOpen,
    onClose: handleClose,
  });
};

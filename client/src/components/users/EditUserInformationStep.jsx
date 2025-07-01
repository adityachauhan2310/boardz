import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Popup } from '../../lib/custom-ui';

import EditUserInformation from './EditUserInformation';

const EditUserInformationStep = React.memo(({ id, onBack, onClose }) => {
  const [t] = useTranslation();

  const handleUpdate = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      <Popup.Header onBack={onBack}>
        {t('common.editInformation', {
          context: 'title',
        })}
      </Popup.Header>
      <Popup.Content>
        <EditUserInformation id={id} onUpdate={handleUpdate} />
      </Popup.Content>
    </>
  );
});

EditUserInformationStep.propTypes = {
  id: PropTypes.string.isRequired,
  onBack: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

EditUserInformationStep.defaultProps = {
  onBack: undefined,
};

export default EditUserInformationStep;

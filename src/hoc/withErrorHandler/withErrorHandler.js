import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrapperComponent, axios) => {
  return props => {

    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <>
        <Modal
          show={ error !== null }
          closed={ clearError }
        >
          { error ? error.message : null }
        </Modal>
        <WrapperComponent {...props} />
      </>
    )
  }
}

export default withErrorHandler;

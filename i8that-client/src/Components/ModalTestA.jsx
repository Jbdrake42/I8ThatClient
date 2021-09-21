import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalTestA = ({ item, info, modal2, setModal2 }) => {
  const toggle2 = () => setModal2(!modal2);
  return (
    <>
      <Modal isOpen={modal2} toggle={toggle2}>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          {info} {item} Lorem ipsum dolor sit amet, consectetur adipisicing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
          in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Do Something</Button>
          <Button color="secondary">Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalTestA;

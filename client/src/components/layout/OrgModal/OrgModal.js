import React, { useState } from 'react';
import { connect } from 'react-redux';
import './OrgModal.css';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';

const OrgModal = ({ userNotebooks }) => {

  // Modal
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (userNotebooks.notebooks === null) {
    return <p>loading...</p>;
  } else {
    return (
      <div>
        <button onClick={toggleModal}>Organize</button>
        <Modal isOpen={modal}>
          <ModalHeader toggle={toggleModal}>
            Move Note to...
          </ModalHeader>
          <ModalBody>
            {
              userNotebooks.notebooks.map(notebook => (
                <p key={notebook._id}>{notebook.title}</p>
              ))
            }
          </ModalBody>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  userNotebooks: state.userNotebooks
});

export default connect(mapStateToProps)(OrgModal);
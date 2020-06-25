import React, { useState } from 'react';
import { connect } from 'react-redux';

import './NBDropdown.css';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const NBDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown
      className='notebooks-dropdown'
      isOpen={dropdownOpen}
      toggle={toggle}
    >
      <DropdownToggle caret className='notebooks-dropdownToggle'>
        <span className='nb-title'>{props.title}</span>
      </DropdownToggle>
      <DropdownMenu>
        Dropdown Item
      </DropdownMenu>
    </Dropdown>
  );
};

export default NBDropdown;

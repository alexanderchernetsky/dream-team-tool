import styled from "styled-components";
import { Modal } from "antd";
import ax from "../accessor";

const StyledModal = styled(Modal)`
  .ant-modal-body {
    border-radius: 5px;
    padding: 22px;
    background-color: ${ax("modal-background")};
  }
  
  .ant-modal-close-x {
    color: ${ax("modal-close-btn-color")};
  }
  
  .ant-modal-content {
    box-shadow: none;
  }
`;

export default StyledModal;

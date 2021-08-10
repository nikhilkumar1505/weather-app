import React from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import './dialog.css'

const DialogBox = ({ text, isOpen, setIsOpen, clearFunction }) => {
  

  return (
    <>
      <Dialog open={isOpen} maxWidth="md">
        <DialogContent className="dialog-box-main">
          <p className="title">{text}</p>
          <div className="btn-main">
            <button className="btn-btn-no" onClick={() => setIsOpen(false)}>
              NO
            </button>
            <button className="btn-btn-yes" onClick={clearFunction}>
              YES
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogBox;

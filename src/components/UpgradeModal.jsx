import React from "react";
import ReactDOM from "react-dom";
import classes from './UpgradeModal.module.css';

const BackDrop = props => {
  return <div className={classes.backdrop} onClick={props.onConfirm}></div>
}

const ModalOverlay = props => {
  return <div className={classes['upgrade-card']}>
    <div className={classes['upgrade-header']}>
      <h2>Premium Access Needed</h2>
      <img
        src="https://wisey.app/_next/static/chunks/src/modules/quiz-funnel-summary-b/components/visual-plan/assets/cover.webp" alt=""/>
    </div>
    <div className={classes['upgrade-bottom']}>
      <button className={classes['upgrade-btn']} onClick={props.onConfirm}>UPGRADE</button>
    </div>
  </div>
}

const UpgradeModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop onConfirm={props.onClick}/>, document.getElementById('backdrop-root'))}
      {ReactDOM.createPortal(<ModalOverlay onConfirm={props.onClick}/>, document.getElementById('overlay-root'))}
    </>
  )
}

export default UpgradeModal;

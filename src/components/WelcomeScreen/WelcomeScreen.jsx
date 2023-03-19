import React from "react";
import {Form} from "react-router-dom";

import classes from "./WelcomeScreen.module.css";
import {Typography} from "@material-ui/core";

const WelcomeScreen = () => {
  return (
    <div className={classes.container}>
      <div>
        <Typography variant="h1">Start your learning journey today!</Typography>
        <Typography color={"primary"}>Press the button below to explore our courses gallery.</Typography>
      </div>
      <Form method={'post'}>
        <button className={classes['welcome-btn']}>
          Get started
        </button>
      </Form>
    </div>)
}
export default WelcomeScreen;


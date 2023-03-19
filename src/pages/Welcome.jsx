import React from "react";
import {json, redirect} from "react-router-dom";

import WelcomeScreen from '../components/WelcomeScreen/WelcomeScreen';

const WelcomePage = () => {
  return <WelcomeScreen />;
};

export default WelcomePage;

export async function action() {
  const res = await fetch('http://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions', {
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if(!res.ok) {
    throw json({message: 'Couldn\'t generate user token'}, {status: 500})
  }

  const resData = await res.json();
  const token = resData.token;

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('courses')

}

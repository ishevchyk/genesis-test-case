import React from "react";
import {Link, Outlet, useLoaderData, useSubmit} from 'react-router-dom';
import {useEffect} from "react";
import {getTokenDuration} from "../utils/auth";
import {AppBar, Avatar, makeStyles, Toolbar, Typography} from "@material-ui/core";


const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    },
    appbar_items : {
      height: '100%',
      display: 'flex',
      columnGap: theme.spacing(5),
      alignItems: 'center',
    },
    toolbar: theme.mixins.toolbar,
    page: {
      height: '100%',
    }
  }
})

function RootLayout() {

  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if(!token) {
      return;
    }
    if(token === 'EXPIRED') {
      submit(null, {action: '/logout', method: 'post'})
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, {action: '/logout', method: 'post'})
    }, tokenDuration);
  }, [token, submit]);


  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar elevation={0} className={classes.appbar}>
        <Toolbar className={classes.appbar_items}>
          <Link to={'/'}><Avatar alt="Logo" src="https://static.thenounproject.com/png/2169884-200.png"/></Link>
          <Link to={'/courses'} style={{textDecoration: 'none'}}><Typography color={"secondary"}>Learning</Typography></Link>
        </Toolbar>
      </AppBar>
      <main className={classes.page}>
        <div className={classes.toolbar}></div>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;

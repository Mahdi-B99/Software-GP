import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { Button } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const useStyles = makeStyles({
  list: {
    width: 183,
    color: "white",
    background: "#131313",
    height: "100%",
  },
  fullList: {
    width: "auto",
  },
  menuIcon: {
    color: "white",
  },
  Divider: {
    background: "black",
  },
  closeDrawer: {
    marginTop: 10,
    marginLeft: 140,
  },
  tabs: {
    "&:hover": {
      background: "grey",
    },
  },
  loginTab: {
    background: "rgba(175, 0, 0, 1)",
    "&:hover": {
      background: "rgba(200, 0, 0, 1)",
    },
  },
});

export default function NavDrawer(props) {
  NavDrawer.propTypes = {
    isAuth: PropTypes.bool,
  };
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <div className={clsx(classes.list)} role="presentation">
     
      <Divider className={classes.Divider} />
     
        <>
          <List>
            <ListItem
              button
              className={classes.tabs}
              component={Link}
              id="nav-menu-signup"
              to={"/Signup"}
              key={"Sign up"}
            >
              <ListItemText primary={"Sign up"} />
            </ListItem>
            <ListItem
              button
              className={classes.loginTab}
              component={Link}
              id="nav-menu-login"
              to={"/Login"}
              key={"Login"}
            >
              <ListItemText primary={"Login"} />
            </ListItem>
          </List>
        </>
      
    </div>
  );

  return (
      
    <div>
         {props.isAuth ? (
        <></>
      ) : (
      <React.Fragment key={"left"}>
        <Button
          onClick={toggleDrawer("left", true)}
          title="nav-menu"
          id="nav-menu-button"
        >
          <MenuIcon className={classes.menuIcon} />
        </Button>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          ModalProps={{ onBackdropClick: toggleDrawer(false) }}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
      )}
    </div>
  );
}

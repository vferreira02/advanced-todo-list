import React, {Fragment} from 'react';
import {Meteor} from 'meteor/meteor';
import {useTracker} from 'meteor/react-meteor-data';
import { useHistory } from 'react-router';
import { LoginForm } from './LoginForm';
import { UserLogout } from './UserLogout';
import Cards from './Cards';
import MenuIcon from '@material-ui/icons/Menu';

//IMPORTS FORM MATERIAL CORE
import {AppBar, 
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  Button,
  makeStyles, 
  useTheme,
  Avatar,
  TextField
} from '@material-ui/core/';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop:25
  },

}));

function SuperDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const user = useTracker(() => Meteor.user());
  const history = useHistory(); 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />

      {user ? (
      
      <Fragment>
                <br/>
                <Avatar 
                src={user.profile.picture} 
                style={{width:130, height : 130, marginLeft : '24%'}}
                id="profile-picture"  />
                <br/>
                 <Typography align="center">Hi, {user.username}!</Typography>
                 <br/>
                 <Typography align="center">{user.profile.email}</Typography>
                 <Button
                  id="profile-settings"
                  size="small"
                  onClick={() => {history.push('/user-profile')}}
                  >
                  Profile Settings
                  </Button>
                  <br/>
                    <Divider/>
                  
                  <UserLogout/>

      </Fragment>
    ): (
      <LoginForm/>
      )}
     
      <Divider />
     
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6"  noWrap>
            Super To-Do List
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography
        align="center"
        variant="h5"
        component="h1"
        >
          Hi {user.username}! <br/>Welcome to the To Do List Advanced
        </Typography>
        <br/>
        <Cards/>
      </main>
    </div>
  );
}
export default SuperDrawer;

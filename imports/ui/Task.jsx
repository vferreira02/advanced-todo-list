import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../db/TasksCollection';
import { ViewTask } from './ViewTasks';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
//IMPORTAÇÕES DO MATERIAL UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles, Modal } from '@material-ui/core';
import { Dialog } from '@material-ui/core';
import { Details } from './Details';

    // Just the style of classes
 
    const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginBottom:'-20px',
      backgroundColor: theme.palette.background.paper,
      justifyContent:'center',
      alignContent:'center',

     
    },
  }));
    

    
    export const Task = ({task, onDeleteClick}) =>{
    
        const user = useTracker(() => Meteor.user());

   
        const history = useHistory();

        
        //Create a Menu 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    function ListItemLink(props){
        return <ListItem button component="a" {...props}/>;
    }
    
    const classes = useStyles();

    

    return(
        <div className={classes.root}>
        <List>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <WorkIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemLink
                  onClick= { () => history.push(`/details/${task._id}`)}
                >
                    
                        <ListItemText primary={task.text} secondary={task.username}/>
                </ListItemLink>
                
                <div>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        >
                            <MenuItem
                            onClick= { () => history.push(`/edit-task/${task._id}`)}
                            >
                                <EditIcon/>
                           
                               <span>Edit</span>
                               
                           
                            </MenuItem>
                            <MenuItem
                           onClick={() => onDeleteClick(task)}
                            >
                                <DeleteIcon/>
                            Delete
                            </MenuItem>
                        </Menu>
                </div>
            </ListItem>
        </List>
        </div>
    ); 
};

/*
======================= OLD CODE ===========================

import React from 'react';

export const Task = ({task, onCheckboxClick,onDeleteClick}) =>{
    return (
    <li>
       <input
       type="checkbox"
       checked={!!task.isChecked} 
       onClick={()=>onCheckboxClick(task)}
       readOnly
       />
       <span>{task.text}</span> 
       <button onClick={()=> onDeleteClick(task)}>&times;</button>  
    </li>
    );
};




*/
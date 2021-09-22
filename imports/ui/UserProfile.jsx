import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import {
  List,
  ListItem,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Input,
  Container,
  Avatar
} from '@material-ui/core';
import { useHistory } from 'react-router';
import {PersistentDrawer} from './PersistentDrawer';







export const UserProfile = () => {

  const user = useTracker(() => Meteor.user());

  useEffect(()=>{
   function callProfile() {
    setLoading(true);  
   
   }
   callProfile();
  },[user])

  

  const history = useHistory();
  
 
    const [loading, setLoading] = useState(false);

  const [init, setInit] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [company, setCompany] = useState('');
  const [picture, setPicture] = useState('');

  const [sex, setSex] = useState('');
  const [value, setValue] = React.useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(()=>{
     if(user && !init){
       setInit(true);
       setName(user.profile.name);
       setEmail(user.profile.email);
       setBirthday(user.profile.birthday);
       setCompany(user.profile.company);
       setPicture(user.profile.picture);
       setSex(user.profile.sex);
     }
    
  
   },[user])

  //CONVERT IMAGE EM BASE 64 //
  const uploadImage = async (image) => {
    //console.log(image.target.files);
    const file = image.target.files[0];
    const base64 = await convertBase64(file)
    console.log(base64);
    setPicture(base64);
  };



  const convertBase64 = (file) => {

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      }

    })

  }

  /****************************** */
  const handleSubmit = e => {
    e.preventDefault();


    Meteor.users.update(user._id, {
      $set: {

        profile: {
          name: name,
          email: email,
          birthday: birthday,
          sex: value,
          company: company,
          picture: picture



        }


      }


    });

    history.push('/');


  };


  return (
    <div className="user-profile-fix">

    <Container>

    <form onSubmit={handleSubmit}>



      <List>

        <Avatar src={picture} 
         style={{width:130, height : 130,}}
        
        />

        <ListItem>

        </ListItem>

        <ListItem>
          <TextField
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}

          />
        </ListItem>

        <ListItem>
          <TextField
            id="email"
            label="E-mail"
            type="e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </ListItem>

        <ListItem>
          <TextField
            value={birthday}
            label="Birthday"
            id="descricao"
            type="date"
            onChange={e => setBirthday(e.target.value)}
          />
        </ListItem>

        <ListItem>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </ListItem>

        <ListItem>
          <TextField
            id="company"
            label="Company"
            type="text"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
        </ListItem>

        <ListItem>
          <Input
            type="file"
            onChange={(image) => { uploadImage(image); }}
          />
        </ListItem>


      </List>
      <Button type="submit">Save Alterations</Button>
      <Button onClick={() => { history.push('/') }}>Back</Button>

    </form>

    </Container>
    </div>
  );
}




/*
  const {isLoading} = ( )=> {
    const noDataAvailable = {user: {}};
    if(!Meteor.user()) {
      return {...noDataAvailable, isLoading: true};
    }},
  */
 
  /*
  function Profile(){
      name = this.name;
      email = this.email;
      birthday = this.birthday;
      sex = this.sex;
      company = this.company;
      picture = this.picture;
  }
  
  */

  // const [user, setUser] = useState(useTracker(() => Meteor.user()));
  /*
 
    if(user){

      setName(user.profile.name);
      setEmail(user.profile.email);
      setBirthday(user.profile.birthday);
      setSex(value);
      setCompany(user.profile.company);
      setPicture(user.profile.picture)

    }

*/
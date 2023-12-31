import { RiShutDownLine } from 'react-icons/ri';



import { useState } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../hooks/auth';


import { api } from '../../services/api'
import avatarPlaceholder from '../../assets/profile rocketnotes.png'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'



import { Container, Form, Avatar } from "./styles";



export function Profile() {
  const { user, updateProfile } = useAuth()
  
  const [name, setName] = useState(user.name);
const [email, setEmail] = useState(user.email);
const [passwordOld, setPasswordOld] = useState();
const [passwordNew, setPasswordNew] = useState();

const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` :avatarPlaceholder;

const [avatar, setAvatar] = useState(avatarUrl) /*(user.avatar)*/
const [avatarFile, setAvatarFile] = useState(null)

const { signOut } = useAuth()
const navigate = useNavigate();

function handleSignOut() {
  navigate("/")
  signOut()
}
function handleBack(){
  navigate(-1)
}



async function handleUpdate() {

  const updated ={
    name,
    email,
    password: passwordNew,
    old_password: passwordOld,

   
  }
  
  /*if (!name || !email || !passwordNew || !passwordOld) {
    return alert("Preencha todos os campos!")
   } */
 
 
  
  const userUpdated = Object.assign( user, updated);
  //return console.log(userUpdated)

  await updateProfile({ user: userUpdated, avatarFile })

  //handleBack()
}

function handleChangeAvatar(event) {
  const file = event.target.files[0];
  setAvatarFile(file)

  const imagePreview = URL.createObjectURL(file);
  setAvatar(imagePreview);
  
}

  return (

  <Container>
    <header>
      <button class="handleBack" type="button" onClick={handleBack}>
        <FiArrowLeft size={36} />
      </button>
        
          <button id="signOut" type="button" onClick={handleSignOut}>
         <RiShutDownLine/>
        </button>
        

    </header>

    <Form>
      <Avatar>
        <img 
        src={avatar}
        alt="Foto do usuário" 
        />

        <label htmlFor="avatar">
          <FiCamera />

          <input 
          id="avatar"
          type="file"
          onChange={handleChangeAvatar}
          />
          
        </label>
      </Avatar>
      <Input
      placeholder="Nome"
      type="text"
      icon={FiUser}
      value={name}
      onChange={e => setName(e.target.value)}
      />

      <Input
      placeholder="E-mail"
      type="text"
      icon={FiMail}
      value={email}
      onChange={e => setEmail(e.target.value)}
      />


      <Input
      placeholder="Senha atual"
      type="password"
      icon={FiLock}
      onChange={e => setPasswordOld(e.target.value)}
      />

      <Input
      placeholder="Nova senha"
      type="password"
      icon={FiLock}
      onChange={e => setPasswordNew(e.target.value)}
      />

      <Button title="Salvar" onClick={handleUpdate}/>

    </Form>
     
   
  </Container>
  );
}
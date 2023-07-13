import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import { api } from '../../services/api';

import { Container, Brand, Menu, Search, Content, NewNote} from './styles';

import { Note } from '../../components/Note';
import { Input } from '../../components/Input';

import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';


export function Home() {
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([])
  const [notes, setNotes] = useState([])

  const navigate = useNavigate();

function handleTagSelected(tagName) {
  if(tagName === "all"){
    return setTagsSelected([]);
  }  //setTagsSelected(prevState => [...prevState, tagName]);
  const alreadySelected = tagsSelected.includes(tagName)
  
  if (alreadySelected) {
     const filteredTags = tagsSelected.filter(tag => tag !== tagName)
     setTagsSelected(filteredTags)

  } else {
    setTagsSelected(prevState => [...prevState, tagName])
}


}

function handleDetails(id) {
  navigate(`/details/${id}`);
}

useEffect(() => {
  async function fetchTags() {
    const response = await api.get("/tags");
    setTags(response.data)
  }

  fetchTags()
}, []);

useEffect(() => {
async function fetchNotes() {
  const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
  setNotes(response.data);
}
fetchNotes();
}, [tagsSelected, search])


  return (
    <Container>
      <Brand>
      <h1>Rocketnotes</h1>
      </Brand>

<Header/>

      <Menu>
<li>
  <ButtonText 
  title="Todos" 
  onClick={() => handleTagSelected("all")}
  isActive={tagsSelected.length === 0}
  />
  </li>
  <li>
  <ButtonText 
  title="Frontend" 
  onClick={() => handleTagSelected("")}
  isActive={tagsSelected.length === 1}
  />
  </li>
  <li>
  <ButtonText 
  title="Node" 
  onClick={() => handleTagSelected("")}
  isActive={tagsSelected.length === 2}
  />
  </li>
  <li>
  <ButtonText 
  title="React" 
  onClick={() => handleTagSelected("")}
  isActive={tagsSelected.length === 3}
  />
  </li>
 

  {
    tags && tags.map(tag => (
      <li key={String(tag.id)}>
        <ButtonText
        title={tag.name}
        onClick={() => handleTagSelected(tag.name)}
        isActive={tagsSelected.includes(tag.name)}
        />
      </li>
    ))
  }



        
      </Menu>

      <Search>
<Input 
placeholder="Pesquisar pelo título"
onChange={(e) => setSearch(e.target.value)}
 />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note => (
            <Note 
            key={String(note.id)}
            data={note}
            onClick={() => handleDetails(note.id)}
/>
))

}
        </Section>

      </Content>

<NewNote to="/new"> 
  <FiPlus />
  Criar nota

</NewNote>

    </Container>
  )
}
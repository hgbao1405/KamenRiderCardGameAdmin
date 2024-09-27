import React, { FC } from 'react';
import './Home.css';
import CharacterList from '../CharaterList/CharacterList';

interface HomeProps {}

const Home: FC<HomeProps> = () => (
  <div className="Home">
    <CharacterList />
  </div>
);

export default Home;

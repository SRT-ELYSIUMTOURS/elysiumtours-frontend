import React from 'react';
import './App.css';
import Button from './components/ui/button';
import {Filter, FilterOption} from './components/ui/filter';

function App() {
  return (
  <>
  <div className="font-raleway">

  <h1 className='text-green-600'>Hello World

  </h1>
  <Button >Contact Us</Button>
  <Filter >
    <FilterOption value="option1">Option 1</FilterOption>
    <FilterOption value="option2">Option 2</FilterOption>
    <FilterOption value="option3">Option 3</FilterOption>
  </Filter>
  </div>
  </>
  );
}

export default App;
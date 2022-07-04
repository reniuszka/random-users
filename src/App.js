import React, { useState, useEffect } from 'react';
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa';
const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';
function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('random person');

  const getPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data, 'data');
    const person = await data.results[0];
    console.log(person, 'person');
    const { phone, email } = person;
    const { first, last } = person.name;
    //take props from person.location.street
    const {
      street: { number, name },
    } = person.location;
    // new name for a prop
    const { large: image } = person.picture;
    const {
      login: { password },
    } = person;
    const {
      dob: { age },
    } = person;
    //now I create a new object with those destructed properties
    const newPerson = {
      // image: image - the property name is equal to the variable thah holds the value
      image,
      phone,
      email,
      password,
      age,
      //combining those properties in  one
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };
    console.log('neeew', newPerson);
    //now want to add this vakue of newerson to setPerson
    setPerson(newPerson);
    setLoading(false);
    setTitle('name');
    setValue(newPerson.name);
  };

  useEffect(() => {
    getPerson();
  }, []);

  const handleValue = (e) => {
    //i want to get info only when i hover over the button as there data-label i class are attached, not svg
    // console.log(e.target, 'target details');
    //chek if the target that im hovering over has a class of icon and then I would get the data atribute for ex data-label, to get data-label i need to go to js and add dataset.label
    if (e.target.classList.contains('icon')) {
      const dataValue = e.target.dataset.label;
      console.log(dataValue);
      setTitle(dataValue);
      //the  key is dynamically access the propert value by changing the key, as dataValue is a key and willl have different names which are assign here (name,age, password..)
      setValue(person[dataValue]);
    }
  };
  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img
            src={(person && person.image) || defaultImage}
            alt='random user'
            className='user-img'
          />
          <p className='user-title'>my {title} is</p>
          <p className='user-value'>{value} </p>
          <div className='values-list'>
            <button
              className='icon'
              data-label='name'
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className='icon'
              data-label='email'
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className='icon' data-label='age' onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className='icon'
              data-label='street'
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className='icon'
              data-label='phone'
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className='icon'
              data-label='password'
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className='btn' type='button' onClick={getPerson}>
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;

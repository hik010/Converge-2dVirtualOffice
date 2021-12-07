import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { socket } from '../socket';

const initialUserData = {
  name: '',
  roomKey: '',
  officeType: '',
  hairStyle: 'hairStyle1',
  outfit: 'outfit1',
  skinColor: 0xf0ddd7,
  hairColor: 0xf18fb4,
  eyeColor: 0x000000,
};

export const JoinOrCreateForm = (props) => {
  // to make the form controlled, have a state to keep track of input values
  const [userData, setUserData] = useState(initialUserData);
  const [err, setErr] = useState(''); //if we need to show an error
  const navigate = useNavigate(); //to let us navigate to other pages

  useEffect(() => {
    if (props.formType === 'join') {
      // only fetch from localStorage if formType is 'join'
      let storedData = window.localStorage.getItem('userData');
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    } else {
      setUserData(initialUserData);
    }

    return () => setUserData(initialUserData);
  }, [props.formType]);

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
    setErr('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // pressing create
    if (props.formType === 'create') {
      socket.emit('isKeyUnique', userData.roomKey);
      socket.on('roomUniqueCheck', (unique) => {
        // key is unique so user will join the room
        if (unique) validKey(userData);
        // key is not unique, cannot create room with same key
        else
          setErr(
            `room ${userData.roomKey} is taken. Please join with another key.`
          );
      });
    }

    // pressing join bottom
    if (props.formType === 'join') {
      socket.emit('doesKeyExist', userData.roomKey);
      socket.on('roomExistCheck', (exists) => {
        // room is created, user can join room
        if (exists) validKey(userData);
        else {
          // room is not created yet
          setErr(
            `room ${userData.roomKey} is invalid. Please join with another key.`
          );
        }
      });
    }
  };

  const validKey = (userData) => {
    // user data is saved on local storage
    window.localStorage.setItem('userData', JSON.stringify(userData));

    // join the office

    navigate('/office');
  };

  const skinColors = [0xf0ddd7, 0xf0ddd7, 0xf0ddd7, 0xf0ddd7, 0xf0ddd7];

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">
          Your Name
          <span
            style={{
              display: !userData.name ? 'inline' : 'none',
              color: 'red',
            }}
          >
            *
          </span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={userData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="officeKey">
          Room Key
          <span
            style={{
              display: !userData.roomKey ? 'inline' : 'none',
              color: 'red',
            }}
          >
            *
          </span>
        </label>
        <input
          type="text"
          name="roomKey"
          id="officeKey"
          value={userData.roomKey}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="hairStyle">Hair Style:</label>
        <select
          name="hairStyle"
          id="hairStyle"
          value={userData.hairStyle}
          onChange={handleChange}
        >
          <option value="hairStyle1">1</option>
          <option value="hairStyle2">2</option>
          <option value="hairStyle3">3</option>
          <option value="hairStyle4">4</option>
          <option value="hairStyle5">5</option>
          <option value="hairStyle6">6</option>
          <option value="hairStyle7">7</option>
          <option value="hairStyle8">8</option>
          <option value="hairStyle9">9</option>
          <option value="hairStyle10">10</option>
          <option value="hairStyle11">11</option>
          <option value="hairStyle12">12</option>
          <option value="hairStyle13">13</option>
          <option value="hairStyle14">14</option>
          <option value="hairStyle15">15</option>
          <option value="hairStyle16">16</option>
          <option value="hairStyle17">17</option>
          <option value="hairStyle18">18</option>
          <option value="hairStyle19">19</option>
          <option value="hairStyle20">20</option>
          <option value="hairStyle21">21</option>
          <option value="hairStyle22">22</option>
          <option value="hairStyle23">23</option>
          <option value="hairStyle24">24</option>
          <option value="hairStyle25">25</option>
          <option value="hairStyle26">26</option>
          <option value="hairStyle27">27</option>
          <option value="hairStyle28">28</option>
          <option value="hairStyle29">29</option>
        </select>
      </div>
      <div>
        <label htmlFor="outfit">Outfit:</label>
        <select
          name="outfit"
          id="outfit"
          value={userData.outfit}
          onChange={handleChange}
        >
          <option value="outfit1">1</option>
          <option value="outfit2">2</option>
          <option value="outfit3">3</option>
          <option value="outfit4">4</option>
          <option value="outfit5">5</option>
          <option value="outfit6">6</option>
          <option value="outfit7">7</option>
          <option value="outfit8">8</option>
          <option value="outfit9">9</option>
          <option value="outfit10">10</option>
        </select>
      </div>
      <div>
        <label htmlFor="skinColor">Skin Color:</label>
        <select
          name="skinColor"
          id="skinColor"
          value={userData.skinColor}
          onChange={handleChange}
        >
          <option value="0xf0ddd7">1</option>
          <option value="0x8d5524">2</option>
          <option value="0xc68642">3</option>
          <option value="0xe0ac69">4</option>
          <option value="0xf1c27d">5</option>
        </select>
      </div>
      <div>
        <label htmlFor="hairColor">Hair Color:</label>
        <select
          name="hairColor"
          id="hairColor"
          value={userData.hairColor}
          onChange={handleChange}
        >
          <option value="0xf1cc8f">blonde</option>
          <option value="0x8fe5f1">blue</option>
          <option value="0xf18fb4">pink</option>
          <option value="0x8d5524">brown</option>
          <option value="0xffa500">orange</option>
        </select>
      </div>

      <div>
        <label htmlFor="officeType">Office Type</label>
        <input
          type="text"
          name="officeType"
          id="officeType"
          value={userData.officeType}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={!userData.name || !userData.roomKey}>
        {props.formType}
      </button>
      {/* Error div that wil show if err (state) is not an empty string */}
      {err && <p style={{ color: 'red' }}>{err}</p>}
    </form>
  );
};

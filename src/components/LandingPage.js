import React, {useState} from 'react';
import { JoinOrCreateForm } from './Forms';

const LandingPage = () => {
  const [formType, setFormType] = useState('')

  console.log('hide game canvas')
  document.getElementById('mygame').style.display = 'none';
  document.querySelector('.webcam-panel').style.display = 'none';

  return (
    // 2 buttons: 1 for create 1 for join
    <div className="landing-page">
      <div className="buttons">
        <button onClick={() => {console.log('clicked create'); setFormType('create')}} type="button">Create</button>
        <button onClick={() => {console.log('clicked join');setFormType('join')}} type="button">Join</button>
      </div>
      <div className="form">
        {formType === '' ? null:
        <JoinOrCreateForm formType={formType}/>
        }
      </div>
    </div>
  );
};

export default LandingPage;

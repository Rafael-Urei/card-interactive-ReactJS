import './App.css';
import { IMaskInput } from "react-imask";
import fcard from '../src/bg-card-front.png'
import bcard from '../src/bg-card-back.png'
import cardimg from '../src/card-logo.svg'
import iconcomplete from '../src/icon-complete.svg'
import { useState } from 'react';

function App(){

  //### Old version!

  const [cardNumber, setValue] = useState('0000 0000 0000 0000');
  const [cardName, setName] = useState('JANNE APPLESEED');
  const [cardMonth, setMonth] = useState('mm');
  const [cardYear, setYear] = useState('yy');
  const [cardCvc, setCvc] = useState('cvv');
  const [button, setButton] = useState(true);

  const handleAddNum = event => setValue(event.target.value);

  const handleAddName = event => setName(event.target.value);

  const handleAddMonth = event => setMonth(event.target.value);

  const handleAddYear = event => setYear(event.target.value);

  const handleAddCvc = event => setCvc(event.target.value);

  const handleSubmit = event => event.preventDefault();

  const submitConditions= () => {
    if (cardNumber === '' || cardNumber.length < 19 || cardName === '' || cardMonth === '' || cardYear === '' || cardCvc === '') {
      setButton(true);
    } else {
      setButton(!button)
      setValue('0000 0000 0000 0000');
      setName('JANNE APPLESEED');
      setMonth('mm');
      setYear('yy');
      setCvc('cvv');
    }
  };

  const createObject = () => {
    return {
      number: cardNumber,
      name: cardName,
      month: cardMonth,
      year: cardYear,
      cvc: cardCvc
    }
  };

 /* const [values, setValues] = useState({
    name: '',
    number: '',
    month: '',
    year: '',
    cvc: '',
  })

  const preventReload = e => e.preventDefault();

  const handleChange = ((event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    })
  });

  const checkErrors = () => {
    const newArr = Object.values(values);
    const teste = newArr.filter(value => {
      if (value === '') {
        return true
      } else {
        return false;
      }
    })
    teste.map(value => {
      if(value === '') {
        alert('Vou continuar aqui!')
        return
      } else if (value !== '') {
        alert('Vou mudar de página!')
      }
    })
  };*/

  return (
    <div className='Form'>
      <div className='card'>
        <div className='front-card'>
          <div className='card-data'>
            <img src={cardimg} className='card-img-white' alt='white-round-cricles'></img>
            <p className='cd-1'>{cardNumber}</p>
            <p className='cd-2'>{cardName}</p>
            <p className='cd-3'>{cardMonth}/{cardYear}</p>
          </div>
          <img src={fcard} className='fcard' alt='purple-front-card'></img>
        </div>
        <div className='back-card'>
          <p>{cardCvc}</p>
          <img src={bcard} className='bcard' alt='grey-back-card'></img>
        </div>
      </div>
      <picture>
      </picture>
      {button ? 
        <form className='formulary' onSubmit={handleSubmit}>
        <label>CARDHOLDER NAME</label>
        <input 
          type='text' 
          name='name'
          placeholder='e.g. Jane Appleseed' 
          className='cardholder-name-input'
          onChange={handleAddName}
        />
        {cardName === '' ? <p className='error'>Can't be blank!</p> : null}
        <label htmlFor='card-number-input'>CARD NUMBER</label>
        <IMaskInput
          mask={"0000 0000 0000 0000"}
          name='number'
          placeholder = 'e.g. 1234 5678 9123 0000'
          type='text' maxLength='20'
          className='card-input'
          onChange={handleAddNum}
        />
        {cardNumber === '' ? <p className='error'>Can't be blank!</p> : null}
        {cardNumber.length < 19 ? <p className='error'>Wrong format, numbers missing!</p> : null}
        <div className='exp-cvc'>
          <div className='first-child-exp'>
            <label>EXP. DATE (MM/YY)</label>
            <IMaskInput 
              mask={"00"} type='text' 
              name='month'
              className='month-number-input' 
              maxLength={'2'} placeholder='MM'
              onChange={handleAddMonth} 
            />
            <IMaskInput 
              mask={"00"} 
              type='text' 
              name='year'
              className='year-number-input' 
              maxLength={'2'} 
              placeholder='YY' 
              onChange={handleAddYear}
            />
            {cardMonth === '' || cardYear === '' ? <p className='error'>Can't be blank!</p> : null}
          </div>
          <div className='second-child-cvc'>
            <label>CVC</label>
            <IMaskInput 
              mask={"000"} 
              type='text' 
              name='cvc'
              className='cvc-input' 
              maxLength={'3'} 
              placeholder='e.g. 123' 
              onChange={handleAddCvc}
            />
            {cardCvc === '' ? <p className='error'>Can't be blank!</p> : null}
          </div>
        </div>
        <button type='submit' className='button' onClick={() => {
          submitConditions();
          console.log(createObject());
          }}>Confirm</button>
      </form>
        :
        <div className='greetings'>
          <img src={iconcomplete} alt='checked-form-was-submited'></img>
          <h1>THANK YOU!</h1>
          <p>We've added your card details</p>
          <button type='submit' className='button' onClick={() => submitConditions()}>Continue</button>
        </div>
      }
      
    </div>
  );
}

export default App;

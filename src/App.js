import React, {useState} from 'react'

function App() {
  const[calc, setCalc] = useState(''); //right side of calculator
  const[result, setResult] = useState(''); // left/small side of calculator

  const ops = ['/', '*', '+', '-', '.'];


  //update value when click on button
  const updateCalc = (value) => {
    if (
        ops.includes(value) && calc === '' ||
        ops.includes(value) && ops.includes(calc.slice(-1))
      ) {
        return; //return nothing..to avoid double operator in a calculation. (eg: 1 + - 2)
      }

    setCalc(calc + value);
    
    //non-ops, eg: no. 1 - 9
    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString()); //use eval(string) method; to evaluate everything inside..
    }
  }

  //show total in calc
  const calculate = () => {
    setCalc(eval(calc).toString()); 
    //will only return the cal, not + value as fx above..why? because to only return the total of the cal, if include 'value' '=' button must be a value.
  }

  //delete
  const deleteLast = () => {
    // if (calc == '') { //if the calc (eg: 1 + 2) = string
    //   return; //(Optional) we want to return nothing because it's deleted.
    // }

    const value = calc.slice(0,-1); 
    //array.slice(staring index, ending index), start default index is 0.
    
    setCalc(value);
  }

//digit button
  const createDigits= () => {

    const digits = [];

    for (let i = 1; i < 10 ; i++) {
      digits.push(
        <button 
          onClick={() => updateCalc(i.toString())} 
          key={i}>
            {i}
        </button>
      )
    }
    return digits;
  }

  return (
    <div className="App">
      <div className='calculator'>
        <div className='display'>
         {result ? <span>({result})</span> : ''} 

         {calc || '0'}
        </div>
        <div className='operators'>
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={deleteLast}>DEL</button>
        </div>

        <div className='digits'>
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button onClick={calculate}>=</button>
        </div>
        <div className='reset'>
          <button onClick={() => setCalc('')}>Reset</button> 
          {/* setCalc to '' only because as at 'display' above we already set the calc to 0 as default
          if we setCalc('0'), it will display '0' as first number in 'calc' */}
        </div>
      </div>
    </div> 
  );
}

export default App;

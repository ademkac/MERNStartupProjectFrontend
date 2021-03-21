import React, { useReducer, useEffect } from 'react';

import { validate } from '../../../util/validators';
import './Input.css';


const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      }
    }
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : props.type === 'date' ? (
      <input 
      id={props.id}
        type="date"
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
       />
    ) : props.type === 'select' ? (
      <select value={inputState.value} onChange={changeHandler} onBlur={touchHandler}>
        <option value="Short working hours">Short working hours</option>
        <option value="Part time">Part time</option>
        <option value="Full time">Full time</option>
      </select>
    ) : props.type === 'select1' ? (
      <select value={inputState.value} onChange={changeHandler} onBlur={touchHandler}>
        <option value="Startup funding non">Startup funding non</option>
        <option value="Startup funding">Startup funding</option>
        <option value="Global startup">Global startup</option>
        <option value="Covid startup">Covid startup</option>
        <option value="Startup competition">Startup competition</option>
      </select>
    ) 
    :(
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) 

  return (
    <div
      className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p style={{}}>{props.errorText}</p>}
    </div>
  );
};

export default Input;

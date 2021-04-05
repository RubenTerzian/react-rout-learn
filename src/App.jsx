import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const validators = {
  firstName: {
    require: {
      type: true,
      message: 'firstName is required',
    },
    pattern: {
      type: /\w/i,
      message: 'Invalid firstName'
    }
  },
  lastName: {
    require: {
      type: true,
      message: 'lastName is required',
    },
    pattern: {
      type: /D/gi,
      message: 'Invalid lastName'
    }
  },
}

const convertImage = file => {
  return new Promise((res, rej) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      res(fileReader.result)
    }
    fileReader.onerror = e => rej(e);
    fileReader.readAsDataURL(file)
  })
}

const updateUserInfo = body => {
  return fetch(
    'https://hipstagram-api.herokuapp.com/users/current',
    {
      body: JSON.stringify(body),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZjRjMzgxY2UyY2IxMDAxNzU0ZDEwYSIsImlhdCI6MTYxNzYzOTg1MH0.bahcWU0SczE-VdCd-tpqb8GdFi6TSA0HBuT2DYvdAGE'
      }
    }
  )
}

const validateImg = async file => {
  if (!file.type.match(/^(image)\/(png|jpeg|jpg)$/g))
    throw new Error('Image should be file type: png, jpeg, jpg');
  if (file.size/(1024**2) > 2)
    throw new Error('Image should be less or equal 2 mb'); 
}

const useForm = (data) => {
  const [state, setState] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    avatarUrl: data.avatarUrl,
  });

  const [errors, setErrors] = useState({});

  const handleChechValidation = e => {
    const {name, value} = e.target;
    const validationRules = validators[name];
    if (!validationRules) return;

    for(let rule in validationRules) {
      if (rule === 'require') {
        if (value.length) {
          const newError = {...errors};
          delete newError[name];
          continue;
        }
        setErrors({
          ...errors, 
          [name]: {name: rule, message: validationRules[rule].message}
        })
        break;
      }

      if (rule === 'pattern') {
        if (!value.match(validationRules[rule].type)?.length) {
          const newError = {...errors};
          delete newError[name];
          continue;
        }
        setErrors({
          ...errors, 
          [name]: {name: rule, message: validationRules[rule].message}
        })
        break;
      }
    }
  }

  const handleChange = e => {
    handleChechValidation(e);
    setState(state => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleChangeAvatar = async e => {
    try {
      const formData = new FormData()
      await validateImg(e.target.files[0])
      const result = await convertImage(e.target.files[0]);
      setState({...state, avatar: result});
    } catch(e) {
      alert(e.message)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await updateUserInfo(state)
    } catch (err) {
      alert(err.message)
    }
  }

  return {errors, state, handleChange, handleChangeAvatar, handleSubmit}
}

const data  = {
  "firstName": "Danil",
  "lastName": "",
  "avatar": "",
  "email": "example@example.com",
  "login": "likeishutin"
};

function App() {
  const {errors, state, handleChange, handleChangeAvatar, handleSubmit} = useForm(data);
  console.log(errors)
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <img src={state.avatar || 'logo192.png'} alt="/"/>
        <input type="file" onChange={handleChangeAvatar}/>
        <input value={state.firstName} type="text" name="firstName" onChange={handleChange}/>
        <input value={state.lastName} type="text" name="lastName" onChange={handleChange}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

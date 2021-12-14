import React, { useContext, useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, FormControlLabel, FormLabel, InputLabel, Radio, RadioGroup } from '@mui/material';
import { validationSchema } from './validationSchema';
import { TextError } from '../Shared/TextError';
import { CustomInputComponent } from '../Shared/CustomInputComponent';
import { TaskContext } from '../../TaskContext';
import './styles.css';

function FormPage(props) {
  const [task, setTask] = useContext(TaskContext);
  const [success, setSuccess] = useState(false);
  const [formData, updateFormData] = useState({
    id: (props.item) ? props.item.id : Date.now().toString(36) + Math.random().toString(36).substr(2),
    title: (props.item) ? props.item.title : '',
    description: (props.item) ? props.item.description : '',
    gift: (props.item) ? props.item.gift : '',
    level: (props.item) ? props.item.level : 'low',
    done: false
  });

  function handleSubmitForm() {
    if (props.item) {
      setTask(
        task.map(item =>
          item.id === props.item.id
            ? { ...item, title: formData.title, description: formData.description, gift: formData.gift, level: formData.level }
            : item
        ))
    }
    else {
      task.push(formData);
    }
    setSuccess(true);
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    updateFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (success) props.onCloseModal();
  }, [props, success]);

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={handleSubmitForm}
      enableReinitialize
    >
      <Form>
        <InputLabel id="title" style={{ marginTop: '1rem' }}>Task Title</InputLabel>
        <Field
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          component={CustomInputComponent}
          variant="outlined"
          style={{ width: '100%' }}
        />
        <ErrorMessage
          name="title"
          component={TextError}
          className="invalid-feedback"
        />
        <InputLabel id="description" style={{ marginTop: '1rem' }}>Task Description</InputLabel>
        <Field
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          component={CustomInputComponent}
          variant="outlined"
          style={{ width: '100%' }}
          rows={3}
          multiline
        />
        <ErrorMessage
          name="description"
          component={TextError}
          className="invalid-feedback"
        />
        <InputLabel id="gift" style={{ marginTop: '1rem' }}>Gift and KPI fot this task ;)</InputLabel>
        <Field
          name="gift"
          value={formData.gift}
          onChange={handleInputChange}
          component={CustomInputComponent}
          variant="outlined"
          style={{ width: '100%' }}
        />
        <ErrorMessage
          name="gift"
          component={TextError}
          className="invalid-feedback"
        />
        <FormLabel component="legend" style={{ marginTop: '1rem' }}>Level</FormLabel>
        <RadioGroup row aria-label="level" name="level" >
          <FormControlLabel value="low" onChange={handleInputChange} control={<Radio checked={formData.level === 'low'} />} label="Low" />
          <FormControlLabel value="medium" onChange={handleInputChange} control={<Radio checked={formData.level === 'medium'} />} label="Medium" />
          <FormControlLabel value="high" onChange={handleInputChange} control={<Radio checked={formData.level === 'high'} />} label="High" />
        </RadioGroup>
        <div className="Centred">
          <Button style={{ width: '40%', margin: '1rem 0' }} variant="contained" type="submit" >{(props.item) ? `Edit Tasks` : `Add To Tasks`}</Button>
        </div>
      </Form>
    </Formik >
  );
}

export default FormPage;

import { useState } from 'react';
import Card from '../UI/Card';
import './EventForm.css';

function EventForm(props){
    const todayDate = new Date().getFullYear()+'-'+('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+new Date().getDate()).slice(-2);
    const maxDate= new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().slice(0, 10);

    const [title,setTitle]= useState('');
    const [location,setLocation]= useState('');
    const [category,setCategory]= useState('');
    const [startDate,setStartDate]= useState('');
    const [endDate,setEndDate]= useState('');
    const [image,setImage]= useState('');
    const [published,setPublished]= useState('true');
    const [paid,setPaid]= useState('false');
    const [description,setDescription]= useState('');
    const [errorMessage,setError]= useState('');

    const submitHandler =(event)=> {
        setError('');
        if(title !=='' && endDate !=='' && image !=='' &category!=='' && startDate !=='' &description!=='' && location !=='' ){
            event.preventDefault();
            const eventData ={
                id: Date.now(),
                title: title,
                description: description,
                location:location,
                startDate: startDate,
                endDate: endDate,
                image:image,
                category:category,
                published:published,
                paid:paid
            };
            props.submitEvent(eventData);
            clearData();
        }
        else{
            event.preventDefault();
            setError('Please Enter All Fields...!');
        }

    }
    const clearData = ()=> {
        setTitle('');
        setLocation('');
        setCategory('');
        setStartDate('');
        setEndDate('');
        setImage('');
        setPublished('true');
        setPaid('false');
        setDescription('');
    }
    return(
        <Card className='event__form h-100'>
            <h3>Add New Event</h3>
            <form onSubmit={submitHandler}>
                {errorMessage && <div className='alert alert-danger alert-dismissible fade show'>{errorMessage}</div>}
                <div className='row'>
                    <div className='form-group col-md-4  mb-4'>
                        <input type='text' className='form-control' id='title' placeholder='Title' value={title} 
                        onChange={(e)=>{
                            setTitle(e.target.value);
                        }}/>
                    </div>
                    <div className='form-group col-md-4  mb-4'>
                        <input type='text' className='form-control' id='location' placeholder='Location' value={location}
                        onChange={(e)=>{
                            setLocation(e.target.value);
                        }}/>
                    </div>
                    <div className='form-group col-md-4  mb-4'>
                        <select className='form-control'value={category} 
                        onChange={(e)=>{
                            setCategory(e.target.value);
                        }}>
                            <option defaultValue={''}>Category</option>
                            <option value='Party'>Party</option>
                            <option value='Wedding'>Wedding</option>
                            <option value='Birthday'>Birthday</option>
                            <option value='Farewell'>Farewell</option>
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='form-group col-md-4  mb-4'>
                        <input className='form-control' onFocus={(e) => (e.currentTarget.type = 'date')} onBlur={(e) => (e.currentTarget.type = 'text')} id='startDate' placeholder='Start date' min= {todayDate} max={maxDate} value={startDate} 
                        onChange={(e)=>{
                            setStartDate(e.target.value);
                        }}/>
                    </div>
                    <div className='form-group col-md-4  mb-4'>
                        <input  className='form-control' onFocus={(e) => (e.currentTarget.type = 'date')} onBlur={(e) => (e.currentTarget.type = 'text')} id='endDate' placeholder='End date' min= {startDate} max={maxDate} value={endDate} 
                        onChange={(e)=>{
                            setEndDate(e.target.value);
                        }}/>
                    </div>
                    <div className='form-group col-md-4  mb-4'>
                        <input type='text' className='form-control' id='image' placeholder='Image Url' value={image} 
                        onChange={(e)=>{
                            setImage(e.target.value);
                        }}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='form-group col-md-4 d-inline-flex  mb-4'>
                        <label>Published :&nbsp; </label> 
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='published' id='published1' value={true} checked={published=='true'}
                            onChange={(e)=>{
                                setPublished(e.target.value);
                            }}/>
                            <label className='form-check-label' forhtml='published1'>Yes</label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='published' id='published2' value={false} checked={published=='false'}
                            onChange={(e)=>{
                                setPublished(e.target.value);
                            }}/>
                            <label className='form-check-label' forhtml='published2'>No</label>
                        </div>
                    </div>
                    <div className='form-group col-md-4 d-inline-flex  mb-4'>
                        <label>Paid :&nbsp; </label> 
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='paid' id='paid1' value={true} checked={paid=='true'}
                            onChange={(e)=>{
                                setPaid(e.target.value);
                            }}/>
                            <label className='form-check-label' forhtml='paid1'>Yes</label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='paid' id='paid2' value={false} checked={paid=='false'}
                            onChange={(e)=>{
                                setPaid(e.target.value);
                            }}/>
                            <label className='form-check-label' forhtml='paid2'> No</label>
                        </div>
                    </div>
                    <div className='form-group col-md-4  mb-4'>
                        <textarea  type='text' className='form-control' id='description' placeholder='Description' value={description} 
                        onChange={(e)=>{
                            setDescription(e.target.value);
                        }}/>
                    </div>
                </div>
                <div className='row offset-md-8 col-md-4'>
                    <button type='submit' className='btn  mb-4'>Add Event</button>
                </div>
            </form>
        </Card>
    )
}

export default EventForm;
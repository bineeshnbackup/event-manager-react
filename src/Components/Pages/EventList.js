import {useState ,useEffect} from 'react';
import EventItem from './EventItem'
import Card from '../UI/Card';
import './EventList.css'

function EventList(props){
    const todayDate = new Date().getFullYear()+'-'+('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+new Date().getDate()).slice(-2);
    const maxDate= new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().slice(0, 10);

    const [filterWord,setFilter]=useState('');
    const [currentEvents,setCurrentEvents]=useState(props.events);
    const [startDate,setStartDate]= useState('');
    const [endDate,setEndDate]= useState('');


    const categoryFilterHandler=()=>{
        if(filterWord){
            const filtred = props.events.filter( event => {
                return event.category ==filterWord;
            })
            setCurrentEvents(filtred);
        }else{
            setCurrentEvents(props.events);
        }
    };
    const dateFilterHandler=()=>{
        if(startDate &&endDate){
            const filtred = props.events.filter( event => {
                return ((event.startDate>=startDate)&&(event.startDate<=endDate));
            })
            setCurrentEvents(filtred);
        }else{
            setCurrentEvents(props.events);
        }
    };
    const clearFilters=()=>{
        setFilter('');
        setStartDate('');
        setEndDate('');
    };

    useEffect(() => {
        setCurrentEvents(props.events);
    }, [props.events]);
    useEffect(() => {
        categoryFilterHandler();
    }, [filterWord]);
    useEffect(() => {
        dateFilterHandler();
    }, [startDate,endDate]);
    
    return(
        <div className='events mt-5'>
            <h2>Event Details</h2>
            <Card >
                <div className='row'>
                    <div className='form-group col-md-3  mb-4'>
                        <label>Filter By Category :</label> 
                        <select className='form-control'value={filterWord} 
                        onChange={(e)=>{
                            setFilter(e.target.value);
                        }}>
                            <option value=''>No Filter</option>
                            <option value='Party'>Party</option>
                            <option value='Wedding'>Wedding</option>
                            <option value='Birthday'>Birthday</option>
                            <option value='Farewell'>Farewell</option>
                        </select>
                    </div>
                    <div className='form-group col-md-6  row'>
                        <label>Filter By Date :</label> 
                        <div className='form-group col-md-6  mb-4'>
                            <input  className='form-control' onFocus={(e) => (e.currentTarget.type = "date")} onBlur={(e) => (e.currentTarget.type = "text")} id='startDate' placeholder='From' min= {todayDate} max={maxDate} value={startDate} 
                            onChange={(e)=>{
                                setStartDate(e.target.value);
                            }}/>
                        </div>
                        <div className='form-group col-md-6  mb-4'>
                            <input  className='form-control' onFocus={(e) => (e.currentTarget.type = "date")} onBlur={(e) => (e.currentTarget.type = "text")} id='endDate' placeholder='To' min= {startDate} max={maxDate} value={endDate} 
                            onChange={(e)=>{
                                setEndDate(e.target.value);
                            }}/>
                        </div>
                    </div>
                    <div className='form-group col-md-3  mb-4'>
                        <button type='button' className='btn  mt-4' onClick={clearFilters}>Clear Filters</button>
                    </div>
                </div>
            </Card>
            {currentEvents.length === 0 && <h3 className='event-list__noEvent'>Events Not Found</h3>}
            {currentEvents.length !== 0 && <ul className='event-list'>
                {currentEvents.map((event) => (
                    <EventItem
                        key={event.id}
                        id={event.id}
                        title={event.title}
                        description={event.description}
                        location={event.location}
                        startDate={event.startDate}
                        endDate={event.endDate}
                        image={event.image}
                        category={event.category}
                        published={event.published}
                        paid={event.paid}
                    />
                ))}
            </ul>}
        </div>
    );
};

export default EventList;
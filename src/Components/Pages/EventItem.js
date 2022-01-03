import Card from '../UI/Card';
import './EventItem.css';
function EventItem(props){
    const startMonth = props.startDate.toLocaleString().split('-').reverse().join('/');
    const endMonth = props.endDate.toLocaleString().split('-').reverse().join('/');

    const today=new Date().getFullYear()+'-'+('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+new Date().getDate()).slice(-2);
    const available=(props.endDate.split('-').join('') >= today.split('-').join(''))?true:false;
    
    return(
        <>  
            {available && <li>
                <Card className='event-item '>
                    <div className='col-sm-12 event-item__body'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <h2>{props.title}</h2>
                                {props.description}
                                <p>From: {startMonth} To: {endMonth}</p>
                                <p><span>Category:&nbsp;</span>{props.category}</p>
                                <p><span>Published:&nbsp;</span>{props.published=='true'?'Yes':'No'}</p>
                                <p><span>Paid:&nbsp;</span>{props.paid=='true'?'Yes':'No'}</p>
                            </div>
                            <div className='col-md-6 event-item__body__imgBlock'>
                                <div className='col-sm-12'>
                                    <img src={props.image} alt='Event Image'/>
                                    </div>
                                <div className='col-sm-12 event-item__body__location'>
                                    <img src={require('../../Images/location.png')} alt='Event Image'/>
                                    <p>{props.location}</p>
                                </div>
                            </div>
                        </div>  
                    </div>
                </Card>
            </li>}
        </>
    )
}
export default EventItem;
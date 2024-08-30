import './Name.css';
function Name({firstName, lastName}) {
    return (
        <div>
            <h1 className='text-blue'>
                {firstName} <span>{lastName}</span></h1>
        </div>
    )
    
}

export default Name;
import React from 'react'

const City = (props) => {

    const {name, region, country, onClick} = props;
    return (
        <div className='city' onClick={onClick}>
            <div className='col'>
                <p className='city__name'>{name}</p>
                <p className='city__region'>{region}</p>
            </div>
            <div className='col'>
                <p className='city__country'>{country}</p>
            </div>
        </div>
    )
}

export default City

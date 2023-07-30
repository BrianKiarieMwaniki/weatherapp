import React from 'react'

export const LocationPopup = ({onCancel}) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <p className='popup-content__text'>Allow <strong>Weather App</strong> to get your location.</p>
            </div>
            <div className="popup-actions">
                <button className='popup-actions__btn' onClick={onCancel}>Cancel</button>                
            </div>
        </div>
    )
}

export default LocationPopup

import React from 'react'
import './Popup.css'
import { Icon } from '@iconify/react';

export const Popup = ({onXClick, children}) => {
  return (
    <div className="Popup">
        <div className="popup-inner">
        <span className='popup-close-btn' onClick={onXClick}>
            <Icon icon="mdi:alpha-x-circle" color="white" width="40" height="40"/>
        </span>
          {children}
        </div>
    </div>
  )
}

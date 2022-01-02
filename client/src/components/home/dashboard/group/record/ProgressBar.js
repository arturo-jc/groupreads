import React from 'react'

const ProgressBar = ({ completed }) => {
    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 5,
        margin: "1rem 0"
    }

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        borderRadius: 'inherit',
        textAlign: 'right'
      }
    
      const labelStyles = {
        padding: 5,
        color: 'white',
      }

    return (
        <div style={containerStyles}>
            <div className={`progress-bar-${Math.floor(completed/10) * 10}`} style={fillerStyles}>
                <span style={labelStyles}>{`${completed}%`}</span>
            </div>
        </div>
    )
}

export default ProgressBar;
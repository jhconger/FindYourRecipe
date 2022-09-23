import React from 'react';

export default ({pagination, setPagination}) =>{
    const prevClick =()=>{
        if (pagination === 0) {
            return;
        }
            setPagination(pagination - 10);
    }
    const nextClick =()=>{
        setPagination(pagination + 10);
    }

    return (
        <div>
            <h1>Result</h1>
            <p onClick={prevClick}>Prev</p>
            <p onClick={nextClick}>Next</p>
        </div>
    )
}

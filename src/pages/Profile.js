import React, { useState } from 'react';
import CardContainer from './../components/Profile/CardContainer';
import CardForm from './../components/Profile/CardForm';
function Profile() {
    const [updatedData, setUpdatedData] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const editHandler = (enteredData) => {
        const data = { ...enteredData };
        setUpdatedData(data);
    };
    const editModeHandler = (status) => {
        setIsEditMode(status);
    };

    return (
        <div className='profile-container container-fluid'>
            <div className='page-title'>User Profile</div>
            <CardContainer
                onUpdated={{ ...updatedData }}
                onEditMode={isEditMode}
            >
                <CardForm
                    onEditData={editHandler}
                    onEditMode={editModeHandler}
                />
            </CardContainer>
        </div>
    );
}

export default Profile;

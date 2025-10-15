import React from 'react';

const getChildID = (children) => {
    const child = React.Children.only(children);
    if ("id" in child.props) {
        return child.props.id;
    }
}

const Field = ({ label, children, htmlFor, error }) => {
    const id = htmlFor || getChildID(children);
    
    return (
        <div className="mb-6">
            {label && <label htmlFor={id} className='auth-label block mb-2' >{label}</label>} 
            {children}
            {error?.message && (
                <div role="alert" className='text-red-400 text-sm mt-1 animate-pulse'>
                    {error.message}
                </div>
            )}
        </div>
    );
};

export default Field;

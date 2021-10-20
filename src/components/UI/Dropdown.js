import { Multiselect } from 'multiselect-react-dropdown';
import React from 'react';
import './Dropdown.css';
function Dropdown(props) {
    return (
        <Multiselect
            id={props.id}
            options={props.options}
            displayValue={props.display}
            placeholder={props.placeholder}
            selectedValues={props.selected}
            onSelect={props.onSelect}
            style={{
                multiselectContainer: {
                    padding: '0 15px',
                    marginBottom: '1rem',
                },
                searchBox: {
                    borderRadius: '20px',
                    padding: '1rem',
                    paddingRight: '1.5rem',
                    border: '1px solid #9F9F9F',
                    fontSize: '1.25rem',
                    fontFamily: 'Poppins, sans-serif',
                    color: '#9F9F9F',
                },
                chips: {
                    fontSize: '1.25rem',
                    background: '#FFBA33',
                    color: '#6A4029',
                },
                optionContainer: {
                    background: '#6A4029',
                    color: 'white',
                },
                option: { color: 'white' },
            }}
        />
    );
}

export default Dropdown;

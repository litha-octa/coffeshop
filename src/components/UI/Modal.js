import React from 'react';
import { Modal } from 'react-bootstrap';
import Button from './Button';
function ModalCustom(props) {
    return (
        <Modal
            animation={false}
            {...props}
            size='md'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            contentClassName='round-modal'
        >
            <Modal.Body
                style={{
                    textAlign: 'center',
                    paddingTop: '3rem',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.5rem',
                }}
            >
                <p
                    style={{
                        margin: '0',
                    }}
                >
                    {props.msg}
                </p>
            </Modal.Body>
            <Modal.Footer
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    height: 'fit-content',
                    paddingBottom: '0',
                    padding: '1rem 2rem 2rem 2rem',
                    border: 'none',
                }}
            >
                <Button
                    onClick={props.onHide}
                    variant={props.btnvariant}
                    label={props.btnlabel}
                    style={{
                        fontSize: '1rem',
                        height: 'fit-content',
                        width: '1rem',
                    }}
                />

                {props.onConfirmation && (
                    <Button
                        onClick={props.onConfirmation}
                        variant={props.btnvariant2}
                        label={props.btnlabel2}
                        style={{
                            fontSize: '1rem',
                            height: 'fit-content',
                        }}
                    />
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCustom;

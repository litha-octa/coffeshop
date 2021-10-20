import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

function Breadcrumb(props) {
    const { item1, item2, item3 } = props;
    return (
        <>
            <div className='breadcrumb'>
                {item1 && (
                    <Link
                        to={props.link1}
                        className={
                            item1 && !item2 && !item3
                                ? 'breadcrumb-item-custom active'
                                : 'breadcrumb-item-custom'
                        }
                    >
                        {item1}
                    </Link>
                )}
                {item2 && (
                    <Link
                        to={props.link2 ? props.link2 : '#'}
                        className={
                            item1 && item2 && !item3
                                ? 'breadcrumb-item-custom active'
                                : 'breadcrumb-item-custom'
                        }
                    >
                        {item2}
                    </Link>
                )}
                {item3 && (
                    <Link
                        to={props.link3 ? props.link3 : '#'}
                        className={
                            item1 && item2 && item3
                                ? 'breadcrumb-item-custom active'
                                : 'breadcrumb-item-custom'
                        }
                    >
                        {item3}
                    </Link>
                )}
            </div>
        </>
    );
}

export default Breadcrumb;

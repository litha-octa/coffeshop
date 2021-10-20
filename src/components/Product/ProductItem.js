import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './Product.css';
import ProductCard from './ProductCard';
import Button from '../../components/UI/Button';

// import ProductIcon from './../../assets/images/product-icon1.png';
import axios from 'axios';

function ProductItem(props) {
    const [allProduct, setAllProduct] = useState();
    const [info, setInfo] = useState();
    // const [sort, setSort] = useState('');
    // const [search, setSearch] = useState('');

    const location = useLocation();
    let search = location.search.split('q=')[1] || '';
    // console.log(search);

    const BASE_URL = `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}`;
    const limit = 8;
    const numPage = [];

    let productItem;

    const getAllProducts = (url) => {
        axios
            .get(url)
            .then((res) => {
                setAllProduct(res.data.data.result);
                setInfo(res.data.data.info);
                // console.log(res.data.data);
            })
            .catch((err) => console.log(err));
    };

    // Get Product
    useEffect(() => {
        getAllProducts(
            `${BASE_URL}/products?sort=&limit=${limit}&page=&search=${search||''}&filter=${props.onCategory||''}`
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, props.onCategory]);
    if (info) {
        for (let i = 0; i < info.totalPage; i++) {
            numPage.push(
                <Button
                    key={i}
                    variant={`btn-prof-5 btn-product btn-pag ${
                        info.page === i + 1 ? 'active' : null
                    }`}
                    label={i + 1}
                    onClick={() =>
                        getAllProducts(
                            i === 0
                                ? `${BASE_URL}/products?sort=&limit=${limit}&page=&search=&filter=${props.onCategory}`
                                : `${BASE_URL}/products?sort=&limit=${limit}&page=${
                                      Number(i) + 1
                                  }&search=&filter=${props.onCategory}`
                        )
                    }
                />
            );
        }
        // console.log('iinfo', info);
    }

    // console.log(allProduct);

    if (allProduct) {
        productItem = allProduct.map((item) => {
            return (
                <div className='product-item col' key={item.id}>
                    <ProductCard
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        discount={item.discount}
                        icon={item.product_picture}
                    />
                </div>
            );
        });
    }

    return (
        <>
            <div className='product-item-container container-fluid row'>
                {productItem && productItem.length > 0 ? (
                    productItem
                ) : (
                    <div
                        className='product-item col product-note'
                        style={{
                            color: '#962b24',
                            fontWeight: '600',
                            fontStyle: 'italic',
                            marginBottom: '2rem',
                            background: '#cfadad',
                            borderRadius: '10px',
                            padding: '0.5rem',
                        }}
                    >
                        If you were looking for nothing, you found it.
                    </div>
                )}
            </div>

            <section className='pagination-section'>
                <div className='pagination-info col col-4'>
                    Showing{' '}
                    {allProduct && info
                        ? (info.page - 1) * 5 +
                          1 +
                          '-' +
                          Math.floor((info.page - 1) * 5 + allProduct.length)
                        : null}{' '}
                    out of {info ? info.count : null}
                </div>
                <div className='pagination-nav'>
                    <Button
                        variant='btn-prof-2 btn-product btn-pag prev'
                        label='<'
                        onClick={info ? () => getAllProducts(info.prev) : null}
                    />
                    {numPage}
                    <Button
                        variant='btn-prof-2 btn-product btn-pag next'
                        label='>'
                        onClick={info ? () => getAllProducts(info.next) : null}
                    />
                </div>
            </section>
        </>
    );
}

export default ProductItem;

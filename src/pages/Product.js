import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import ProductItem from './../components/Product/ProductItem';
import CouponItem from './../components/Coupon/CouponItem';
// import CouponCard from './../components/Coupon/CouponCard';
import Button from './../components/UI/Button';
import { connect } from "react-redux";

function Product(props) {
    const [categorySelected, setCategorySelected] = useState('');
    // const menu = 'favorite'; //fake test
    const isAdmin = props.user.role_id === 2 ? true:false;

    const location = useLocation();
    const history = useHistory();
    console.log(location);
    let search = location.search.split('=')[1];
    console.log(search);

    const editPromoAdmin = (
        <section className='admin-product-page'>
            {/* <Link to='/product/edit/5'>Edit promo</Link> */}
            <Link to='/product/add-promo'>Add new promo</Link>
        </section>
    );

    const editProductAdmin = (
        <section className='admin-product-page product'>
            {/* <Link to='#'>Edit product</Link> */}
            <Link to='/product/add'>Add new Product</Link>
        </section>
    );

    return (
        <div className='product-container container-fluid row'>
            <aside className='col left-side'>
                <section className='header-coupon'>
                    <div className='title'>Promo Today</div>
                    <div className='desc'>
                        Coupons will be updated every weeks. Check them out!
                    </div>
                </section>
                <section className='list-coupon'>
                    <CouponItem />
                </section>
                <section className='apply-coupon'>
                    <Button
                        variant='btn-prof-2 btn-product'
                        label='Apply Coupon'
                    />
                </section>
                <section className='footer-coupon'>
                    <b>Terms and Condition</b>
                    <ol className='term-condition'>
                        <li>You can onlu apply 1 coupon per day</li>
                        <li>It only for dine in</li>
                        <li>Buy 1 get 1 only for new user</li>
                        <li>Should make member card to apply coupon</li>
                    </ol>
                </section>
                {isAdmin && editPromoAdmin}
            </aside>
            <aside className='col col-8 right-side'>
                <section className='menu-category'>
                    <div
                        className={`menu-item ${
                            categorySelected === '' && 'active'
                        }`}
                        onClick={() => {
                            setCategorySelected('');
                            history.replace(location.pathname);
                        }}
                    >
                        Favorite & Promo
                    </div>
                    <div
                        className={`menu-item ${
                            categorySelected === 'category_id-1' && 'active'
                        }`}
                        onClick={() => {
                            setCategorySelected('category_id-1');
                            history.replace(
                                location.pathname + '?category=coffee'
                            );
                        }}
                    >
                        Coffee
                    </div>
                    <div
                        className={`menu-item ${
                            categorySelected === 'category_id-3' && 'active'
                        }`}
                        onClick={() => {
                            setCategorySelected('category_id-3');
                            history.replace(
                                location.pathname + '?category=non-coffee'
                            );
                        }}
                    >
                        Non Coffee
                    </div>
                    <div
                        className={`menu-item ${
                            categorySelected === 'category_id-2' && 'active'
                        }`}
                        onClick={() => {
                            setCategorySelected('category_id-2');
                            history.replace(
                                location.pathname + '?category=foods'
                            );
                        }}
                    >
                        Foods
                    </div>
                    <div
                        className={`menu-item ${
                            categorySelected === 'category_id-4' && 'active'
                        }`}
                        onClick={() => {
                            setCategorySelected('category_id-4');
                            history.replace(
                                location.pathname + '?category=add-on'
                            );
                        }}
                    >
                        Add-on
                    </div>
                </section>
                <main className='product-list'>
                    <ProductItem onCategory={categorySelected} />
                </main>

                <section className='product-note'>
                    <p>*the price has been cutted by discount appears</p>
                </section>
                {isAdmin && editProductAdmin}
            </aside>
        </div>
    );
}
;
// export default Home;
const mapStateToProps = (state) => ({
    user: state.user.results
  });

export default connect(mapStateToProps)(Product);
  
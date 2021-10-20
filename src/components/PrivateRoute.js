import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({ comp: Component, ...rest }) {
    const isLogin = rest.isLogin;
    console.log(rest);
    return (
        <Route
            {...rest}
            render={(props) =>
                isLogin ? <Component {...props} /> : <Redirect to='/home' />
            }
        />
    );
}
const mapStateToProps = (state) => {
    return { isLogin: state.auth.isLogin };
};
export default connect(mapStateToProps)(PrivateRoute);

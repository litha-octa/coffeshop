import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute({ comp: Component, ...rest }) {
  const isLogin = rest.isLogin;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                msg: "Anda sudah login",
              },
            }}
          />
        )
      }
    />
  );
}
const mapStateToProps = (state) => {
  return { isLogin: state.auth.isLogin };
};
export default connect(mapStateToProps)(PrivateRoute);

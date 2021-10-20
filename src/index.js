import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import PrivateRoute from './components/PrivateRoute';
import PrivateRouteAuth from './components/PrivateRouteAuth';
import NotFound from './pages/NotFound';

// public
import Home from './pages/Home';
import Header from './components/Home/Header';
import Footer from './components/Home/Footer';
//auth
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Register from './pages/Register';
//Main

const AppWithRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path='/home'>
                    <Header />
                    <Home />
                    <Footer />
                </Route>
                <PrivateRouteAuth path='/login' comp={Login} />
                <PrivateRouteAuth
                    path='/forgot-password'
                    comp={ForgotPassword}
                />
                <PrivateRouteAuth path='/reset-password' comp={ResetPassword} />
                <PrivateRouteAuth path='/Register' comp={Register} />
                <PrivateRoute path='/:section?' exact comp={App} />
                <PrivateRoute path='/:section/:page?' exact comp={App} />
                <PrivateRoute path='/:section/:page/:id?' exact comp={App} />
                <Route path='*' component={NotFound} />
            </Switch>
        </Router>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppWithRouter />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

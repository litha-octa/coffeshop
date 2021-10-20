import React from "react";
import Home from "./Home";
import "./../components/Home/home.css";
import Header from "./../components/Home/Header";
import Footer from "./../components/Home/Footer";
import NewPromo from "./NewPromo";
import EditPromo from "./EditPromo";
import Profile from "./Profile";
import History from "./History";
import Product from "./Product";
import ProductDetail from "./ProductDetail";
import ProductEdit from "./ProductEdit";
import ProductAdd from "./ProductAdd";
import Chat from "./Chat";
import ChatRoom from "./ChatRoom";
import ChatRoomAdmin from "./ChatRoomAdmin";
import Dashboard from "./Dashboard";
import { useParams } from "react-router-dom";
import PaymentAndDeliv from "./PaymentAndDeliv";

function App() {
  let { section, page } = useParams();
  console.log(section);
  // const renderSwitch = (section) => {
  //     switch (section) {
  //         case 'orders':
  //             return <EditPromo />;
  //         case 'promo':
  //             return <NewPromo />;
  //         case 'profile':
  //             return <Profile />;
  //         case 'product':
  //             return <Product />;
  //         default:
  //             return <Home />;
  //     }
  // };
  const renderSwitch = {
    orders: <PaymentAndDeliv />,
    profile: <Profile />,
    product: <Product />,
    history: <History />,
    chat: <Chat />,
    "chat-room": <ChatRoom />,
    "chat-admin": <ChatRoomAdmin />,
    dashboard: <Dashboard />,
  };
  const secondParam = {
    detail: <ProductDetail />,
    edit: <ProductEdit />,
    add: <ProductAdd />,
    "add-promo": <NewPromo />,
    "edit-promo": <EditPromo />,
  };
  return (
    <div className="App">
      <Header />
      {secondParam[page] ?? renderSwitch[section] ?? <Home />}
      <Footer />
    </div>
  );
}

export default App;

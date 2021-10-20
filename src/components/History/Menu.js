import React, { Component } from "react";
import "./History.css";

class Menu extends Component {
  render() {
    const { setSV } = this.props;
    const item = this.props.item;
    //   console.log(this.props.item)
    return (
      <div className="HistoryMenu">
        <img src="assets/menuHis.png" className="MenuPic" alt="menuHis" />
        <div className="MenuName">{item.name}</div>
        <div className="price-Menu">{item.price}</div>
        <input
          type="checkbox"
          className="checkboxMenu"
          value={item.id}
          onChange={(e) => setSV(e.target.value)}
        />
        <div className="status-Menu">Delivered</div>
      </div>
    );
  }
}

export default Menu;

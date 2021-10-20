import React, { Component } from "react";
import "./History.css";
import Menu from "./Menu";

class MiniTableMenu extends Component {
  render() {
    const { selectedP, setSelectedP } = this.props;
    const data = this.props.data;
    return (
      <div id="ListHistoryMenu">
        <div className="flexMenu">
          <div className="gridMenu">
            {data.slice(0, 5).map((item) => (
              <Menu
                item={item}
                sV={selectedP}
                setSV={(selectedPP) => setSelectedP(selectedPP)}
                key={item.id}
              />
            ))}
          </div>
          <div className="gridMenu">
            {data.slice(5, 10).map((item) => (
              <Menu
                key={item.id}
                item={item}
                sV={selectedP}
                setSV={(selectedPP) => setSelectedP(selectedPP)}
              />
            ))}
          </div>
          <div className="gridMenu">
            {data.slice(10, 15).map((item) => (
              <Menu
                key={item.id}
                item={item}
                sV={selectedP}
                setSV={(selectedPP) => setSelectedP(selectedPP)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MiniTableMenu;

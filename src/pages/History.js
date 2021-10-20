import React, { useEffect, useState } from "react";
import "../components/History/History.css";
import MiniTableMenu from "../components/History/MiniTableMenu";
import { getHistory } from "../redux/actions/history";
import { connect } from "react-redux";
import Axios from "axios";
function History(props) {
  const token = props.auth.results.token;
  const [selectedP, setSelectedP] = useState([]);
  useEffect(() => {
    props.getHistory(
      `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}/transaction/history?limit=15`,
      token
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   const deleteHistory = (arrDataDelete) => {
  //     for (const id_td in arrDataDelete) {
  //       deleteHistory(
  //         `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}/transaction/history/${arrDataDelete[id_td]}`,
  //         {},
  //         token
  //       );
  //     }
  //   };
  return (
    <div>
      <img
        src="assets/HistoryBg.png"
        className="body-history"
        alt="HistoryBg"
      />
      <div className="contentHistory">
        <div className="titleHistory">Let’s see what you have bought!</div>
        <div className="subtitleHistory">Select item to delete</div>
        <div
          id="selectAllHistory"
          onClick={() =>
            selectedP.map((id) =>
              Axios.delete(
                `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}/transaction/history/${id}`,
                { headers: { "auth-token": token } }
              ).then((result) => console.log(result))
            )
          }
        >
          delete
        </div>

        <div className="MiniTableMenu">
          {props.history.isFulfilled ? (
            <MiniTableMenu
              data={props.history.results[0]}
              selectedP={selectedP}
              setSelectedP={(selectedPP) =>
                setSelectedP([...selectedP, selectedPP])
              }
            />
          ) : (
            "loading...."
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    history: state.history,
    isLogin: state.auth.isLogin,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getHistory: (url, token) => dispatch(getHistory(url, token)),
});

const ConnectedHistory = connect(mapStateToProps, mapDispatchToProps)(History);

export default ConnectedHistory;

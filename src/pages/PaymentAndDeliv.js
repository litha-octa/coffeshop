import React, { useEffect, useState } from "react";
import "../components/PaymentAndDeliv/Payment.css";
import checklistPic from "../assets/images/green-check-icon.png";
import hazelnutPic from "../assets/images/product-icon1.png";
// import chickenFirePic from "../assets/images/chicken-fire-wings.png";
import { getTransaction, payTransaction } from "../redux/actions/transaction";
import Modal from "../components/UI/Modal";
import { connect } from "react-redux";
import ManageOrderAdm from "./ManageOrderAdm";

function PaymentAndDeliv(props) {
  const [modalShow, setModalShow] = useState(false);
  const [payment_method, setPayment_method] = useState("cash");
  console.log(typeof props.user.results.role_id);
  useEffect(() => {
    console.log("test");
    props.user.results.role_id === 1
      ? props.getTransaction(
          `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}/transaction`,
          props.token
        )
      : console.log("admin");
    // eslint-disable-next-line
  }, []);
  const handlePayment = (id_transaction) => {
    const data = { payment_method: payment_method };
    if (id_transaction) {
      props.payTransaction(
        `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}/transaction/${id_transaction}`,
        data,
        props.token
      );
    }
  };
  return (
    <>
      {props.user.results.role_id === 1 ? (
        <div>
          {props.bills.isPending ? (
            "loadind..."
          ) : (
            <div className="container-payment">
              <div className="order-step">
                <div className="step-order">
                  <img src={checklistPic} alt="" />
                  <div id="text-white-1">Order</div>
                </div>
                <hr id="order-line" />
                <div className="step-checkout">
                  <img src={checklistPic} alt="" />
                  <div id="text-white-2">Checkout</div>
                </div>
                <hr id="order-line" />
                <div className="step-payment">
                  <div id="black-circle"></div>
                  <div id="text-header">Payment</div>
                </div>
              </div>
              <div id="text-checkout">Checkout your item now!</div>
              <div className="card-content-container">
                <div className="summary-card">
                  <div id="text-summary">Order Sumarry</div>
                  {!props.bills.results.result ? (
                    <div id="text-summary">Your cart is clear!!!</div>
                  ) : (
                    <>
                      <div className="item-menu">
                        {props.bills.results.result.subResult.map((items) => (
                          <div className="item-container" key={items.id}>
                            <img
                              src={
                                items.product_picture
                                  ? items.product_picture
                                  : hazelnutPic
                              }
                              alt="product_picture"
                            />
                            <div className="item-desc">
                              <div className="item-name">
                                {items.product_name}
                              </div>
                              <div className="item-quantity">
                                {items.quantity}x
                              </div>
                              <div className="item-size">{items.size_name}</div>
                            </div>
                            <div className="price">
                              IDR {items.total_price_product}
                            </div>
                          </div>
                        ))}
                      </div>
                      <hr id="line-item" />
                      <div className="item-container">
                        <div className="item-desc">
                          <div className="item-name">Subtotal</div>
                        </div>
                        <div className="price">
                          IDR {props.bills.results.result.SUBTOTAL}
                        </div>
                      </div>
                      <div className="item-container">
                        <div className="item-desc">
                          <div className="item-name">Tax & Fees</div>
                        </div>
                        <div className="price">
                          IDR {props.bills.results.result.TAX}
                        </div>
                      </div>
                      <div className="item-container">
                        <div className="item-desc">
                          <div className="item-name">Shipping</div>
                        </div>
                        <div className="price">
                          IDR {props.bills.results.result.ship}
                        </div>
                      </div>
                      <div className="item-container mb-4">
                        <div id="total-text" className="item-desc">
                          <div className="item-name">Total</div>
                        </div>
                        <div id="total-text" className="price">
                          IDR {props.bills.results.result.TOTAL}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="user-order-card">
                  <div className="details-address">
                    <div className="details">Address Details</div>
                    <div className="edits">edits</div>
                  </div>
                  <div className="container">
                    <div className="address-container">
                      <div className="address">
                        <div className="user-address">
                          <span id="bold-text">
                            Delivery To : <br />{" "}
                          </span>
                          <span> {props.user.results.delivery_address}</span>
                        </div>
                        <hr id="line-item" />
                        <div className="user-phone">
                          {props.user.results.phone_number}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="details-address mt-4">
                    <div className="details">Payment Method</div>
                  </div>
                  <div className="container">
                    <div className="address-container">
                      <div className="address">
                        <div className="radio-btn">
                          <div id="btn-container">
                            <input
                              type="radio"
                              id="method"
                              name="method"
                              value="card"
                              onChange={(e) =>
                                setPayment_method(e.target.value)
                              }
                            />
                            <div id="card-image">
                              <img src="assets/card.png" alt="" />
                            </div>
                            <label htmlFor="card">Card</label>
                          </div>
                          <div id="btn-container">
                            <input
                              type="radio"
                              id="method"
                              name="method"
                              value="bank"
                              onChange={(e) =>
                                setPayment_method(e.target.value)
                              }
                            />
                            <div id="bank-image">
                              <img src="assets/bank.png" alt="" />
                            </div>
                            <label htmlFor="bank">Bank Account</label>
                          </div>
                          <div id="btn-container">
                            <input
                              type="radio"
                              id="method"
                              name="method"
                              value="cash"
                              onChange={(e) =>
                                setPayment_method(e.target.value)
                              }
                            />
                            <div id="cod-image">
                              <img src="assets/cod.png" alt="" />
                            </div>
                            <label htmlFor="method">Cash on Delivery</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="btn btn-confirm"
                    onClick={() => setModalShow(true)}
                  >
                    Confirm And Pay
                  </div>
                  <Modal
                    msg="You won't eat the north end of a south bound bear. Stop thinking, start eating."
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    btnvariant="btn-prof-2 outline col"
                    btnlabel="Cancel"
                    onConfirmation={() =>
                      handlePayment(props.bills.results.result.id)
                    }
                    btnvariant2="btn-prof-2  col"
                    btnlabel2="Confirm And Pay🤤"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <ManageOrderAdm />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.results.token,
  // dataUser: state.user.results,
  user: state.user,
  bills: state.transaction,
});
const mapDispatchToProps = (dispatch) => ({
  getTransaction: (url, token) => dispatch(getTransaction(url, token)),
  payTransaction: (url, data, token) =>
    dispatch(payTransaction(url, data, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PaymentAndDeliv);

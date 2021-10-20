import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import iconLocation from "../assets/images/location.png";
import iconUser from "../assets/images/user.png";
import iconLove from "../assets/images/love.png";
import teamwork from "../assets/images/teamwork-art.png";
import greenCheck from "../assets/images/green-check-icon.png";
import checkGreen from "../assets/images/check-grn.png";
import hugeGlobal from "../assets/images/huge-global.png";
import partnerNetflix from "../assets/images/partner-netflix.png";
import partnerReddit from "../assets/images/partner-reddit.png";
import partnerAmazon from "../assets/images/partner-amazon.png";
import partnerDiscord from "../assets/images/partner-discord.png";
import partnerSpotify from "../assets/images/partner-spotify.png";
import personPicViezh from "../assets/images/person-pic.png";
import personPicYessica from "../assets/images/yesicca-pic.png";
import personPicKim from "../assets/images/kim-pic.png";
import foodPicHazelnut from "../assets/images/hazelnut-latte.png";
import foodPicPinkyPromise from "../assets/images/pinky-promise.png";
import foodPicWings from "../assets/images/chicken-wings.png";
import stars from "../assets/images/stars.png";

import { getUser } from "../redux/actions/user";
import { connect } from "react-redux";

function Home(props) {
  const history = useHistory();
  const token = props.isLogin ? props.auth.results.token : "";
  console.log(props.user.results)
  // console.log('token', token);
  useEffect(() => {
    props.getUser(
      `${process.env.REACT_APP_DOMAIN_API}:${process.env.REACT_APP_PORT_API}/users`,
      token
    );

    // eslint-disable-next-line
  }, []);
  return (
    <main className="home-container container-fluid">
      <div className="banner">
        <div className="banner-section">
          <div className="banner-title">
            Start Your Day with Coffee and Good Meals
          </div>
          <div className="banner-description">
            We provide high quality beans, good taste, and healthy meals made by
            love just for you. Start your day with us for a bigger smile!
          </div>
          <button
            className="banner-button"
            onClick={() => history.push("/login")}
          >
            Get Started
          </button>
        </div>
        <div className="spoiler-box">
          <div className="spoiler-list">
            <div className="list-container">
              <div className="list-desc">
                <div className="list-icon">
                  <img src={iconLocation} alt="location" />
                </div>
              </div>
              <div className="list-desc">
                <div>90+</div>
                <div>Staff</div>
              </div>
            </div>
          </div>
          <div className="spoiler-list">
            <div className="list-container">
              <div className="list-desc">
                <div className="list-icon">
                  <img src={iconUser} alt="User" />
                </div>
              </div>
              <div className="list-desc">
                <div>30+</div>
                <div>Stores</div>
              </div>
            </div>
          </div>
          <div className="spoiler-list">
            <div className="list-container">
              <div className="list-desc">
                <div className="list-icon">
                  <img src={iconLove} alt="Love" />
                </div>
              </div>
              <div className="list-desc">
                <div>800+</div>
                <div>Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div id="image-team">
          <img src={teamwork} alt="teamwork" />
        </div>
        <section>
          <div className="section-title">
            We Provide Good Coffee and Healthy Meals
          </div>
          <div className="section-description">
            You can explore the menu that we provide with fun and have their own
            taste and make your day better.
          </div>
          <div className="section-list">
            <div>
              <img src={greenCheck} alt="green-check" />
              <span>High quality beans</span>
            </div>
            <div>
              <img src={greenCheck} alt="green-check" />
              <span>Healthy meals, you can request the ingredients</span>
            </div>
            <div>
              <img src={greenCheck} alt="green-check" />
              <span>
                Chat with our staff to get better experience for ordering
              </span>
            </div>
            <div>
              <img src={greenCheck} alt="green-check" />
              <span>
                Free member card with a minimum purchase of IDR 200.000.
              </span>
            </div>
          </div>
        </section>
      </div>
      <div className="section">
        <section>
          <div className="section-header">
            <div className="section-title">Here is People’s Favorite</div>
            <div className="section-description">
              Let’s choose and have a bit taste of poeple’s favorite. It might
              be yours too!
            </div>
          </div>
          <div className="section-body">
            <div className="card text-center">
              <div className="circle-fav-menu">
                <img src={foodPicHazelnut} className="food-style" alt="" />
              </div>
              <div className="card-header">Hazelnut Latte</div>
              <div className="card-body">
                <div className="section-list">
                  <div>
                    <img
                      src={checkGreen}
                      alt="check-green"
                      className="green-check"
                    />
                    <span>HazelnutSyrup</span>
                  </div>
                  <div>
                    <img
                      src={checkGreen}
                      alt="check-green"
                      className="green-check"
                    />
                    <span>Vanilla Whipped Cream</span>
                  </div>
                  <div>
                    <img
                      src={checkGreen}
                      alt="check-green"
                      className="green-check"
                    />
                    <span>Ice / Hot</span>
                  </div>
                  <div>
                    <img
                      src={checkGreen}
                      alt="check-green"
                      className="green-check"
                    />
                    <span>Sliced Banana on Top</span>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <h6 className="bold">IDR 25.000</h6>
                <button type="button" className="btn-select bold">
                  Order Now
                </button>
              </div>
            </div>
            <div className="card text-center">
              <div className="circle-fav-menu">
                <img src={foodPicPinkyPromise} className="food-style" alt="" />
              </div>
              <div className="card-header">Pinky Promise</div>
              <div className="card-body">
                <div className="section-list">
                  <div>
                    <img
                      src={checkGreen}
                      alt="check-green"
                      className="green-check"
                    />
                    <span>1 Shot of Coffee</span>
                  </div>
                  <div>
                    <img
                      src={checkGreen}
                      alt="check-green"
                      className="green-check"
                    />
                    <span>Vanilla Whipped Cream</span>
                  </div>
                  <div>
                    <img
                      src={checkGreen}
                      alt="check-green"
                      className="green-check"
                    />
                    <span>Chocolate Biscuits</span>
                  </div>
                  <div>
                    <img
                      src={checkGreen}
                      alt="check-green"
                      className="green-check"
                    />
                    <span>Strawberry Syrups</span>
                  </div>
                  <div>
                    <img
                      src={checkGreen}
                      alt="check-green"
                      className="green-check"
                    />
                    <span>Sliced strawberry on Top</span>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <h6 className="bold">IDR 30.000</h6>
                <button type="button" className="btn-select bold">
                  Select
                </button>
              </div>
            </div>
            <div className="card text-center">
              <div className="circle-fav-menu">
                <img src={foodPicWings} className="food-style" alt="" />
              </div>
              <div className="card-header">Chicken Wings</div>
              <div className="card-body">
                <div className="section-list">
                  <div>
                    <img
                      src={checkGreen}
                      alt="check-green"
                      className="green-check"
                    />
                    <span>Wings</span>
                  </div>
                  <div>
                    <img
                      src={checkGreen}
                      alt="check-green"
                      className="green-check"
                    />
                    <span>Drum Sticks</span>
                  </div>
                  <div>
                    <img
                      src={checkGreen}
                      alt="check-green"
                      className="green-check"
                    />
                    <span>Mayonaise and Lemon</span>
                  </div>
                  <div>
                    <img
                      src={checkGreen}
                      alt="check-green"
                      className="green-check"
                    />
                    <span>Hot Fried</span>
                  </div>
                  <div>
                    <img
                      src={checkGreen}
                      alt="check-green"
                      className="green-check"
                    />
                    <span>Secret Recipe</span>
                  </div>
                  <div>
                    <img
                      src={checkGreen}
                      alt="check-green"
                      className="green-check"
                    />
                    <span>Buy 1 Get 1 for Dine in</span>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <h6 className="bold">IDR 40.000</h6>
                <button type="button" className="btn-select bold " id="yellow">
                  Select
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="section">
        <section>
          <div className="section-header">
            <div className="section-title">
              Visit Our Store in the <br /> Spot on the Map Below
            </div>
            <div className="section-description">
              See our store in every city on the spot and spen your good day
              there. See you soon!
            </div>
          </div>
          <div className="section-body">
            <div className="map-picture">
              <img src={hugeGlobal} alt="map" className=""></img>
            </div>
          </div>
        </section>
      </div>
      <div className="section">
        <section>
          <div className="section-header">
            <div className="section-title">Our Partner</div>
          </div>
          <div className="section-body">
            <div className="sponsor-photos">
              <img
                src={partnerNetflix}
                alt="netflix"
                className="sponsor-item"
              ></img>
              <img
                src={partnerReddit}
                alt="reddit"
                className="sponsor-item"
              ></img>
              <img
                src={partnerAmazon}
                alt="amazon"
                className="sponsor-item"
              ></img>
              <img
                src={partnerDiscord}
                alt="discord"
                className="sponsor-item"
              ></img>
              <img
                src={partnerSpotify}
                alt="spotify"
                className="sponsor-item"
              ></img>
            </div>
          </div>
        </section>
      </div>
      <div className="section">
        <section>
          <div className="section-header">
            <div className="section-title">
              Loved by Thousands of Happy Customer
            </div>
            <div className="section-description">
              These are the stories of our customers who have visited us with
              great pleasure.
            </div>
          </div>

          <div className="section-body">
            <div className="testimonial-card">
              <div className="info">
                <img src={personPicViezh} className="profile-pic" alt="" />
                <div className="name">
                  Viezh Robert
                  <div className="address">Warsaw, Poland</div>
                </div>
                <div className="rate">
                  4.5
                  <img src={stars} className="stars-image" alt="" />
                </div>
              </div>
              <div className="comment">
                “Wow... I am very happy to spend my whole day here. the Wi-fi is
                good, and the coffee and meals tho. I like it here!! Very
                recommended!
              </div>
            </div>
            <div className="testimonial-card">
              <div className="info">
                <img src={personPicYessica} className="profile-pic" alt="" />
                <div className="name">
                  Yessica Christy
                  <div className="address">Shanxi, China</div>
                </div>
                <div className="rate">
                  4.5
                  <img src={stars} className="stars-image" alt="" />
                </div>
              </div>
              <div className="comment">
                “I like it because I like to travel far and still can make my
                day better just by drinking their Hazelnut Latte
              </div>
            </div>
            <div className="testimonial-card">
              <div className="info">
                <img src={personPicKim} className="profile-pic" alt="" />
                <div className="name">
                  Kim Young Jou
                  <div className="address">Seoul, South Korea</div>
                </div>
                <div className="rate">
                  4.5
                  <img src={stars} className="stars-image" alt="" />
                </div>
              </div>
              <div className="comment">
                “This is very unusual for my taste, I haven’t liked coffee
                before but their coffee is the best! and yup, you have to order
                the chicken wings, the best in town!
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="section">
        <div className="box-foot">
          <div className="section-header">
            <div className="section-title">Check our promo today!</div>
            <div className="section-description">
              Let's see the detail and pick yours!
            </div>
          </div>
          <button
            className="banner-button"
            onClick={() => history.push("/login")}
          >
            See Promo
          </button>
        </div>
      </div>
    </main>
  );
}

// export default Home;
const mapStateToProps = (state) => ({
  isLogin: state.auth.isLogin,
  auth: state.auth,
  user: state.user

});

const mapDispatchToProps = (dispatch) => ({
  getUser: (url, token) => {
    dispatch(getUser(url, token));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);

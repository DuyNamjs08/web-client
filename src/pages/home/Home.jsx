import React, { useState, useEffect } from "react";
import Helmet from "../../components/helmet/Helmet";
import { Container, Col, Row, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'

// api firebase
// import heroImg from "../assets/images/hero.png";
import HeroSection from "../../components/UI/hero-section/HeroSection";
import {
  collection,
  // getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-Config";
import heroImg from "../../assets/images/img/hero1.jpg";
import "./home.scss";
import "./hero-section.scss";
import Category from "../../components/UI/category/Category";

// delivery
import featureImg01 from "../../assets/images/service-01.png";
import featureImg02 from "../../assets/images/service-02.png";
import featureImg03 from "../../assets/images/service-03.png";

// catagory all product
// import products from "../assets/fake-data/products.js";
import ProductCard from "../../components/UI/product-card/ProductCard";
import foodCategoryImg01 from "../../assets/images/hamburger.png";
import foodCategoryImg02 from "../../assets/images/pizza.png";
// import foodCategoryImg03 from "../assets/images/bread.png";
import foodCategoryImg03 from "../../assets/images/bread.png";

// why choose we
import whyImg from "../../assets/images/location.png";

// testimonial
import TestimonialSlider from "../../components/UI/silder/TestimonialSlider";
import networkImg from "../../assets/images/network.png";

// static data
const featureData = [
  {
    title: "Quick Delivery",
    imgUrl: featureImg01,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },

  {
    title: "Super Dine In",
    imgUrl: featureImg02,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },
  {
    title: "Easy Pick Up",
    imgUrl: featureImg03,
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus, doloremque.",
  },
];
function Home(props) {
  const currentUser = useSelector((state) => state.ReducerCheckout.currentUser);
  const takeName = useSelector((state) => state.ReducerCheckout.takeName);
  const cartAr = useSelector((state) => state.ReducerCheckout.cartAr);
  const totalQuantity = useSelector((state) => state.ReducerCheckout.totalQuantity);
  const totalAmount = useSelector((state) => state.ReducerCheckout.totalAmount);
  const [category, setCategory] = useState("ALL");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotProduct, setHotProduct] = useState([]);
  

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("name", JSON.stringify(takeName));
    localStorage.setItem("cart", JSON.stringify(cartAr));
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
}, [currentUser,takeName,cartAr,totalQuantity,totalAmount]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "product"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        // console.log(list);
        setAllProducts(list);
        const filterCategory = list.filter(
          (item) => item.category === "Men Clothes"
        );
        const eachCatagory = filterCategory.slice(0, 4);
        setHotProduct(eachCatagory);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  // console.log("allProducts:", allProducts);
  
  const Loading = () => {
    return <div>loading .....</div>;
  };
  const ShowProduct = () => {
    return (
      <Row>
        {allProducts.map((item) => (
          <Col lg="3" md="4" sm="6" xs="12" key={item.id} className="mt-5">
            <ProductCard item={item} />
          </Col>
        ))}
      </Row>
    );
  };

  
  return (
    <Helmet title="home">
      <section className="pt-0">
        <HeroSection />
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content  ">
                <h5 className="mb-3">Easy way to make an order</h5>
                <h1 className="mb-4 hero__title">
                  <span>HUNGRY?</span> Up Style Up <br /> Enhanxed Style
                  <span> Straightway</span>
                </h1>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
                  magni delectus tenetur autem, sint veritatis!
                </p>

                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <button className="order__btn d-flex align-items-center justify-content-between">
                    Order now <i className="ri-arrow-right-s-line"></i>
                  </button>

                  <button className="all__foods-btn d-flex align-items-center  gap-5">
                    <Link className="d-flex align-items-center " to="/foods">
                      See more Products{" "}
                      <i className="ri-arrow-right-s-line"></i>
                    </Link>
                  </button>
                </div>

                <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">
                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i className="ri-car-line"></i>
                    </span>{" "}
                    No shipping charge
                  </p>

                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i className="ri-shield-check-line"></i>
                    </span>{" "}
                    100% secure checkout
                  </p>
                </div>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="hero-img" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ==== end hero ========  */}
      <section className="pt-0">
        <Category />
      </section>
      {/* ======== end catagory ========  */}
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h5 className="feature__subtitle mb-4">What we serve</h5>
              <h2 className="feature__title">Just sit back at home</h2>
              <h2 className="feature__title">
                we will <span>take care</span>
              </h2>
              <p className="mb-1 mt-4 feature__text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
                officiis?
              </p>
              <p className="feature__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aperiam, eius.
              </p>
            </Col>

            {featureData.map((item, index) => (
              <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                <div className="feature__item text-center px-5 py-3">
                  <img
                    src={item.imgUrl}
                    alt="feature-img"
                    className="w-25 mb-3"
                  />
                  <h5 className=" fw-bold mb-3">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      {/* ===== end title ===== */}

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2>Popular Products</h2>
            </Col>

            <Col lg="12">
              <div className="food__category d-flex align-items-center justify-content-center  ">
                <button
                  onClick={() => setCategory("ALL")}
                  className={`${category === "ALL" ? "foodBtnActive" : ""} `}
                >
                  All
                </button>
                <button
                  onClick={() => setCategory("BURGER")}
                  className={`${category === "BURGER" ? "foodBtnActive" : ""} `}
                >
                  <img src={foodCategoryImg01} alt="" />
                  Men Clothes
                </button>

                <button
                  onClick={() => setCategory("PIZZA")}
                  className={`${category === "PIZZA" ? "foodBtnActive" : ""} `}
                >
                  <img src={foodCategoryImg02} alt="" />
                  Women Clothes
                </button>

                <button
                  onClick={() => setCategory("BREAD")}
                  className={`${category === "BREAD" ? "foodBtnActive" : ""} `}
                >
                  <img src={foodCategoryImg03} alt="" />
                  Mobile
                </button>
              </div>
            </Col>

            {/* {allProducts.map((item) => (
              <Col lg="3" md="4" sm="6" xs="12" key={item.id} className="mt-5">
                <ProductCard item={item} />
              </Col>
            ))} */}
            <div>{loading ? <Loading /> : <ShowProduct />}</div>
          </Row>
        </Container>
      </section>

      {/* ========= end all item catagory ======== */}
      <section className="why__choose-us pt-0">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <img src={whyImg} alt="why-tasty-treat" className="w-100" />
            </Col>

            <Col lg="6" md="6">
              <div className="why__tasty-treat">
                <h2 className="tasty__treat-title mb-4">
                  Why <span>Chill Shop?</span>
                </h2>
                <p className="tasty__treat-desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorum, minus. Tempora reprehenderit a corporis velit,
                  laboriosam vitae ullam, repellat illo sequi odio esse iste
                  fugiat dolor, optio incidunt eligendi deleniti!
                </p>

                <ListGroup className="mt-4">
                  <ListGroupItem className="border-0 ps-0">
                    <p className=" choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i> Fresh and
                      tasty foods
                    </p>
                    <p className="choose__us-desc">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Quia, voluptatibus.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i> Quality
                      support
                    </p>
                    <p className="choose__us-desc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Qui, earum.
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i>Order from any
                      location{" "}
                    </p>
                    <p className="choose__us-desc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Qui, earum.
                    </p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ========== end why choose we  */}

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5 ">
              <h2>Hot Products</h2>
            </Col>

            {hotProduct.length > 0 ? hotProduct.map((item) => (
              <Col lg="3" md="4" sm="6" xs="12" key={item.id}>
                <ProductCard item={item} />
              </Col>
            )) : <div>loading ......</div>}
          </Row>
        </Container>
      </section>
      {/* ===== end hot product ========= */}

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="testimonial ">
                <h5 className="testimonial__subtitle mb-4">Testimonial</h5>
                <h2 className="testimonial__title mb-4">
                  What our <span>customers</span> are saying
                </h2>
                <p className="testimonial__desc">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Distinctio quasi qui minus quos sit perspiciatis inventore
                  quis provident placeat fugiat!
                </p>

                <TestimonialSlider />
              </div>
            </Col>

            <Col lg="6" md="6">
              <img src={networkImg} alt="testimonial-img" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Home;

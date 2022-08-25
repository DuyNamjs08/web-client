import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../../components/helmet/Helmet";
import CommonSection from "../../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "./product-details.scss";
import { doc, getDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-Config";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/action";
import ProductCard from "../../components/UI/product-card/ProductCard";

function ProductDetails(props) {
  const [allProducts, setAllProducts] = useState([]);
  const [data, setData] = useState({});
  const [loading, setloading] = useState(false);
  const { idProduct } = useParams();
  const [previewImg, setPreviewImg] = useState("");
  const dispatch = useDispatch();
  const [tab, setTab] = useState("desc");


  const handleView = useCallback(async () => {
    const docRef = doc(db, "product", idProduct);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data());
      setData(docSnap.data());
      setPreviewImg(docSnap.data().img[0].img);
      setloading(true);
    } else {
      console.log("No such document!");
    }
  }, [idProduct]);

  console.log("check img:", data.img);

  useEffect(() => {
    if (idProduct !== undefined && idProduct !== "") {
      handleView();
    }
  }, [handleView, idProduct]);

  const { id, title, price, category, description, img } = data;
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
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, [allProducts]);
  console.log("AllProducts:" ,allProducts);
  useEffect(()=>{
    window.scroll(0,0)
  },[data])
  return (
    <Helmet title="Product-Details">
      <CommonSection title={title} />
      <section className="product__details__container">
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="product__images mt-5 ">
                {loading ? (
                  data.img.map((item,index) => (
                    <div
                     key={index}
                      className="img__item mb-3"
                      onClick={() => setPreviewImg(item.img)}
                    >
                      <img src={item.img} alt="" className="w-100" />
                    </div>
                  ))
                ) : (
                  <div>Loading.....</div>
                )}
              </div>
            </Col>
            <Col lg="4" md="4">
              <div className="product__main-img">
                {loading ? (
                  <img src={previewImg} alt="" className="w-100" />
                ) : (
                  <div>Loading.....</div>
                )}
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{title} </h2>
                <p className="product__price">
                  Price: <span>{price}</span>
                </p>
                <p className="category mb-5">
                  Category: <span>{category}</span>
                </p>

                <button
                  className="addTOCart__btn"
                  onClick={() => dispatch(addItem({ id, title, img, price }))}
                >
                  Add to Cart
                </button>
              </div>
            </Col>
            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 pt-5 pb-3">
                <h6
                  className={`${tab === "desc" ? "tab__active" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "tab__active" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Review
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab__content">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="tab__form">
                  <div className="review pt-2">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email ">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>
                  <div className="review pt-2">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email ">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>
                  <div className="review pt-2">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email ">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>
                  <form className="form">
                    <div className="form__group">
                      <input type="text" placeholder="Enter your name" />
                    </div>

                    <div className="form__group">
                      <input type="text" placeholder="Enter your email" />
                    </div>

                    <div className="form__group">
                      <textarea
                        rows={5}
                        type="text"
                        placeholder="Write your review"
                      />
                    </div>

                    <button type="submit" className="addTOCart__btn">
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </Col>
            {/* ======== release product  */}

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">Release Product</h2>
            </Col>
            {loading ? allProducts.filter((item)=>item.category === category).map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                <ProductCard item={item} />
              </Col>
            )) : <div>Loading....</div>}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default ProductDetails;

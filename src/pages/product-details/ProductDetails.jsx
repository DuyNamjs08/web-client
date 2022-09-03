import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../../components/helmet/Helmet";
import CommonSection from "../../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "./product-details.scss";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-Config";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/action";
import ProductCard from "../../components/UI/product-card/ProductCard";
import Comment from "../../components/UI/comment.jsx/Comment";
import LightBox from "../../components/light-box/LightBox";

function ProductDetails() {
  const [allProducts, setAllProducts] = useState([]);
  const [data, setData] = useState({});
  const [loading, setloading] = useState(false);
  const { idProduct } = useParams();
  const [previewImg, setPreviewImg] = useState("");
  const dispatch = useDispatch();

  // =======comment ======

  const handleView = useCallback(async () => {
    const docRef = doc(db, "product", idProduct);
    const docSnap = await getDoc(docRef);
    const querySnapshot = await getDocs(collection(db, "product"));
    try {
      setData(docSnap.data());
      setPreviewImg(docSnap.data().img[0].img);
      setloading(true);
      let list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
        const commonProduct = list.filter(
          (item) => item.category === docSnap.data().category
        );
        setAllProducts(commonProduct);
      });
    } catch (error) {
      console.log("No such document!");
    }
  }, [idProduct]);

  const { id, title, price, category, description, img } = data;

  useEffect(() => {
    if (idProduct !== undefined && idProduct !== "") {
      handleView();
    }
  }, [idProduct]);

  return (
    <Helmet title="Product-Details">
      <CommonSection title={title} />
      <section className="product__details__container"> 
      <LightBox />
        <Container>
          <Row>
            {/* <Col lg="2" md="2">
              <div className="product__images mt-5 ">
                {loading ? (
                  data.img.map((item, index) => (
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
            </Col> */}
            <Col lg="6" md="6">
              <div className="product__main-img">
                {loading ? (
                  <img src={previewImg} alt="" className="w-100" />
                ) : (
                  <div>Loading.....</div>
                )}
                <div className="d-flex gap-4 mt-4">
                  {loading ? (
                    data.img.map((item, index) => (
                      <div
                        key={index}
                        className="img__item mb-3 d-flex"
                        onClick={() => setPreviewImg(item.img)}
                      >
                        <img src={item.img} alt="" className="img__bottom" />
                      </div>
                    ))
                  ) : (
                    <div>Loading.....</div>
                  )}
                </div>
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
                <div className="tab__content">
                  <p>{description}</p>
                </div>
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
                <h6 className="tab__active">Review</h6>
              </div>

              <div className="tab__form">
                <Comment />
              </div>
            </Col>
            {/* ======== release product  */}

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">Release Product</h2>
            </Col>

            {loading ? (
              allProducts
                .filter((item) => item.category === category)
                .map((item) => (
                  <Col
                    lg="3"
                    md="4"
                    sm="6"
                    xs="6"
                    className="mb-4"
                    key={item.id}
                  >
                    <ProductCard item={item} />
                  </Col>
                ))
            ) : (
              <div>Loading....</div>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default ProductDetails;

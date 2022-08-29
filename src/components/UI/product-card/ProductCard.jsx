
import React, { useState } from "react";
import "./product-card.scss";
import './item.scss'
import { Link } from "react-router-dom";
import { addItem } from "../../../redux/action";
import { useDispatch } from "react-redux";
import BtnSlider from "./BtnSlider";

function ProductCard({item}) {
  console.log("item :" , item );
  const { id, title, img, price } = item;
  const dispatch = useDispatch();
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== item.img.length) {
      setSlideIndex((prev) => prev + 1);
    } else if (slideIndex === item.img.length) {
      setSlideIndex(1);
    }
  };
  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex((prev) => prev - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(item.img.length);
    }
  };
  const moveDot = (index) => {
    setSlideIndex(index);
  };
  return (
    <div className="product__item">
      <div className="container-slider">
        {item.img.map((img, index) => (
          <div
            key={img.id}
            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
          >
            <img src={img.img} />
          </div>
        ))}
        <BtnSlider moveSlide={nextSlide} direction={"next"} />
        <BtnSlider moveSlide={prevSlide} direction={"prev"} />

        <div className="container-dots">
          {item.img.map((item, index) => (
            <div
              key={item.id}
              onClick={() => moveDot(index + 1)}
              className={slideIndex === index + 1 ? "dot active" : "dot"}
            >
            </div>
          ))}
        </div>
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/product/${id}`}>{title}</Link>
        </h5>
        <div className=" d-flex align-items-center justify-content-between ">
          <span className="product__price">${price}</span>
          <button
            className="addTOCart__btn"
            onClick={() => dispatch(addItem({ id, title, img, price }))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

import React from "react";
import "../../../style/product-card.scss";
import { Link } from "react-router-dom";
import { addItem } from "../../../redux/action";
import { useDispatch } from "react-redux";

function ProductCard(props) {
  const { id, title, img, price } = props.item;
  const dispatch = useDispatch();
  // const quantity=1

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={img[0].img} alt="product-img" className="w-50" />
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

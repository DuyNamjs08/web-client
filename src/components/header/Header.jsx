import React, { useRef,useEffect } from "react";
import logo from "../../assets/images/img/tinder.png";
import { Container } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import "../../style/header.scss";
import {useSelector,useDispatch} from 'react-redux'
import {toggleCart} from '../../redux/action'
const nav__link = [
  { display: "Home", path: "home" },
  { display: "Products", path: "product" },
  { display: "Cart", path: "cartpage" },
  { display: "Contact", path: "contact" },
];

function Header() {
  const dispatch =useDispatch()
  const totalQuantity = useSelector((state) => state.ReducerCheckout.totalQuantity);
  const totalAmount = useSelector((state) => state.ReducerCheckout.totalAmount);
  const cartAr = useSelector((state) => state.ReducerCheckout.cartAr);
  console.log('totalQuantity:',totalQuantity);
  console.log('totalAmount:',totalAmount);
  console.log('cartAr:',cartAr);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => window.removeEventListener("scroll");
  }, []);
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link to="/home">
              <img src={logo} alt="" />
            </Link>
            <h5>Chill Shop</h5>
          </div>
          {/* ======menu======= */}
          <div className="naviagtion" ref={menuRef}>
            <div className="menu d-flex align-items-center gap-5">
              <p onClick={toggleMenu}>x</p>
              {nav__link.map((item) => (
                <NavLink
                  onClick={toggleMenu}
                  key={item.display}
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>
          {/* ====right menu ===== */}
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={()=>dispatch(toggleCart())}>
              <i className="ri-shopping-bag-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>
            <span className="user">
              <Link to="/profile">
                <i className="ri-user-line"></i>
              </Link>
            </span>
            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
            <span className="header__avatar">
              <Link to="/login">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt=""
                />
              </Link>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;

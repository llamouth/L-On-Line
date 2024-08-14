import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./LogoCarousel.scss"
import image1 from "../../../Images/Lonline.png"
import image2 from "../../../Images/Lonline2.png"
import image3 from "../../../Images/Lonline3.png"


const LogoCarousel = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img src={image1} className="d-block w-100" />
            </Carousel.Item>
            <Carousel.Item>
                <img src={image2} className="d-block w-100" />
            </Carousel.Item>
            <Carousel.Item>                
                <img src={image3} className="d-block w-100" />
            </Carousel.Item>
        </Carousel>
    );
};

export default LogoCarousel;
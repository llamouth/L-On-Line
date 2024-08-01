import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./LogoCarousel.scss"


const LogoCarousel = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img src="../../Images/Lonline.png" className="d-block w-100" />
            </Carousel.Item>
            <Carousel.Item>
                <img src="../../Images/Lonline2.png" className="d-block w-100" />
            </Carousel.Item>
            <Carousel.Item>                
                <img src="../../Images/Lonline3.png" className="d-block w-100" />
            </Carousel.Item>
        </Carousel>
    );
};

export default LogoCarousel;
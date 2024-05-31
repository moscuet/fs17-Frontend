import React, { useState } from 'react';
import '../../styles/imageSlider.css';

interface ImageSliderProps {
    images: string[]; 
  }
  
  const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
      const [currentIndex, setCurrentIndex] = useState(0);
    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="slider">
        <button onClick={goToPrevious} className="left-arrow">&lt;</button>
        {/* <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} /> */}
        <img 
            src={"/assets/productLineImages/defaultProduct.webp"} 
            alt="Default Product" 
        />
        <button onClick={goToNext} className="right-arrow">&gt;</button>
    </div>
        
    );
};

export default ImageSlider;
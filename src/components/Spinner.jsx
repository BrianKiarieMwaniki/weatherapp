import React from 'react'
import {motion} from 'framer-motion';

export const Spinner = ()=> {
    return (
      <div className="spinner">
        <svg className="spinner__icon">
          <use xlinkHref="/symbols.svg#icon-clouds"></use>
        </svg>
        <motion.svg
          className="spinner__icon"
          initial={{ opacity: 0.9, y: -65 }}
          animate={{ opacity: 0.1, y: 120 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        >
          <use xlinkHref="/symbols.svg#icon-rain"></use>
        </motion.svg>
      </div>
    );
}

import Loading from '../Loading.json';
import Lottie from 'lottie-react';

export const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur z-50">
      <div className="w-1/2 h-4/5">
        <Lottie loop autoplay speed="1" background="transparent" animationData={Loading} />
      </div>
    </div>
  );
};
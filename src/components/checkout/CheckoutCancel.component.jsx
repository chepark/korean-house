import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutCancel = () => {
  let navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      navigate("/cart");
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return <div>Payment is cancelled.</div>;
};

export default CheckoutCancel;

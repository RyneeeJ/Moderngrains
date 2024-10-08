import toast from "react-hot-toast";
import Button from "../../ui/Button";
import TotalPrice from "../cart/TotalPrice";
import { useGetProfile } from "../profile/useGetProfile";
import { useUser } from "../authentication/useUser";

function Checkout({ cartItems }) {
  const {
    data: { address },
  } = useGetProfile();

  const confirmedItems = cartItems?.filter((item) => item.isConfirmed === true);
  const numItems = confirmedItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = confirmedItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  function checkout() {
    if (!address) {
      toast.error("Set up your address first in your profile");
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: confirmedItems,
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((json) => Promise.reject(json));
        return res.json();
      })
      .then((data) => {
        if (!data?.url) return;

        window.location.assign(data?.url);
      })
      .catch((e) => console.error(e.message));
  }

  if (confirmedItems.length === 0) return null;
  return (
    <div className="flex w-full items-center justify-between">
      <TotalPrice totalPrice={totalPrice} />
      <Button type="checkout" onClick={checkout}>
        Checkout {numItems} item
        {numItems > 1 ? "s" : ""}
      </Button>
    </div>
  );
}

export default Checkout;

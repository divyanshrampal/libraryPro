import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { toast } from "react-hot-toast";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  console.log("Printing Cart");
  console.log(cart);

  const borrowed = () => {
    toast.success("Books Borrowed");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {cart.length > 0 ? (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-md p-4 rounded-lg mb-4">
            <h2 className="text-2xl font-semibold mb-2">Your Bag</h2>
            <div>
              {cart.map((item, index) => (
                <CartItem key={item.id} item={item} itemIndex={index} />
              ))}
            </div>
          </div>

          <div className="bg-white shadow-md p-4 rounded-lg flex justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Summary</h2>
              <p>
                <span className="text-gray-600">
                  Total Books: {cart.length}
                </span>
              </p>
            </div>

            <div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                      onClick={borrowed}
              >
                Borrow Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-semibold mb-4">Your Cart is Empty !</h1>
          <Link to="/books">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Explore Books
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;

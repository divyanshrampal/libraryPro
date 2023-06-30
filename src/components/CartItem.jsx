import { FcDeleteDatabase } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

const CartItem = ({ item, itemIndex }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Book Removed");
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
      <img
        className="w-20 h-20 object-cover rounded"
        src={item.volumeInfo.imageLinks.thumbnail}
        alt={item.volumeInfo.title}
      />
      <div className="flex flex-col ml-4">
        <h1 className="text-xl font-semibold">{item.volumeInfo.title}</h1>
        <button
          className="flex items-center px-3 py-2 mt-4 bg-red-600 rounded-md w-[100px]"
          onClick={removeFromCart}
        >
          <FcDeleteDatabase className="mr-2" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;

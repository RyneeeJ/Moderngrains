import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { ORDERS_PAGE_SIZE } from "../../utils/constants";
import OrdersListItem from "./OrdersListItem";

import { useOrderHistory } from "./useOrderHistory";

function OrdersList() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("orders");

  const { data: ordersArr, count, error } = useOrderHistory();

  if (error) {
    console.log("ERRORRR", error.message);
    throw new Error(error.message);
  }

  if (!count)
    return (
      <p className="text-center">
        No {status === "all" ? "" : status} orders yet
      </p>
    );
  return (
    <>
      <ul className="space-y-2 overflow-y-auto border-y border-stone-200">
        {ordersArr?.map((item) => (
          <OrdersListItem key={item.id} item={item} />
        ))}
      </ul>
      <Pagination count={count} pageSize={ORDERS_PAGE_SIZE} />
    </>
  );
}

export default OrdersList;

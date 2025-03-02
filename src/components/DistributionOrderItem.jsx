import React from "react";

// Components
import StickyCell from "./StickyCell";
import TruncatedCell from "./TruncatedCell";

// Data
import addresses from "@/data/addresses";
import orderStatuses from "@/data/orderStatuses";

// Images
import reloadIcon from "../assets/images/icons/double-reload.svg";

// Utils
import { extractNumbers, formatDate, getPercentageBgColor } from "@/utils";
import Icon from "./Icon";
import DistributionOrderAlertDialog from "./DistributionOrderAlertDialog";

const DistributionOrderItem = ({ data = {}, index = 0, isScrolled }) => {
  let level = 0;
  const {
    status,
    _id: id,
    client_mobile: tel,
    total_price: price,
    created_at: timestamp,
    product_id: productId,
    client_name: firstName,
    client_address: address,
  } = data || {};

  const formattedAddress =
    addresses.find(({ value }) => value == address)?.label ||
    address ||
    "Mavjud emas!";

  const formattedStatus =
    orderStatuses.find(({ value }) => value == status)?.label || status;

  const statusColor =
    orderStatuses.find(({ value }) => value == status)?.color || "black";

  // Update level
  const addressNumber = Number(address) || -1;
  const firstNameLength = firstName?.length || 0;
  const telLength = extractNumbers(tel)?.length || 0;

  if (telLength === 12 || telLength === 9) level += 20;
  if (addressNumber > 0 && addressNumber < 15) level += 20;
  if (telLength === 12 && firstNameLength > 4) level += 10;
  if (firstNameLength > 3 && firstNameLength < 24) level += 20;
  if (
    telLength === 12 &&
    firstNameLength > 4 &&
    firstNameLength < 18 &&
    addressNumber > 0 &&
    addressNumber < 15
  ) {
    level += 20;
  }
  if (telLength < 8 || !telLength) level = 0;

  return (
    <tr className="group h-12 bg-neutral-50 even:bg-white">
      {/* Index */}
      <StickyCell children={index} isActive={isScrolled} />

      {/* User */}
      <TruncatedCell trunc="2">{firstName}</TruncatedCell>

      {/* Address */}
      <td>
        <address>{formattedAddress}</address>
      </td>

      {/* Phone */}
      <td>
        <a href={`tel:+${extractNumbers(tel)}`} className="primary-link">
          {tel}
        </a>
      </td>

      {/* Status */}
      <td style={{ color: statusColor }}>{formattedStatus}</td>

      {/* Product ID */}
      <td>
        <a
          target="_blank"
          className="primary-link"
          href={`https://menemarket.netlify.app/products/product/${productId}`}
        >
          {productId}
        </a>
      </td>

      {/* Price */}
      <td>{price?.toLocaleString()} so'm</td>

      {/* Date */}
      <td>{formatDate(timestamp)}</td>

      {/* Action */}
      <td>
        <DistributionOrderAlertDialog clientName={firstName} orderId={id}>
          <div className="flex justify-center w-full">
            <button aria-label="Reload" className="btn size-11">
              <Icon
                size={20}
                src={reloadIcon}
                alt="Reload icon"
                className="size-5"
              />
            </button>
          </div>
        </DistributionOrderAlertDialog>
      </td>
    </tr>
  );
};

export default DistributionOrderItem;

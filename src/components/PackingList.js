import React, { useEffect, useState } from "react";
import Api from "../api/api";

const PackingList = ({ tripId }) => {
  const [packingItems, setPackingItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  // Fetch packing items
  useEffect(() => {
    async function fetchPackingItems() {
      try {
        const items = await Api.getPackingList(tripId);
        setPackingItems(items);
      } catch (err) {
        console.error("Failed to fetch packing items", err);
      }
    }
    fetchPackingItems();
  }, [tripId]);

  // Add a new packing item
  async function handleAddItem() {
    if (!newItem.trim()) return; // Prevent empty input
    try {
      const res = await Api.addPackingItem(tripId, { item_name: newItem });
      setPackingItems([...packingItems, res.packingListItem]); // Correct state update
      setNewItem(""); // Clear input field
    } catch (err) {
      console.error("Failed to add packing item", err);
    }
  }

  // Toggle item checked status
  const handleToggleChecked = async (id, isChecked) => {
    try {
      const response = await Api.togglePackingItemStatus(id, !isChecked); // Update API method if exists
      setPackingItems(
        packingItems.map((item) =>
          item.id === id ? response : item
        )
      );
    } catch (err) {
      console.error("Failed to toggle item status", err);
    }
  };

  // Delete an item
  async function handleDeleteItem(itemId) {
    try {
      await Api.deletePackingItem(itemId);
      setPackingItems(packingItems.filter((item) => item.id !== itemId)); // Correctly updates local state
    } catch (err) {
      console.error("Failed to delete packing item", err);
    }
  }

  return (
    <div>
      <h2>Packing List</h2>
      <ul>
        {packingItems.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.is_checked}
                onChange={() => handleToggleChecked(item.id, item.is_checked)}
              />
              {item.item_name}
            </label>
            <button onClick={() => handleDeleteItem(item.id)}>🗑️</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default PackingList;

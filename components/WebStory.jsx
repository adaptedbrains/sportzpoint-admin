import Image from 'next/image';
import React, { useState } from 'react';

const WebStoryEditor = () => {
  const [webStory, setWebStory] = useState([
    {
      type: "image",
      cta_link: "",
      cta_text: "",
      title: "Shorts: Most Premier League Hat-Tricks",
      img_src: "media_files/HS0XY0piNxTd4bu6kcSZ.jpg",
      desc: "After Erling Haland scored his second hat-trick of the Premier League 2024-25 season, we present you all the players with the most Premier League hat-tricks.",
    },
    {
      type: "image",
      cta_link: "",
      cta_text: "",
      title: "10. Luis Suarez | 6 hat-tricks",
      img_src: "media_files/taLNv3ATwYkrqjWk84zg.jpg",
      desc: "The former Liverpool star scored 6 hat-tricks in his Premier League stint with the Reds. Suarez took only 110 games to score those 6 hat-tricks.",
    },
    // Add more items here as needed
  ]);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    setSelectedItem(item);
  };

  const handleSave = () => {
    const updatedWebStory = webStory.map((item) =>
      item.title === selectedItem.title ? selectedItem : item
    );
    setWebStory(updatedWebStory);
    setSelectedItem(null);
  };

  const handleAdd = () => {
    const newItem = {
      type: "image",
      cta_link: "",
      cta_text: "",
      title: "",
      img_src: "",
      desc: "",
    };
    setWebStory([...webStory, newItem]);
    setSelectedItem(newItem);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Web Story Editor</h1>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {webStory.map((item, index) => (
          <div
            key={index}
            className="relative border rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg"
            onClick={() => handleEdit(item)}
          >

            <Image
              src={item.img_src}
              alt={item.title}
              className=""
              width={300}
              height={200}
            />
           
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={handleAdd}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Add New Story
      </button>

      {/* Edit Form */}
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Story</h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Title</label>
              <input
                type="text"
                value={selectedItem.title}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, title: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Description</label>
              <textarea
                value={selectedItem.desc}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, desc: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Image URL</label>
              <input
                type="text"
                value={selectedItem.img_src}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, img_src: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebStoryEditor;

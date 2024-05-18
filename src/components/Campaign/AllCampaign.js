import React, { useState } from "react";
import { data } from "../../utils/data";
import { useSelector } from "react-redux";
import { selectFilters } from "../../utils/sortSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const AllCampaign = () => {
  const [showSort, setShowSort] = useState(false);
  const filters = useSelector(selectFilters);
  const [characters, updateCharacters] = useState(data);

  const filteredData = data.filter((item) => {
    if (filters.johnDoe && item.associate === "John Doe") return true;
    if (filters.peterEngland && item.associate === "Peter England") return true;
    if (filters.henryPaul && item.associate === "Henry Paul") return true;
    return false;
  });

  const handleSort = () => {
    setShowSort(!showSort);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="h-screen border-r">
      <div className="flex justify-between px-10 py-6">
        <div className="flex">
          <i class="uil uil-comment-alt-lines mr-4 text-xl text-gray-400"></i>
          <p className="text-xl font-semibold text-gray-700">All Campaign</p>
        </div>
        <div className="text-xl">
          <button onClick={handleSort}>
            <i class="uil uil-scroll px-2 text-gray-400"></i>
          </button>
          <i class="uil uil-ellipsis-h px-2 text-gray-400"></i>
        </div>
      </div>
      <div className="m-14 mt-10">
        <div className="bg-gray-100 p-2 px-5 rounded-lg flex justify-between">
          <div className="flex font-semibold">
            <i class="uil uil-plus"></i>
            <p>Add New</p>
          </div>
          <div className="">
            <div className="mx-4">
              <label className="mx-3">
                <input type="radio" name="set" /> Campaign
              </label>
              <label className="mx-3">
                <input type="radio" name="set" /> Task
              </label>
              <label className="mx-3">
                <input type="radio" name="set" /> Note
              </label>
              <label className="mx-3">
                <input type="radio" name="set" /> Folder
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="campaigns">
            {(provided) => (
              <ul
                className="campaigns"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {(filteredData.length > 0 ? filteredData : characters).map(
                  (item, index) => (
                    <Draggable
                      key={item.campaignName}
                      draggableId={item.campaignName}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          className="mx-14 my-5"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div className="font-semibold my-2 text-gray-600 bg-gray-100 p-2 px-5 rounded-lg">
                            <i class="uil uil-megaphone"></i>{" "}
                            {item.campaignName}
                          </div>
                          <div className="text-gray-600 mx-6 py-1 border-b">
                            <i class="uil uil-angle-right-b"></i>{" "}
                            <i class="uil uil-folder-minus"></i>{" "}
                            {item.folders.folderTitle}
                          </div>
                          <div>
                            {item.folders.tasks.map((item) => (
                              <div className="flex justify-between text-gray-600 py-2 border-b mx-20">
                                <div>
                                  <i class="uil uil-clipboard-notes"></i>{" "}
                                  {item.taskTitle}{" "}
                                </div>
                                <div className="text-xs text-blue-500">
                                  <i class="uil uil-constructor"></i>{" "}
                                  {item.status}{" "}
                                  <i class="uil uil-calendar-slash"></i>{" "}
                                  {item.dueDate}
                                </div>
                              </div>
                            ))}
                          </div>
                        </li>
                      )}
                    </Draggable>
                  )
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default AllCampaign;
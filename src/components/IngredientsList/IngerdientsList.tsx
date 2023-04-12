import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ingredients } from "../../utils/Ingredients";
import "./IngredientsList.css";

const IngerdientsList: React.FC = () => {
  return (
    <div className="ingredients-list">
      <Droppable
        mode="standard"
        droppableId="ingredients"
        isDropDisabled
        ignoreContainerClipping={true}
      >
        {(provided) => (
          <ul
            className="ingredients"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {ingredients.map(({ id, imageName }, index) => {
              return (
                <Draggable
                  key={id}
                  draggableId={id.toString()}
                  index={index}
                  disableInteractiveElementBlocking={false}
                  shouldRespectForcePress={false}
                >
                  {(provided, snapshot) => (
                    <>
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}

                        // style={{ zIndex: 100 - index }}
                      >
                        <img src={imageName} alt="" />
                      </div>
                      {snapshot.isDragging && <img src={imageName} alt="" />}
                    </>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default IngerdientsList;

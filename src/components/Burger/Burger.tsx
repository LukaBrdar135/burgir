import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Ingredient } from "../../types/Ingredient";
import "./Burger.css";

type Props = {
  ingredients: Ingredient[];
  isDragging: boolean;
};

const Item = styled.div`
  // margin-bottom: -75px;
`;

const List = styled.div`
  // height: 100%;
  // &:hover ${Item} {
  //   margin-bottom: 0px;
  // }
`;

const Burger: React.FC<Props> = (props) => {
  return (
    <div className="burger-side">
      <Droppable droppableId="burger" ignoreContainerClipping={true}>
        {(provided) => (
          <List
            id="burger"
            className="burger"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.ingredients.map(({ id, imageName }, index) => {
              return (
                <Draggable
                  key={index}
                  draggableId={id.toString() + index + "-burger"}
                  index={index}
                  isDragDisabled={
                    index === 0 || index === props.ingredients.length - 1
                  }
                >
                  {(provided, snapshot) => (
                    <Item
                      style={{
                        zIndex: 100 - index,
                        position: "relative",
                      }}
                    >
                      <img
                        src={imageName}
                        alt=""
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      />
                    </Item>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </div>
  );
};

export default Burger;

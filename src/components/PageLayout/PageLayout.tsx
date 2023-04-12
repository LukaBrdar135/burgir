import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Burger from "../Burger/Burger";
import IngerdientsList from "../IngredientsList/IngerdientsList";
import { ingredients } from "../../utils/Ingredients";
import "./PageLayout.css";
import { Ingredient } from "../../types/Ingredient";

const PageLayout: React.FC = () => {
  const [burgerIngredients, setburgerIngredients] = useState<Ingredient[]>([
    ingredients[0],
    ingredients[1],
  ]);

  const [isDragging, setIsDragging] = useState(false);

  const handleOnDragEnd = (result: any) => {
    setIsDragging(false);
    // const images = document.querySelectorAll(
    //   ".burger img"
    // ) as NodeListOf<HTMLImageElement>;
    // images.forEach(
    //   (img: HTMLImageElement) => (img.style.marginBottom = "-75px")
    // );
    if (result.destination?.droppableId !== "burger") return;

    setburgerIngredients((prevState) => {
      let destination = result.destination.index;
      if (destination === 0) {
        destination = 1;
      }
      if (destination === prevState.length) {
        destination = prevState.length - 1;
      }

      if (result.source.droppableId === "burger") {
        if (destination === prevState.length - 1) {
          destination = prevState.length - 2;
        }
        const [reorderedItem] = prevState.splice(result.source.index, 1);
        prevState.splice(destination, 0, reorderedItem);
      } else {
        prevState.splice(destination, 0, ingredients[result.source.index]);
      }

      return prevState;
    });
  };

  const handleOnDragStart = () => {
    setIsDragging(true);
    // const images = document.querySelectorAll(
    //   ".burger div"
    // ) as NodeListOf<HTMLDivElement>;
    // images.forEach((img: HTMLDivElement) => {
    //   img.style.zIndex = "10";
    //   img.style.position = "relative";
    // });
  };

  return (
    <div className="page-layout">
      <DragDropContext
        onDragEnd={handleOnDragEnd}
        onDragStart={handleOnDragStart}
      >
        <IngerdientsList />
        <Burger ingredients={burgerIngredients} isDragging={isDragging} />
      </DragDropContext>
    </div>
  );
};

export default PageLayout;

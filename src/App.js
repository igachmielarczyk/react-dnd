import React, { useState, useCallback } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { data } from "./data";
import DraggableBlockList from "./components/DraggableBlockList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

function App() {
  const [heroes, setHeroes] = useState(data)
  
  const moveItemUp = (id) => {
    const currentIndex = heroes.findIndex((hero) => hero.id === id);
    if (currentIndex > 0) {
      const newHeroes = [...heroes];
      const temp = newHeroes[currentIndex];
      newHeroes[currentIndex] = newHeroes[currentIndex - 1];
      newHeroes[currentIndex - 1] = temp;
      setHeroes(newHeroes);
    }
  };

  const moveItemDown = (id) => {
    const currentIndex = heroes.findIndex((hero) => hero.id === id);
    if (currentIndex < heroes.length - 1) {
      const newHeroes = [...heroes];
      const temp = newHeroes[currentIndex];
      newHeroes[currentIndex] = newHeroes[currentIndex + 1];
      newHeroes[currentIndex + 1] = temp;
      setHeroes(newHeroes);
    }
  };
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setHeroes((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Container
        fluid
        className="main text-center d-flex flex-column justify-content-start align-items-center pt-3"
      >
        <h1 className="h1-app">Marvel's Heroes</h1>
        <div className="list text-center ">
          {heroes.map((hero, index) => (
            <DraggableBlockList
              key={hero.id}
              name={hero.name}
              id={hero.id}
              index={index}
              heroes={heroes}
              moveItemUp={moveItemUp}
              moveItemDown={moveItemDown}
              moveCard={moveCard}
            />
          ))}
        </div>
      </Container>
    </DndProvider>
  );
}

export default App;

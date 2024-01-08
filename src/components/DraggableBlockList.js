import { Card, Button } from "react-bootstrap";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

const DraggableBlockList = ({
  name,
  id,
  index,
  moveItemUp,
  moveItemDown,
  moveCard,
  heroes,
}) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "hero",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: "hero",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <Card className="app-card m-3 p-2 d-flex flex-row justify-content-center align-items-center">
        <Card.Title className="mb-0 d-flex flex-row justify-content-center align-items-center">
          {name}
        </Card.Title>
        <div className="wrap-btn d-flex flex-column">
          <Button
            className="mb-1 btn-up"
            variant="primary"
            size="sm"
            onClick={() => moveItemUp(id, index)}
            disabled={index === 0}
          >
            Move Up
          </Button>{" "}
          <Button
            className="btn-down"
            variant="primary"
            size="sm"
            onClick={() => moveItemDown(id, index)}
            disabled={index === heroes.length - 1}
          >
            Move Down
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default DraggableBlockList;

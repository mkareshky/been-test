import { useContext } from "react";
import { TaskContext } from "../../TaskContext";
import Item from "./item";

function List(props) {
    const [task,] = useContext(TaskContext);
    return (
        <div>
            {task.filter(x => x.done === props.done).map((item, index) => {
                return <Item key={item.title + index} item={item} handleOpen={props.handleOpen}/>;
            })}
        </div>
    );
}

export default List;

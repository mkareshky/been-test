import { Box, Button, Modal } from '@mui/material';
import { useContext, useState } from 'react';
import { TaskContext } from '../../TaskContext';
import FormPage from '../FormPage';
import './styles.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ItemDetails(props) {

    const [task, setTask] = useContext(TaskContext);

    const handleDone = (index) => {
        setTask(
            task.map(item =>
                item.id === index
                    ? { ...item, done: true }
                    : item
            ));
        handleClose();
    }

    const handleDelete = (index) => {
        setTask(task.filter(item => item.id !== index));
        handleClose();
    }

    const [open, setOpen] = useState(false);
    const handleOpen = (e) => { setOpen(true); e.stopPropagation(); }
    const handleClose = () => setOpen(false);
    return (
        <div className="Container" key={props.item.title}>
            <div className="BoxItem">
                <div className="ItemContainer">
                    <p className="ItemTitle">{props.item.title}</p>
                </div>
                <div className="ItemWrapper">
                    <span class="dot" style={(props.item.level === "low") ? { backgroundColor: 'green' } : (props.item.level === "medium") ? { backgroundColor: 'yellow' } : { backgroundColor: 'red' }}></span>
                    <span style={(props.item.level === "low") ? { color: 'green' } : (props.item.level === "medium") ? { color: 'yellow' } : { color: 'red' }}>{props.item.level.charAt(0).toUpperCase() + props.item.level.slice(1)}</span>
                </div>
                <div className="ItemContainer">
                    <p className="Description">{props.item.description}</p>
                </div>
                <div className="ButtonsContainer" >
                    <Button className="ButtonFlex" onClick={() => handleDone(props.item.id)} style={{ margin: '0 0.5rem', backgroundColor: 'orange' }} variant="contained">Done Task</Button>
                    <Button className="ButtonFlex" onClick={(e) => handleOpen(e)} style={{ margin: '0 0.5rem' }} variant="contained" color="success">Edit </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} className="Modal">
                            <FormPage onCloseModal={handleClose} item={props.item} />
                        </Box>
                    </Modal>
                    <Button className="ButtonFlex" onClick={() => handleDelete(props.item.id)} style={{ margin: '0 0.5rem', backgroundColor: 'red' }} variant="contained">Delete Task</Button>
                </div>
            </div>
        </div >
    );
}

export default ItemDetails;

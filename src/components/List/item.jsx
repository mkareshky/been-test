import { Box, Button, Modal } from '@mui/material';
import { useContext, useState } from 'react';
import { TaskContext } from '../../TaskContext';
import FormPage from '../FormPage';
import ItemDetails from '../Task/itemDetails';
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

function Item(props) {

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

    const [open, setOpen] = useState(false);
    const handleOpen = (e) => { setOpen(true); e.stopPropagation(); }
    const handleClose = () => setOpen(false);
    const [openDetails, setOpenDetails] = useState(false);
    const handleOpenDetails = (e) => { setOpenDetails(true); e.stopPropagation(); }
    const handleCloseDetails = () => setOpenDetails(false);
    return (
        <div className="Container" key={props.item.title}  onClick={(e) => handleOpenDetails(e)}>
            <div className="Box">
                <div className="LeftColumn" >
                    <div className="ItemWrapper">
                        <p className="ItemTitle">{props.item.title.substr(0, 25) + '...'}</p>
                    </div>
                    <div className="ItemWrapper" >
                        <p className="Description">{props.item.description.substr(0, 50) + '...'}</p>
                    </div>
                </div>
                <div className="RightColumn">
                    <div className="ItemWrapper">
                        <span>{props.item.level.charAt(0).toUpperCase() + props.item.level.slice(1)}</span>
                        <span class="dot" style={(props.item.level === "low") ? { backgroundColor: 'green' } : (props.item.level === "medium") ? { backgroundColor: 'yellow' } : { backgroundColor: 'red' }}></span>
                    </div>
                    <div className="ItemWrapper" style={(props.item.done) ? { display: 'none' } : { display: 'block' }} >
                        <Button onClick={() => handleDone(props.item.id)} style={{ margin: '0 0.5rem', backgroundColor: 'orange' }} variant="contained">Done Task</Button>
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
                        <Modal
                            open={openDetails}
                            onClose={handleCloseDetails}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style} className="Modal">
                                <ItemDetails item={props.item} />
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Item;

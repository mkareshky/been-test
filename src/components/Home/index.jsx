import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FormPage from '../FormPage';
import './styles.css';
import { TaskContext } from '../../TaskContext';
import List from '../List';

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

function Home() {
    const [task,] = useContext(TaskContext);
    const [open, setOpen] = useState(false);
    const [openList, setOpenList] = useState(false);
    const handleOpen = (e) => { e.stopPropagation(); setOpen(true); }
    const handleClose = () => setOpen(false);
    const handleOpenList = () => (task.filter(x => x.done === true).length > 0) ? setOpenList(true) : setOpenList(false);
    const handleCloseList = () => setOpenList(false);
    return (
        <div className="Wrapper">
            <p>Hello World</p>
            {!(task.length > 0) ?
                (<Button style={{ marginTop: '5rem' }} variant="contained" onClick={(e) => handleOpen(e)}>Create your first task ;)</Button>) :
                (
                    <>
                        <div className="LeftBottom">
                            <Button style={{ marginTop: '0' }} variant="contained" onClick={handleOpenList}>View Done Tasks</Button>
                        </div>
                        <List done={false} handleOpen={(e) => handleOpen(e)} />
                        <div className="RightBottom">
                            <button className="btn" onClick={(e) => handleOpen(e)}><FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                    </>
                )
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="Modal">
                    <FormPage onCloseModal={handleClose} />
                </Box>
            </Modal>
            <Modal
                open={openList}
                onClose={handleCloseList}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="Modal">
                    <List done={true} />
                </Box>
            </Modal>
        </div>
    );
}

export default Home;

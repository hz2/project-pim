import * as React from 'react';
import Layout from '@/components/DashboardLayout'
import { Grid, Paper, Table, TableRow, TableHead, TableCell, TableBody, Link, Button, Box } from '@mui/material';
import { DoneAll, Title } from '@mui/icons-material';
import AddMenu from "./addMenu";
import { FileUpload, FileUploadProps } from "./uploader";
import { _get, _delete, IForm, _upload } from '@/utils/service';

import { UserContext } from "@/components/PageProvider"



import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const fileUploadProp: FileUploadProps = {
    accept: 'image/*',
    imageButton: true,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (
            event.target.files !== null &&
            event.target?.files?.length > 0
        ) {

            const file = event.target.files
            console.log(`Saving ${event.target.value}`, file)

            const formData = new FormData()
            formData.append("image", file[0]);

            _upload('/file-upload/single', formData).then(r => {
                console.log('qqq', r);

            })
        }
    },
    onDrop: (event: React.DragEvent<HTMLElement>) => {
        console.log(`Drop ${event.dataTransfer.files[0].name}`)
    },
}




function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}
export default function Page() {

    const [list, setList] = React.useState<IForm[]>([])
    const { dispatch } = React.useContext(UserContext)

    const getList = () => {
        _get('/sys/menu').then(res => {
            if (res instanceof Array) {
                setList(res)
            }
        })
    }

    const deleteMenu = (id: string) => {
        _delete('/sys/menu/' + id).then(res => {
            console.log('r', res);
            getList()
        }).catch(e => {
            dispatch({ type: "open_err", data: e.message || '失败' })
        })

    }

    React.useEffect(() => {
        getList()
    }, [])


    // dialog start
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // dialog end

    type FormRef = HTMLElement & {
        formSubmit: () => null
    }

    const addMenuElementRef = React.useRef<FormRef>(null);
    const handleSubmit = (_event: React.FormEvent<HTMLFormElement>) => {
        const { current: addMenuElement } = addMenuElementRef;
        if (addMenuElement !== null) {
            // addMenuElement.focus();
            addMenuElement.formSubmit()
        }


        setOpen(false);

    }


    return (
        <Layout>
            <Box component="span" sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={handleClickOpen}>Add menu</Button>
            </Box>
            <Grid container spacing={3}>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Title>Recent Orders</Title>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Ship To</TableCell>
                                    <TableCell>Payment Method</TableCell>
                                    <TableCell align="right">delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.map((row) => (
                                    <TableRow key={Number(row.id)}>
                                        <TableCell>{row.text}</TableCell>
                                        <TableCell>{row.path}</TableCell>
                                        <TableCell>{row.component}</TableCell>
                                        <TableCell>{row.icon}</TableCell>
                                        <TableCell align="right">
                                            <Button color="error" onClick={() => deleteMenu(String(row.id))}>delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                            See more orders
                        </Link>
                    </Paper>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="scroll-dialog-title">Add Menu</DialogTitle>
                <DialogContent dividers>

                    {/* <FileUpload {...fileUploadProp} /> */}
                    <AddMenu ref={addMenuElementRef} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </Layout >
    );
}

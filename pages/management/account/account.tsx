import * as React from 'react';
import Layout from '@/components/DashboardLayout'
import { Grid, Paper, Table, TableRow, TableHead, TableCell, TableBody, Link, Button, Box, Avatar } from '@mui/material';
import { DoneAll, Title } from '@mui/icons-material';
import AddMenu from "../menu/addMenu";
import { FileUpload, FileUploadProps } from "../menu/uploader";
import { _get, _delete, _upload } from '@/utils/service';

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

interface IRow {
    id: number
    name: string
    email: string
    username: string
    avatar: string
    mobile: string
    sex: string
    birthday: Date
    address: string
}

export default function Page() {

    const [list, setList] = React.useState<IRow[]>([])
    const { dispatch } = React.useContext(UserContext)

    const getList = () => {
        _get('/sys/account').then((res) => {
            const row: IRow[] = res;
            setList(row)
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
    const updateAccount = (id: string) => {

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
    const handleSubmit = () => {
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
                <Button variant="contained" onClick={handleClickOpen}>Add account</Button>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Avatar</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Birthday</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell align="right">delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.map((row) => (
                                    <TableRow key={Number(row.id)}>
                                        <TableCell>
                                            <Avatar alt={row.name} src={row.avatar} />
                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.mobile}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.sex}</TableCell>
                                        <TableCell>{row.birthday}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell align="right">
                                            <Button variant="outlined" size='small' color="error" onClick={() => deleteMenu(String(row.id))}>Delete</Button>
                                            <Button variant="outlined" size='small' color="primary" sx={{ marginLeft: 2 }} onClick={() => updateAccount(String(row.id))}>Update</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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

                    <FileUpload {...fileUploadProp} />
                    <AddMenu ref={addMenuElementRef} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Layout >
    );
}
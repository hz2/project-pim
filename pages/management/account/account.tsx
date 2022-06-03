import * as React from 'react';
import Layout from '@/components/DashboardLayout'
import { Grid, Paper, Table, TableRow, TableHead, TableCell, TableBody, Link, Button, Box, Avatar } from '@mui/material';
import AddAccount from "./addAccount";
import { _get, _delete } from '@/utils/service';

import { UserContext } from "@/components/PageProvider"

import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { IAccountRow, defaultAccountRow } from "@/types/types";


export default function Page() {

    const [list, setList] = React.useState<IAccountRow[]>([])
    const { dispatch } = React.useContext(UserContext)

    const getList = () => {
        _get('/sys/account').then((res) => {
            const row: IAccountRow[] = res;
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
    React.useEffect(() => {
        getList()
    }, [])


    // dialog start
    const [open, setOpen] = React.useState(false);
    const [row, setRow] = React.useState(defaultAccountRow)
    const updateAccount = (row: IAccountRow) => {
        setRow(row)
        setOpen(true);
    }
    const handleAdd = () => {
        setRow(defaultAccountRow)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // dialog end

    type FormRef = {
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
                <Button variant="contained" onClick={handleAdd}>Add account</Button>
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
                                        <TableCell>{new Date(String(row.birthday)).toLocaleDateString('zh')}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell align="right">
                                            <Button variant="outlined" size='small' color="error" onClick={() => deleteMenu(String(row.id))}>Delete</Button>
                                            <Button variant="outlined" size='small' color="primary" sx={{ marginLeft: 2 }} onClick={() => updateAccount(row)}>Update</Button>
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
                <DialogTitle id="scroll-dialog-title">{row.id ? 'Edit Account' : 'Add Account'}</DialogTitle>
                <DialogContent dividers>
                    <AddAccount ref={addMenuElementRef} row={row} onSuccess={() => getList()} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Layout >
    );
}

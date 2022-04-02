import * as React from 'react';
import Layout from '@/components/DashboardLayout'
import { Grid, Paper, Table, TableRow, TableHead, TableCell, TableBody, Link } from '@mui/material';
import { Title } from '@mui/icons-material';
import AddMenu from "./addMenu";
import { _get, IForm } from '@/utils/service';

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}
export default function Page() {

    const [list, setList] = React.useState<IForm[]>([])

    const getList = () => {
        _get('/sys/menu').then(res => {
            if (res instanceof Array) {
                setList(res)
            }
        })
    }

    React.useEffect(() => {
        getList()
    }, [])

    return (
        <Layout>
            <AddMenu />
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
                                    <TableCell align="right">Sale Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.map((row) => (
                                    <TableRow key={Number(row.id)}>
                                        <TableCell>{row.text}</TableCell>
                                        <TableCell>{row.path}</TableCell>
                                        <TableCell>{row.component}</TableCell>
                                        <TableCell>{row.icon}</TableCell>
                                        <TableCell align="right">{`$${row.isActive}`}</TableCell>
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
        </Layout>
    );
}

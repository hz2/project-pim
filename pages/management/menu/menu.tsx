import * as React from 'react';
import Layout from '@/components/DashboardLayout'
import { Grid, Paper, Table, TableRow, TableHead, TableCell, TableBody, Link } from '@mui/material';
import { Title } from '@mui/icons-material';
import AddMenu from "./addMenu";
import { _get } from '@/utils/service';

// Generate Order Data
function createData(
    id: number,
    date: string,
    name: string,
    shipTo: string,
    paymentMethod: string,
    amount: number,
) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Elvis Presley',
        'Tupelo, MS',
        'VISA ⠀•••• 3719',
        312.44,
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Paul McCartney',
        'London, UK',
        'VISA ⠀•••• 2574',
        866.99,
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(
        3,
        '16 Mar, 2019',
        'Michael Jackson',
        'Gary, IN',
        'AMEX ⠀•••• 2000',
        654.39,
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Bruce Springsteen',
        'Long Branch, NJ',
        'VISA ⠀•••• 5919',
        212.79,
    ),
];


const getList = () => {
    _get('/menu').then(res => {
        console.log('r ');

    })
}


function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}
export default function Page() {

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
                                {rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.shipTo}</TableCell>
                                        <TableCell>{row.paymentMethod}</TableCell>
                                        <TableCell align="right">{`$${row.amount}`}</TableCell>
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

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControl, FormControlLabel, Grid, TextField, RadioGroup, Radio, FormLabel } from '@mui/material';
import { formToObj } from '@/utils/utils';
import { _req } from '@/utils/service';
import Uploader from '@/components/Uploader';
import { IAccountRow, defaultAccountRow } from "@/types/types";


type FormRef = {
    formSubmit: () => void
}
interface IPageProps {
    row: IAccountRow
    ref: React.ForwardedRef<FormRef>
    onSuccess: () => void
}

const AddMenu: React.FC<IPageProps> = React.forwardRef((props, ref) => {
    const { row = defaultAccountRow, onSuccess } = props
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const data = formToObj(form)
        _req('/sys/account/update', {
            id: row.id,
            avatar: link,
            ...data
        }).then(res => {
            console.log('r ');
            onSuccess()
        })

    };
    const formRef = React.useRef<HTMLElement>(null);
    React.useImperativeHandle(ref, () => ({
        formSubmit: () => {
            const { current: form } = formRef;
            if (form !== null) {
                form.dispatchEvent(new Event('submit', {
                    'bubbles': true, // Whether the event will bubble up through the DOM or not
                    'cancelable': true  // Whether the event may be canceled or not
                }))
            }
        }
    }));

    const [link, SetLink] = React.useState(row.avatar || '')

    return (
        <Paper variant="elevation" sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}>
            <Box component="form" ref={formRef} noValidate onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                <Grid container spacing={3}  >
                    <Grid item xs={4}  sx={{ alignSelf:'flex-start' }}>
                        <Uploader value={link} onSuccess={r => SetLink(r)} />
                    </Grid>
                    <Grid item xs={4}  sx={{ alignSelf:'flex-start', order:'9' }}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Name"
                            defaultValue={row.name}
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={4}  sx={{ alignSelf:'flex-start' }}>
                        <TextField
                            required
                            id="mobile"
                            name="mobile"
                            label="Mobile"
                            defaultValue={row.mobile}
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={4}  sx={{ alignSelf:'flex-start' }}>
                        <FormControl>
                            <FormLabel id="gender-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="gender-label"
                                name="sex"
                                defaultValue={row.sex}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}  sx={{ alignSelf:'flex-start' }}>
                        <TextField
                            required
                            id="birthday"
                            name="birthday"
                            label="Birthday"
                            type="date"
                            defaultValue={row.birthday ? new Date(String(row.birthday)).toISOString().substring(0, 10) : null}
                            fullWidth
                            variant="standard"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="address"
                            defaultValue={row.address}
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
})

AddMenu.displayName = 'AddMenu';
export default AddMenu
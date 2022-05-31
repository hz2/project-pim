import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { formToObj } from '@/utils/utils';
import { _req } from '@/utils/service';
import Uploader from '@/components/Uploader';

const AddMenu = React.forwardRef((props, ref) => {
    console.log('props', props);
    
    const { row } = props
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const data = formToObj(form)
        _req('/sys/menu', data).then(res => {
            console.log('r ');

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

    const [link,SetLink] = React.useState(row.avatar||'')

    return (
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Box component="form" ref={formRef} noValidate onSubmit={handleSubmit} >
                { JSON.stringify(row) }
                <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <Grid item xs={12} sm={6}>
                        <Uploader value={link} onSuccess={r=>SetLink(r)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="menuName"
                            name="text"
                            label="Menu Name"
                            autoComplete="username"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="menuPath"
                            name="path"
                            label="Menu Path"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="menuIcon"
                            name="icon"
                            label="Menu Icon"
                            fullWidth
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="component"
                            name="component"
                            label="Component"
                            fullWidth
                            autoComplete="shipping address-line1"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                            label="Use this address for payment details"
                        />
                    </Grid>
                </Grid>
                {/* <Button
                    variant="contained"
                    type="submit"
                    sx={{ mt: 3, ml: 1 }}
                >Save
                </Button> */}
            </Box>
        </Paper>
    );
})

AddMenu.displayName = 'AddMenu';
export default AddMenu
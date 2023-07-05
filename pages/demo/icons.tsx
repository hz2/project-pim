
import * as IconMaterial from '@mui/icons-material';
import { Box, Typography } from '@mui/material';


export default () => <>
    {Object.entries(IconMaterial).map(([name, El]) => {
        return <Box sx={{ display: 'inline-block', m: 1 }} onClick={() => navigator.clipboard.writeText(name).then(r => console.log(r) )} key={name}>
            <El sx={{ width: "60px", height: '60px' }} />
            <Typography sx={{ width: "60px", overflow: "hidden", textOverflow: "ellipsis" }} title={name}>{name}</Typography>
        </Box>
    })}
</>
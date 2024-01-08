import * as React from 'react';
import Box from '@mui/material/Box';
import { FormControl, FormLabel, Paper, Switch } from '@mui/material';
import { TreeView, TreeItem } from '@mui/lab';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { formToObj } from '@/utils/utils';
import { _get, _req } from '@/utils/service';
import { UserContext } from "@/components/PageProvider"
import { IMenu } from "@/types/types";

import { alpha, styled } from '@mui/material/styles';
import { TreeItemProps } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { useSpring, animated } from 'react-spring';
import { TransitionProps } from '@mui/material/transitions';


function TransitionComponent(props: TransitionProps) {
    const style = useSpring({
        from: {
            opacity: 0,
            transform: 'translate3d(20px,0,0)',
        },
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
        },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}




// const StyledTreeItem = styled((props: TreeItemProps) => (
//     <TreeItem {...props} TransitionComponent={TransitionComponent} />
// ))(({ theme }) => ({
//     [`& .${treeItemClasses.iconContainer}`]: {
//         '& .close': {
//             opacity: 0.3,
//         },
//     },
//     [`& .${treeItemClasses.group}`]: {
//         marginLeft: 15,
//         paddingLeft: 18,
//         borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
//     },
// }));

type FormRef = {
    formSubmit: () => void
}
interface IPageProps {
    row: IMenu
    ref: React.ForwardedRef<FormRef>
    onSuccess: () => void
}


const AddMenu: React.FC<IPageProps> = React.forwardRef((props, ref) => {

    const [list, setList] = React.useState<IMenu[]>([])
    const { row = new IMenu, onSuccess } = props
    const { dispatch } = React.useContext(UserContext)

    const getList = () => {
        _get('/sys/menu/tree').then(res => {
            setList(res)
        })
    }

    React.useEffect(() => {
        getList()
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const data = {
            pid: row.pid,
            id: row.id,
            ...formToObj(form),
            isActive: Boolean(row.isActive),
        }

        console.log('data', data);

        if (data.id === 0) {
            delete data.id
        }
        _req('/sys/menu', data).then(res => {
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

    const chooseTreeItem = (_event: React.SyntheticEvent<Element, Event>, nodeIds: string) => {
        // row.parent = list.filter(x=> x.id === Number(nodeIds) )[0]
        row.pid = Number(nodeIds)
    }


    // const genTree = (list: IMenu[]) => {
    //     if (!list || !Array.isArray(list)) {
    //         return null
    //     }
    //     const tree = (list: IMenu[]) => list.map(x => <StyledTreeItem nodeId={String(x.id)} label={x.text} key={x.id} >
    //         {Array.isArray(x.children) ? tree(x.children) : null}
    //     </StyledTreeItem>)
    //     return tree(list)
    // }

    return (
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Box component="form" ref={formRef} noValidate onSubmit={handleSubmit} >
                <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="menuName"
                            name="text"
                            label="Menu Name"
                            autoComplete="username"
                            fullWidth
                            variant="standard"
                            defaultValue={row.text}
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
                            defaultValue={row.path}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl>
                            <FormLabel id="gender-label">Parent</FormLabel>
                            {/* <TreeView
                                aria-label="customized"
                                defaultExpanded={['1']}
                                defaultCollapseIcon={<FolderOpenIcon />}
                                defaultExpandIcon={<FolderIcon />}
                                defaultEndIcon={<ArrowRightAltIcon />}
                                sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                                onNodeSelect={chooseTreeItem}
                            >
                                {genTree(list)}
                            </TreeView> */}
                        </FormControl>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl>
                            <FormLabel id="cctive-label">Active</FormLabel>
                            <FormControlLabel control={<Switch
                                id="isActive" name="isActive"
                                defaultChecked={row.isActive}
                                onChange={({ target: { checked } }) => (row.isActive = checked)}
                            />} label="Active" />
                        </FormControl>
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
                    <Grid container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
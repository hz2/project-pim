import React from 'react'
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import Image from 'next/image'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import clsx from 'clsx'
import { imgLoader } from '@/utils/utils';
import { _upload } from '@/utils/service';

export type FileUploadProps = {
    imageButton?: boolean
    accept: string
    hoverLabel?: string
    dropLabel?: string
    width?: string
    height?: string
    backgroundColor?: string
    image?: {
        url: string
        imageStyle?: {
            width?: string
            height?: string
        }
    }
    onDrop: (event: React.DragEvent<HTMLElement>) => void
}

interface UploaderProps {
    value?: string
    onSuccess: (str: string) => void
}


const useStyle = makeStyles({
    root: {
        cursor: 'pointer',
        textAlign: 'center',
        display: 'flex',
        position: 'relative',
        '&:hover p,&:hover svg,& img': {
            opacity: 1,
        },
        '& p, svg': {
            opacity: 0.4,
        },
        '&:hover img': {
            opacity: 0.3,
        },
    },
    noMouseEvent: {
        pointerEvents: 'none',
    },
    iconText: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
    },
    hidden: {
        display: 'none',
    },
    onDragOver: {
        '& img': {
            opacity: 0.3,
        },
        '& p, svg': {
            opacity: 1,
        },
    },
})

const fileUploadProp: FileUploadProps = {
    accept: 'image/*',
    imageButton: true,
    onDrop: (event: React.DragEvent<HTMLElement>) => {
        console.log(`Drop ${event.dataTransfer.files[0].name}`)
    },
}


export const FileUpload: React.FC<UploaderProps> = ({
    value: url,
    onSuccess
}) => {

    const {

        accept,
        imageButton = false,
        hoverLabel = 'Click or drag to upload file',
        dropLabel = 'Drop file here',
        width = '400px',
        height = '400px',
        backgroundColor = '#fff',
        image: {
            // url = '/',
            imageStyle = {
                height: 'inherit',
            },
        } = {},
        onDrop,
    } = fileUploadProp




    const classes = useStyle()
    const [imageUrl, setImageUrl] = React.useState(url)
    const [labelText, setLabelText] = React.useState<string>(hoverLabel)
    const [isDragOver, setIsDragOver] = React.useState<boolean>(false)
    const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false)
    const stopDefaults = (e: React.DragEvent) => {
        e.stopPropagation()
        e.preventDefault()
    }
    const dragEvents = {
        onMouseEnter: () => {
            setIsMouseOver(true)
        },
        onMouseLeave: () => {
            setIsMouseOver(false)
        },
        onDragEnter: (e: React.DragEvent) => {
            stopDefaults(e)
            setIsDragOver(true)
            setLabelText(dropLabel)
        },
        onDragLeave: (e: React.DragEvent) => {
            stopDefaults(e)
            setIsDragOver(false)
            setLabelText(hoverLabel)
        },
        onDragOver: stopDefaults,
        onDrop: (e: React.DragEvent<HTMLElement>) => {
            stopDefaults(e)
            setLabelText(hoverLabel)
            setIsDragOver(false)
            if (imageButton && e.dataTransfer.files[0]) {
                const link = URL.createObjectURL(e.dataTransfer.files[0])
                // setImageUrl(link)
                onSuccess(link)
            }
            onDrop(e)
        },
    }

    const uploadImg = (file: FileList) => {
        const formData = new FormData()
        formData.append("image", file[0]);
        _upload('/file-upload/single', formData).then(r => {
            const link:string =  r?.image_url || ''
            setImageUrl(link)
            onSuccess(link)
        })
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event?.target?.files || []
        if (imageButton && files.length) {
            const tmpLink = URL.createObjectURL(files[0])
            setImageUrl(tmpLink)
            if (
                event.target.files !== null &&
                event.target?.files?.length > 0
            ) {
                const file = event.target.files
                uploadImg(file)
            }
        }

    }

    return (
        <>
            <input
                onChange={handleChange}
                accept={accept}
                className={classes.hidden}
                id="file-upload"
                type="file"
            />

            <label
                htmlFor="file-upload"
                {...dragEvents}
                className={clsx(classes.root, isDragOver && classes.onDragOver)}
            >
                <Box
                    width={width}
                    height={height}
                    bgcolor={backgroundColor}
                    className={classes.noMouseEvent}
                >
                    {imageButton && imageUrl && (
                        <Box position="absolute" height={height} width={width}>
                            <Image
                                unoptimized
                                alt="file upload"
                                objectFit='cover'
                                src={imageUrl}
                                height={height}
                                width={width}
                            />
                        </Box>
                    )}

                    {(!imageButton || isDragOver || isMouseOver) && (
                        <>
                            <Box
                                height={height}
                                width={width}
                                className={classes.iconText}
                            >
                                <CloudUploadIcon fontSize="large" />
                                <Typography>{labelText}</Typography>
                            </Box>
                        </>
                    )}
                </Box>
            </label>
        </>
    )
}

export default FileUpload
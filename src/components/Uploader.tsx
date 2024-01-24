import React from 'react'
import { Box, Typography } from '@mui/material';
import Image from 'next/image'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { _upload } from '@/utils/service';
interface UploaderProps {
    value?: string
    onSuccess?: (str: string) => void
    width?: string
    height?: string
    imageButton?: boolean
    accept?: string
    hoverLabel?: string
    dropLabel?: string
    backgroundColor?: string
}


const useStyle = {
    root: {
        cursor: 'pointer',
        textAlign: 'center',
        display: 'inline-flex',
        position: 'relative',
        border: '1px dashed #6fc141',
        borderRadius: '10px',
        overflow: 'hidden',
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
    onDragOver: {
        '& img': {
            opacity: 0.3,
        },
        '& p, svg': {
            opacity: 1,
        },
    },
}

export const FileUpload: React.FC<UploaderProps> = ({
    value: url = '',
    width = '200px',
    height = '200px',
    onSuccess = (_str) => null,
    accept = 'image/*',
    imageButton = true,
    hoverLabel = 'Click or drag to upload file',
    dropLabel = 'Drop file here',
    backgroundColor = '#fff'
}) => {

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
            const file = e.dataTransfer.files[0]
            if (imageButton && file) {
                setImageUrl(URL.createObjectURL(file))
                uploadImg(file)
            }
        },
    }

    const uploadImg = (file: File) => {
        const formData = new FormData()
        formData.append("image", file);
        _upload('/file-upload/single', formData).then(r => {
            const link: string = r?.image_url || ''
            setImageUrl(link)
            onSuccess(link)
        })
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event?.target?.files || []
        if (imageButton && files.length) {
            const file = files[0]
            setImageUrl(URL.createObjectURL(file))
            uploadImg(file)
        }

    }

    return (
        <>
            <input
                onChange={handleChange}
                accept={accept}
                style={{ display: 'none' }}
                id="file-upload"
                type="file"
            />

            <label
                htmlFor="file-upload"
                {...dragEvents}
                // className={clsx(classes.root, isDragOver && classes.onDragOver)}
            >
                <Box
                    width={width}
                    height={height}
                    bgcolor={backgroundColor}
                    sx={{ pointerEvents: 'none' }}
                >
                    {imageButton && imageUrl && (
                        <Box position="absolute" height={height} width={width}>
                            <Image
                                unoptimized
                                alt="file upload"
                                objectFit='cover'
                                src={imageUrl}
                                height={200}
                                width={200}
                            />
                        </Box>
                    )}

                    {(!imageButton || isDragOver || isMouseOver) && (
                        <>
                            <Box
                                height={height}
                                width={width}
                                color="#666"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    position: 'absolute',
                                }}
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
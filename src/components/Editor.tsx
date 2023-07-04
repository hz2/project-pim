

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import "quill/dist/quill.snow.css"
import Quill from 'quill';
import ImageCompress from 'quill-image-compress';
import BlotFormatter from 'quill-blot-formatter';
import { _upload } from '@/utils/service';


const Editor = () => {
    const [quillInt, setQuillInt] = useState<Quill | null>(null)
    const initEditor = () => {
        Quill.register('modules/imageCompress', ImageCompress);
        Quill.register("modules/blotFormatter", BlotFormatter);
        const quillInt = new Quill('#editor-container', {
            scrollingContainer: "#scrolling-container",
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['image', 'link', 'blockquote', 'code-block'],

                    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                    [{ 'direction': 'rtl' }],                         // text direction

                    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    [{ 'font': [] }],
                    [{ 'align': [] }],

                    ['clean'],
                ],
                imageCompress: {
                    quality: 0.8, // default
                    maxWidth: 1200, // default
                    maxHeight: 1200, // default
                    imageType: 'image/jpeg', // default
                    debug: true, // default
                    suppressErrorLogging: false, // default
                    insertIntoEditor: (_imageBase64URL: string, imageBlob: string | Blob, editor: Quill) => {
                        const formData = new FormData();
                        formData.append("image", imageBlob);
                        _upload('/file-upload/single', formData).then(r => {
                            const link: string = r?.image_url || ''
                            const range = editor.getSelection();
                            editor.insertEmbed(range?.index||0, "image", link, "user");
                        })
                            .catch(error => {
                                console.error(error);
                            });
                    }
                },
                blotFormatter: {}

            },
            placeholder: '请输入内容...',
            theme: 'snow'  // or 'bubble'
        });
        quillInt.on('editor-change', function (eventName: string) {
            // if (eventName === 'text-change') {
            //     // args[0] will be delta
            //     modelValue.value = quillInt.root.innerHTML
            // } else if (eventName === 'selection-change') {
            //     // args[0] will be old range
            //     modelValue.value = quillInt.root.innerHTML
            // }
        });
        return quillInt
    }

    useEffect(() => {
        if (!quillInt) {
            (initEditor())
        }
        return setQuillInt(null)
    }, [quillInt])


    return <Box className="container" id="scrolling-container">
        <Box id="editor-container" style={{ height: "50vh" }} sx={{ height: '50vh' }}> </Box>
    </Box >


}

export default Editor
import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import React from 'react'
import { toast } from 'react-toastify'
import { db, storage } from '../firebaseConfig'

const DeleteImage = ({id, imageUrl}) => {
    const handleDelete = async () => {
        if(window.confirm("Are you sure you want to delete this image?")){
        try {
            await deleteDoc(doc(db, "Crud", id));
            toast("Image deleted successfully", { type: "success" });
            const storageRef = ref(storage, imageUrl);
            await deleteObject(storageRef);

        } catch (error) {
            toast("Error deleting image", { type: error })
            console.log(error)
        }
    }
    }
    return (
        <i className='fa fa-times' onClick={handleDelete} 
        style= {{ cursor:"pointer" }} />
    )
}

export default DeleteImage;
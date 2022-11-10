import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from 'firebase/storage';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../firebaseConfig';

const AddArticles = () => {
    const [user] = useAuthState(auth);
    const [formData, setFormData] = useState({
        title:"",
        type:"",
        image:"",
        createdAt: Timestamp.now().toDate(),
    });

    const [progress, setProgress] = useState(0);

    const handleChange=(e) =>{
        setFormData({...formData,[e.target.name]: e.target.value});
    };
    
    const handleImageChange = (e) => {
        setFormData({...formData, image: e.target.files[0] });
    };

    const handleUpload = () => {
        if(!formData.title || !formData.type || !formData.image){
            alert('Please fill all the fields');
            return;
        }

        const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);
        const uploadImage = uploadBytesResumable(storageRef, formData.image);

        uploadImage.on("state_changed", (snapshot) => {
            const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progressPercent);
        },
        (err)=>{
            console.log(err);
        },
        ()=>{
            setFormData({
                title:"",
                type:"",
                image:"",
            });
            getDownloadURL(uploadImage.snapshot.ref)
            .then((url) => {
                const articleRef = collection(db, "Crud");
                addDoc(articleRef, {
                    title: formData.title,
                    type: formData.type,
                    imageUrl: url,
                    createdAt: Timestamp.now().toDate(),
                    createdBy: user.displayName,
                    userId : user.uid,
                })
                .then(() =>{
                    toast("Image Uploaded Sucessfully",{type:"success"});
                    setProgress(0);
                })
                .catch(err=>{
                    toast("Error adding image", {type:"error"});
                });
            });
        })
    }
  return (
    <div className='border p-3 mt-3 bg-light' style={{position:"fixed"}}>
        {
            !user?
            <>
            <h2><Link to='/signin'>Login to Upload Image </Link></h2>
              Don't have an account ? <Link to='/Register'> Signup</Link>
            </>
            :<>
              <h2>Upload Image</h2>
        <label htmlFor=''>Title</label>
        <input type="text" name="title" className="form-control" value={formData.title} onChange={(e) => handleChange(e)} />

         {/* type */}
         <label htmlFor=''>Type</label>
         <input type="text" name="type" className="form-control" value={formData.type} onChange={(e) => handleChange(e)} />

         {/* imageUrl */}
         <label htmlFor="">Image</label>
         <input type="file" name='image' accept='image/*' className='form-control' onChange={(e) => handleImageChange(e)} />

         {/* submit */}
         {progress === 0 ? null : (
             <div className="progress">
             <div className="progress-bar progress-bar-striped mt-2" style={{width:`${progress}%`}}>
                {`uploading image ${progress}%`}
             </div>
         </div>
         )}
         <button className='form-control btn-primary mt-2' onClick={handleUpload}>Upload</button>
         </>
        }
    </div>
  )
}

export default AddArticles

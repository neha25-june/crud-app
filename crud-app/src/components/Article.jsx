import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebaseConfig';

const Article = () => {
    const {id} = useParams();
    const [image, setImage] = useState(null);
    useEffect(() => {
        const docRef = doc(db, "Crud", id);
        onSnapshot(docRef, (snapshot) => {
            setImage({...snapshot.data(), id:snapshot.id});
        })
    })
  return (
    <div className='container border bg-light' style={{ marginTop: 70}}>
        {
            image && (
                <div className='row'>
                    <div className='col-3'>
                        <img src={image.imageUrl} alt={image.title}
                        style= {{ width: "100%", padding: 10 }} />
                    </div>
                    <div className='col-9 mt-3'>
                        <h2>{ image.title}</h2>
                        <h5>Author: { image.createdBy }</h5>
                        <div>Posted on: { image.createdAt.toDate().toDateString()}</div>
                        <hr/>
                        <h4>{image.type}</h4>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Article
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
// import firebase from '.firebase';

const Search = (props) => {
  const [articles, setArticles] = useState([]);
  const [data, setData] = useState('');
  const [user] = useAuthState(auth);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  let search = query.get("name");
  console.log("search", search);

  // useEffect(() => {
    
  //     const image = fetch('https://console.firebase.google.com/project/crud-app-3aed1/firestore/data/~2FCrud~2FIbHyjL9Ii20KywK3Hqtx')
  //     console.log(image, "hii");    
  // },[search])

  // const searchData = () => {
  //   fetch('https://console.firebase.google.com/project/crud-app-3aed1/storage/crud-app-3aed1.appspot.com/files/~2Fimages')
  //   // firebase.child("contacts").orderByChild("name").equalTo(search).on("value", (snapshot) => {
  //   //   const data = snapshot.val();
  //   //   setData(data);
  //   // })
  // };
  return (
    <div className='container'>
      <div>
      {/* console.log(filtered); */}
      {articles.length === 0 ? (
          <p>No Articles Found!</p>
      ) : ( 
          articles.map(({id,title, type, imageUrl, createdAt, createdBy, userId}) =>(
              <div className='border mt-3 p-3 bg-light' key={id}>
                  <div className="row">
                      <div className="col-3">
                          <Link to={`/article/${id}`}>
                          <img src={imageUrl} alt='title' style={{height:180, width:180}} />
                          </Link>  
                      </div>
                      <div className="col-9 ps-3">
                          <div className='row'>
                              <div className='col-6'>
                              {
                                  createdBy && (
                                      <span className='badge bg-primary'>{createdBy}</span>
                                )}
                              </div>
                              {/* <div className='col-6 d-flex flex-row-reverse'>
                                  {
                                      user && user.uid === userId && (
                                        <DeleteImage id={id} imageUrl={imageUrl} />
                                      )
                                  }
                              </div> */}
                          </div>
                          <h3>{title}</h3>
                          <p>{createdAt.toDate().toDateString()}</p>
                          <h5>{type}</h5>
                      </div>
                  </div>
              </div>
          ))
       )}
    </div>
      </div>
  //  </div>
  )
}

export default Search;
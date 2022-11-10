import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import DeleteImage from './DeleteImage';
import { useNavigate } from 'react-router-dom';

const Articles = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      setSearch("");
    }
    const [articles, setArticles] = useState([]);
    const [user] = useAuthState(auth);
    var data = [];
    useEffect(() => {
        const articleRef = collection(db, "Crud");
        const q = query(articleRef, orderBy("createdAt", "desc"));
        onSnapshot(q,(snapshot) => {
            const articles = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setArticles(articles);
            data = articles;
            console.log(data, "hii");
            console.log(articles);

        })
    },[]);
    
    const SearchRes = () => {
      const keyword = document.getElementById('kite');
      for(let i=0; i<data.length; i++)
      {
        const kite = data.createdBy
        if(kite == keyword)
        {
          console.log("hola");
        }
      }

      const filtered = data.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(keyword)))
    }

  return (
      <>
      {/* search */}
      <div>
        <div class="input-group container" style={{ marginTop: 60, marginBottom: 40 }}>
        <div class="form-outline" onSubmit={handleSubmit} >
          <input type="search" id="form1" class="form-control" placeholder='Search' style={{width: 500}}
          onChange={(e) => setSearch(e.target.value)}
          value={search} />
        </div>
        <button id='kite' onClick={() => SearchRes(navigate(`/search?name=${search}`))} 
          type="button" class="btn btn-primary" 
          style={{ width: 50, height: 38 }} >
          <i class="fas fa-search"></i>
        </button>
      </div> 
      </div>
      {/* end Search */}
    <div>
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
                              <div className='col-6 d-flex flex-row-reverse'>
                                  {
                                      user && user.uid === userId && (
                                        <DeleteImage id={id} imageUrl={imageUrl} />
                                      )
                                  }
                              </div>
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
    </>
  )
}

export default Articles

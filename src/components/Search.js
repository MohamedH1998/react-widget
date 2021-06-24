import React, {useState, useEffect} from 'react'
import axios from 'axios'


const Search = () => {
    const [term, setTerm] = useState('cats')
    const [results, setResults] = useState([])
    useEffect(() => {
         const search = async () => {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term,
                },
            });
            setResults(data.query.search)
         };
         if (term && !results.length) {
             search()
         } else {
         const timeoutId = setTimeout(()=> {
            if (term) {
                search()
             }
         }, 500);

         return () => {
             clearTimeout(timeoutId)
         }}
         
    }, [term])
    const handleChange= (e) => {
        setTerm(e.target.value)
        console.log(e.target.value)
    }
    const list = results.map((res, i) => {
       return (
           <div className="item" key={i}>
               <div className="right floated content">
                   <a className="ui button" href={`https://en.wikipedia.org?curid=${res.pageid}`}>Go</a>
               </div>
               <div className="content">
                   <div className="header">
                       {res.title}
                   </div>
                   <span dangerouslySetInnerHTML={{__html: res.snippet}}></span>
               </div>
        </div>
       )
    })
    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input value={term} onChange={handleChange} className="input"/>
                </div>
            </div>
            <div className="ui celled list">{list}</div>
        </div>
        )
}

export default Search
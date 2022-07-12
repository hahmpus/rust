import { useState, useEffect, ReactNode, useContext } from 'react';
import request from '../../utils/request';
import Immutable from "immutable";

interface iProps {
  id: string;
}

export default function Recipie(props: iProps) {

  const[recipie, setRecipie] = useState(Immutable.Map<any, any>());
  useEffect(() => {
    if(recipie.isEmpty()) {
      request("GET", '/api/recipie/'+props.id, null, null, (data, code) => {
        if(code == 200) {
          let saved:any = Immutable.fromJS(data);
          setRecipie(saved);
        }
      })
    }
  })

  console.log(recipie.size > 0 && recipie.toJS());


  return (<>

    {recipie.isEmpty() ?

      <div style={{textAlign: 'center'}}>Loading...</div>
      
    :
      
      <div>
        <h2>{recipie.get('name')}</h2>
      </div>
    }

  </>)

}
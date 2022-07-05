import request from '../../utils/request';
import { useState, useEffect, ReactNode, useContext } from 'react';
import Immutable from 'immutable';

interface IProps {
  id: string;
}

function ProductSummary(props:IProps) {
  const [counter, setCounter] = useState(0);

  const[product, setProductData] = useState(Immutable.Map<any, any>());
  useEffect(() => {
    if(product.isEmpty()) {
      request("GET", '/api/willys/'+props.id, null, null, (data, code) => {
        if(code == 200) {
          let saved:any = Immutable.fromJS(data);
          setProductData(saved);
        }
      })
    }
  })

  return (<>
    {product.isEmpty() ?
      <div style={{textAlign: 'center'}}>Loading...</div>
    : 
      <div>
        <h2>{product.get('name')}</h2>
        <div>
          {printNutrients(product, 3000)}
        </div>
      </div> 
    }
    </>);
}

export default ProductSummary;

function printNutrients(product:Immutable.Map<any, any>, grams?:number) {
  let weight = grams ? grams : 100;
  let nutrients = product.get('nutritions_fact_list');
  let rows:Array<ReactNode> = [<h3 key={'gram'}>
    per {weight}g
  </h3>];
  nutrients.map((macro:any, i:number) => {
    let nutrientString = '';
    if(macro.get('unit_code') == 'kilojoule') {
      nutrientString = Math.round((macro.get('value') * (weight / 100))) + ' kJ';
    } else if (macro.get('unit_code') == 'kilokalori') {
      nutrientString = Math.round((macro.get('value') * (weight / 100))) + ' kcal';
    } else {
      nutrientString = Math.round((macro.get('value') * (weight / 100))) + ' ' + macro.get('unit_code') + ' ' + macro.get('type_code');
    }
    rows.push(<div key={i}>{nutrientString}</div>)
  })
  return rows
}

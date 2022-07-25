import { TextInput } from "@mantine/core";
import { render } from "@testing-library/react";
import Immutable from "immutable";
import { useEffect, useState } from "react";

import request from "../../utils/request";
import delay   from "../../utils/delay"

interface RecipieProps {
    id?: string
    name?: string
}

function getRecipe(id:string) {
    if(id)
    request("GET", '/api/recipie/'+id, null, null, (response, code) => {
        if(code === 200) {
            return response;
        } else {
            return false
        }
    })
}

function saveRecipie(id:string, recipie:Immutable.Map<any, any>) {

    let sending:any = recipie;
    if(Immutable.isMap(recipie)) {
        sending = recipie.toJS()
    }

    request("GET", '/api/recipie/'+id, null, sending, (response, code) => {
        if(code === 200) {
            return response;
        } else {
            return false
        }
    })
}

function searchProduct(phrase:string) {

    if(phrase) {
        request("GET", '/api/ica/search/'+phrase, null, null, (response, code) => {
            if(code === 200) {
                return response;
            } else {
                return false
            }
        })
    }

}

function addProduct(recipie:Immutable.Map<any, any>, id:string) {

}


export default function RecipieEditor(props:RecipieProps) {

    //see if the recipe is already in the database (were editing it)
    const [recipie, setRecipie] = useState(Immutable.Map<any, any>());
    useEffect(() => {
        if(props.id && recipie.isEmpty()) {
            let recipie:any = getRecipe(props.id);
            if(recipie) {
                setRecipie(recipie);
            }
        }
    });

    return (<>
        <h1>RECIPIE EDITOR</h1>
        <TextInput
            placeholder={"Search"}
            label={false}
            onChange={(e) => delay('product_search', () => searchProduct(e.target.value))}
        >

        </TextInput>   
    </>)

}
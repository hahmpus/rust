import Immutable from "immutable";
import { useEffect, useState } from "react";
import request from "../../utils/request";

interface RecipieProps {
    id: string
    name: string
}

function getRecipe(id:string) {
    return true;
}

function saveRecipie() {
    return true;
}

function searchProduct(phrase:string) {
    return true;
}

function getProduct(id:string) {
    request("GET", '/api/willys/'+id, null, null, (data, code) => {
        if(code === 200) {
            return data;
        } else {
            return false
        }
    })
}

function addProduct(recipie:Immutable.Map<any, any>, id:string) {
    let product:any = getProduct(id);
    if(product) {
        return recipie.set('products', recipie.get('products').push(product));
    } else {
        return recipie;
    }
}

function removeProduct(recipie:Immutable.Map<any, any>, id:string) {
    return recipie.set('products', recipie.get('products').filter((product:any) => {
            return product.get('id') !== id;
    }));
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
    })


}
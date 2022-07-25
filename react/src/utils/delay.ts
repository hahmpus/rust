var delayed:any = {}
export default function delay(key:string, fn:() => void, length:number = 500) {
  
  if(delayed[key] !== undefined && delayed[key] !== null) {
    clearTimeout(delayed[key])
    delayed[key] = null
  }

  delayed[key] = setTimeout(function() { 
    delayed[key] = null; 
    fn() 
  }, length)

}
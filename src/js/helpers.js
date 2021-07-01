export async function getJSON(url) {
  // feed it the fetch URL, then your customized error message
  try{
    const res= await fetch(url)
    const data= await res.json()
    if (!res.ok) throw new Error(`${data.message} (${res.status})`)
    return data
  } catch(errMSG){
    console.error(`HELPERS: ${errMSG}`)
  }
  
 
}
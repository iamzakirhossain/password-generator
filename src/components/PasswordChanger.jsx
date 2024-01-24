import React,{useState, useCallback, useEffect, useRef} from 'react'


const PasswordChanger = () => {
    let [length, setLength] = useState(8);
    let [includeNumber, setIncludeNumber] = useState(false);
    let [includeCharacter, setIncludeCharacter] = useState(false);
    let [password, setPassword] = useState("");
    let [copyButton, setCopyButton] = useState("Copy");
    
    let passwordRef = useRef(null);

    let passwordGenerator= useCallback(()=>{
        let pass="";
        let str="AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
        if (includeNumber) str+="0123456789";
        if (includeCharacter) str+="!@#$%^&*()_+{}[]|"
        for (let i = 1; i <= length; i++) {
            let randNumber = 
            Math.floor(Math.random()*str.length+1);
             
            pass += str.charAt(randNumber);
            
        }
         setPassword(pass);
    },
    [length,includeNumber,includeCharacter,setPassword]);

    let copyToClipBoard =useCallback(()=>{
        passwordRef.current?.select();
        // passwordRef.current?.setSelectionRange(0,8);
        window.navigator.clipboard.writeText(password);
        setCopyButton("Copied");
        setTimeout(()=>{
            setCopyButton("Copy");
        },1000)
    },[password])

    useEffect(()=>{passwordGenerator()},
    [length,includeNumber,includeCharacter,passwordGenerator])

  return (
    <div style={{margin:"100px"}}>
    <div style={{margin:"20px"}}>
        <input value={password} type='text' 
        style={{width:"400px", height:"20px"}} 
        readOnly
        ref={passwordRef}/>
        <button onClick={copyToClipBoard} 
        style={{margin:"5px"}}>{copyButton}</button>
    </div>
    <div>
        <div style={{margin:"10px"}}>
            <input type='range' 
            value={length} 
            min={8}
            max={40}
            id='passLength'
            onChange={(e)=>setLength(e.target.value)}/>
            <label htmlFor="passLength">Length:{length}</label>
        </div>
        
       <div style={{margin:"10px"}}>
            <input type='checkbox' onChange={()=>setIncludeNumber(!includeNumber)} 
            defaultChecked={includeNumber} id='includeNumber'/>
            <label htmlFor="includeNumber">Include Number</label>
       </div>

       <div style={{margin:"10px"}}>
            <input type='checkbox' onChange={()=>setIncludeCharacter(!includeCharacter)}
             defaultChecked={includeCharacter} id='includeCharacter'/>
            <label htmlFor="includeCharacter">Include Character</label>
       </div>
        

    </div>
    </div>
  )
}

export default PasswordChanger
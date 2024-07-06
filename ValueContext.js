import React, { useState, useContext, createContext, useEffect } from "react";
import regeneratorRuntime from "regenerator-runtime";
import storage from './Storage'; 

export const ValueContext = createContext(null)

export const ValueProvider = ({value, children}) => {
const [currentValue,setCurrentValue] = useState(value);
const [firstCall, setFirstCall] = useState(true);

// to clear the data, uncomment the next line and comment out the one after
// load the app, then return to this state and the memory will be cleared
  //  useEffect(() => {clearAll()})
  useEffect(() => {getData(currentValue,setCurrentValue);setFirstCall(false)},[]) 
  
  // this stores the currentValue whenever there is a change
  // except when the app is first loaded, then getData stores the
  // initial value...
  useEffect(() => { firstCall || storeData(currentValue) }, [currentValue])
  
  return (
    <ValueContext.Provider
        value={{currentValue,setCurrentValue}} >
      {children}
    </ValueContext.Provider>
   )
}
  
  const getData = async (currentValue, setCurrentValue) => {
    try {
      storage
        .load({
          key: 'sharedData',
          id: '1'
        })
        .then(ret => {
          // found data goes to then()
          if (ret == undefined) {
            ret = []
          }
          setCurrentValue(ret);
          console.log('just read' + JSON.stringify(ret));
        })
        .catch(err => {
          // any exception including data not found
          // goes to catch()
          console.warn(err.message);
          switch (err.name) {
            case 'NotFoundError':
              // if data is not found, initialize it
              storeData(currentValue)
              console.log('NotFoundError');
              break;
            case 'ExpiredError':
              // TODO
              console.log('ExpiredError');
              break;
          }
        });        
    } catch (e) {
      console.log("error in getData ")
      console.dir(e)
      // error reading value
    }

  }

  const storeData = async (value) => {
    try {
      await storage.save({
        key: 'sharedData', // Note: Do not use underscore("_") in key!
        id: '1', // Note: Do not use underscore("_") in id!
        data: value,
        expires: null  // never expires
      });
      const jsonValue = JSON.stringify(value)
      console.log('just stored ' + jsonValue)
    } catch (e) {
      console.log("error in storeData ")
      console.dir(e)
      // saving error
    }
  }

  const clearAll = async () => {
    try {
      console.log('in clearData')
      await storage.clearMapForKey('sharedData');
    } catch (e) {
      console.log("error in clearAll ")
      console.dir(e)
      // clear error
    }
  }
export default ValueProvider
export const useValue = () => useContext(ValueContext)
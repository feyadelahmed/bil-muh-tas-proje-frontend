import { useState } from "react";
import classes from "./FilterBox.module.css";

export default function({label, data, onChange}) {
  function changed(e) {
    const {value, checked} = e.target; 
    onChange(prev => {
      if (checked) {
        return [...prev, value]
      } else {
        return [...prev.filter(i => i != value)]
      }
    });
  }

  const items = data.map(item => <div className={classes.itemCont} key={item}>
      <input type="checkbox" onChange={changed} id={item} value={item}/>
      <label type="checkbox" onChange={changed} htmlFor={item}>{item}</label>
    </div>
  )

  return (
    <div className={classes.filterBox}>
      <h3 className={classes.label}>{label}</h3>
      <div className={classes.list}>
        {items}
      </div>
    </div>
  );
}
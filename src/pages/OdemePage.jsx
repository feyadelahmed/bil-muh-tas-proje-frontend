import { useContext, useEffect, useState } from "react";
import { ReactContext } from "../context/reactContext";


export default function() {
  const ctx = useContext(ReactContext);
  const [url, setUrl] = useState('');

  useEffect(() => {
    (async function() {
      const response = await ctx.odemeUrlGetir(ctx.token, ctx.itemToBuy);
      setUrl(response.url);
    })();
  }, [ctx.itemToBuy]);

  return (
    <a href={url}>CLICK</a>
  );
}
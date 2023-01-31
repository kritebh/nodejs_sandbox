import React from 'react'

function Products() {

    const product = ["Laptop","Phone","Modem","PC","Desktop"]
    let anotherProducts = [...product]

    console.log(anotherProducts)

  return (
    <div>
        {product.map((p,i)=>{
           return <h2 key={i}>{p}</h2>;
        })}
    </div>
  )
}

export default Products
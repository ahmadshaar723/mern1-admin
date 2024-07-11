import React from 'react'
import { Link } from 'react-router-dom'
import addProduct from '../assets/addproduct.png'
import listProduct from '../assets/productlist.png'

function Sidebar() {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'}>
            <button className='sidebar-btn'>
                <img src={addProduct} alt="" height={50} width={50} />
                <span>Add Product</span>
            </button>
        </Link>
        <Link to={'/listproduct'}>
            <button className='sidebar-btn'>
                <img src={listProduct} alt="" height={50} width={50} />
                <span>Product List</span>
            </button>
        </Link>
    </div>
  )
}

export default Sidebar
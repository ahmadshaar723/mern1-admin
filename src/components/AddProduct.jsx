import { useState } from "react";
import upload_area from "../assets/upload_area.svg";
import { MdAdd } from "react-icons/md";

function AddProduct() {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    new_price: "",
    old_price: "",
    category: "women",
  });

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    console.log(image);
  };

  const Add_Product = async ()=>{
    console.log(productDetails);
    let responseData;
    let product=productDetails;

    let formData=new FormData();
    formData.append('product',image);

    await fetch('https://mern1-back-1.onrender.com/upload',{
        method:'POST',
        headers:{
            Accept:'application/json',
        },
        body:formData,
    }).then((resp)=> resp.json()).then((data)=> {responseData=data})

    if(responseData.success){
        product.image = responseData.image_url;
        await fetch('https://mern1-back-1.onrender.com/addproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(product),
        }).then((resp)=> resp.json()).then((data)=>{
            data.success?alert("Product Added"):alert("UploadFailed")
        })
    }
  }

  return (
    <div className="addproduct">
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Product title: </h4>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here.."
          className="add-input"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Price: </h4>
        <input
          value={productDetails.old_price}
          onChange={changeHandler}
          type="number"
          name="old_price"
          placeholder="Type here.."
          className="add-input"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Offer Price: </h4>
        <input
          value={productDetails.new_price}
          onChange={changeHandler}
          type="number"
          name="new_price"
          placeholder="Type here.."
          className="add-input"
        />
      </div>
      <div className="mb-3 flex gap-x-4">
        <h4 className="bold-18 pb-2">Product Category:</h4>
        <select
          name="category"
          id=""
          value={productDetails.category} 
          onChange={changeHandler}
          className="bg-primary outline-none ring-1 ring-slate-900/20 medium-16 rounded-sm "
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div>
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="w-20 rounded-sm inline-block cursor-pointer"
          />
        </label>
        <input
          type="file"
          onChange={imageHandler}
          name="image"
          id="file-input"
          hidden
          className="bg-primary max-w-80 w-full py-3 px-4"
        />
      </div>
      <button onClick={()=>Add_Product()} className="btn_dark_rounded flexCenter mt-4 gap-x-1">
        
        <MdAdd /> Add Product
      </button>
    </div>
  );
}

export default AddProduct;

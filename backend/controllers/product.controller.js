import Product from '../models/product-model.js';


export const  getProducts =async (req, res) =>{
    try{
      const products = await Product.find({});
      res.status(200).json({success: true, data: products});
    }
    catch(error){
      console.log("Error in fetching products:", error.Message);
      res.status(500).json({success: false, Message:"Server Error"});
    }
  }

  export const createProduct = async (req, res) => {
      const product = req.body;//user will send this data 
      if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, Message: "Please provide all fields" });
      }
      const newProduct = new Product(product)
      try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
      } catch (error) {
        console.error("Error in Create product:", error.Message);
        res.status(500), json({ success: false, Message: "Server Error" });
      }
    }

    export const updateProduct =async(req, res) => {
      const{ id }= req.params;
      const product = req.body;
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, Message:"Invalid Product Id"});
      }
      try
      {
       const updateProduct = await Product.findByIdAndUpdate(id, product,{new:true});
      res.status(200).json({success:true,data:updateProduct});
      }
      catch(error){
        res.status(500).json({success:false,Message:"server error"});
      }
      }

      export const deleteProduct = async (req, res) =>{ 
        const{id} = req.params;
       // console.log("id:",id);
       try{
      await Product.findByIdAndDelete(id);
      res.status(200).json({success: true, Message:"Product deleted"});
       }
       catch(error)
       {
      console.log("error in deleting product:",error.Message);
      res.status(404).json({success:false,Message:"Product not found"});
      }
      }
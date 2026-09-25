const mongoose = require("mongoose");
const Product=require('../models/Product')

const slugify = require("slugify");
const Product = require("../models/Product");
const ProductVariant = require("../models/ProductVariant");



exports.create = async (req, res) => {
  try {
    const {
      title,
      brand,
      category,
      description,
      thumbnail,
      variants = [],
      bulletPoints = [],
      specifications = [],
      backendKeywords = [],
      tags = [],
      highlights = [],
      images = [],
      videos = [],
      ...rest
    } = req.body;

    
    if (!title || !brand || !category || !description || !thumbnail) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    
    let slug = slugify(title, {
      lower: true,
      strict: true,
    });

    let count = 1;

    while (await Product.findOne({ slug })) {
      slug = `${slugify(title, {
        lower: true,
        strict: true,
      })}-${count++}`;
    }

    const product = await Product.create({
      title,
      slug,
      brand,
      category,
      description,
      thumbnail,

      bulletPoints,
      specifications,
      backendKeywords,
      tags,
      highlights,

      images,
      videos,

      hasVariants: variants.length > 0,
      variants,

      ...rest,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// exports.getAll = async (req, res) => {
//     try {
//         const filter={}
//         const sort={}
//         let skip=0
//         let limit=0 

//         if(req.query.brand){
//             filter.brand={$in:req.query.brand}
//         }

//         if(req.query.category){
//             filter.category={$in:req.query.category}
//         }

//         if(req.query.user){
//             filter['isDeleted']=false
//         }

//         if(req.query.sort){
//             sort[req.query.sort]=req.query.order?req.query.order==='asc'?1:-1:1
//         }

//         if(req.query.page && req.query.limit){

//             const pageSize=req.query.limit
//             const page=req.query.page

//             skip=pageSize*(page-1)
//             limit=pageSize
//         }

//         const totalDocs=await Product.find(filter).sort(sort).populate("brand").countDocuments().exec()
//         const results=await Product.find(filter).sort(sort).populate("brand").skip(skip).limit(limit).exec()

//         res.set("X-Total-Count",totalDocs)

//         res.status(200).json(results)
    
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:'Error fetching products, please try again later'})
//     }
// };


exports.getAll = async (req, res) => {
  try {
    const filter = {};
    const sort = {};
    let skip = 0;
    let limit = 0;

    
    if (req.query.brand) {
      const brands = Array.isArray(req.query.brand) ? req.query.brand : [req.query.brand];
      filter.brand = { $in: brands };
    }

    
    if (req.query.category) {
      const categories = Array.isArray(req.query.category) ? req.query.category : [req.query.category];
      filter.category = { $in: categories };
    }

    
    if (req.query.minPrice && req.query.maxPrice) {
      filter.price = { $gte: Number(req.query.minPrice), $lte: Number(req.query.maxPrice) };
    } else if (req.query.maxPrice) {
      filter.price = { $lte: Number(req.query.maxPrice) };
    }

    
    if (req.query.q) {
      filter.title = { $regex: req.query.q, $options: 'i' };
    }

    
    if (req.query.user) {
      filter.isDeleted = false;
    }

   
    if (req.query.sort) {
      sort[req.query.sort] = req.query.order === 'asc' ? 1 : -1;
    }

    
    if (req.query.page && req.query.limit) {
      const pageSize = Number(req.query.limit);
      const page = Number(req.query.page);
      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    
    const totalDocs = await Product.countDocuments(filter);

    
    const results = await Product.find(filter)
      .sort(sort)
      .populate('brand', 'name image')
      .populate('category', 'name image')
      .skip(skip)
      .limit(limit)
      .exec();

    res.set('X-Total-Count', totalDocs);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching products, please try again later' });
  }
};






exports.getById=async(req,res)=>{
    try {
        const {id}=req.params
        const result=await Product.findById(id).populate("brand").populate("category")
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting product details, please try again later'})
    }
}


exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating product, please try again later",
    });
  }
};

exports.undeleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const unDeleted=await Product.findByIdAndUpdate(id,{isDeleted:false},{new:true}).populate('brand')
        res.status(200).json(unDeleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error restoring product, please try again later'})
    }
}

exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Product.findByIdAndUpdate(id,{isDeleted:true},{new:true}).populate("brand")
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error deleting product, please try again later'})
    }
}


exports.getGroupedByPrice = async (req, res) => {
  try {
    const priceRanges = [
      { label: "Under ₹199", min: 0, max: 199 },
      { label: "Under ₹299", min: 200, max: 299 },
      { label: "Under ₹399", min: 300, max: 399 },
      { label: "Under ₹499", min: 400, max: 499 },
    ];

    const grouped = {};

    for (const range of priceRanges) {
      const products = await Product.find({
        price: { $gte: range.min, $lte: range.max },
        isDeleted: false,
      })
        .limit(4)
        .sort({ updatedAt: -1 })
        .populate("brand", "name image")
        .populate("category", "name");

      grouped[range.max] = {
        label: range.label,
        products,
      };
    }

    res.status(200).json(grouped);
  } catch (error) {
    console.error("Error in getGroupedByPrice:", error);
    res.status(500).json({ message: "Error fetching grouped price data" });
  }
};

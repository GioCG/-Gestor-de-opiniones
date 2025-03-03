import Category from "../src/category/category.model.js"
 
export const createDefaultCategory = async() =>{
    try{
        const categoryExistent = await  Category.findOne({ name: "default" });
 
        if(categoryExistent){
            console.log("Ya existe una categoria por default");
            return;
        }
 
        const categoryData ={
            name: "default"
        };
 
        const newCategory = new Category(categoriData);
        await newCategory.save();
        console.log("Categoria creada exitosamente")
    }catch(err){
        console.error("Error al crear la categoria por defecto:", err.message);
    }
}
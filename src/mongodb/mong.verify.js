import { ModelProduct } from "./mongoose.model.js";
import { initMongoDB }  from "./mong.connect.js";

const mongoTest = async () =>{
    try {
      await initMongoDB();

      const product = {
        name: 'Suspension Neumatica',
        stock: 5,
        category: 'Suspension',
        precio: 1250000
      };

      return await ModelProduct.create(product);

    } catch (error) {
      console.error(error.message);
    }
  }
  
  mongoTest();
const { Product, Image, Brand, sequelize, Sequelize } = require("../database/models/index");
const { Op } = Sequelize;

// Paginación : https://www.bezkoder.com/node-js-sequelize-pagination-mysql/


/**
 * MySQl recive limit y offset, y la "API" recive size y page
 * transformamos los valores en algo que MySQL entienda.
 * Ejemplo
 *  api/prducts?page=1&size=10
 *  limit = 10
 *  offset = 1*10
 * 
 *  En la página [1] los registron van desde [10 a 19]
 * 
 * limit = size
 * offset = page * size
 * 
 * @param {*} page 
 * @param {*} size 
 * @returns 
 */
const getPagination = (page, size) => {
    const limit = size ? parseInt(size) : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};


/**
 * 
 * @param {*} rowsCount { count, rows }
 * @param {*} page 
 * @param {*} limit 
 * @returns 
 */
const getPagingData  = (rowsCount, page, limit) => {
    // count: total de items para una query en particular, rows: registros de la bd
    let { count: total, rows: data } = rowsCount;
    let currentPage = page ? page : 0;
    let totalPages = Math.ceil(total / limit);

  return { total, data, totalPages, currentPage };
}


const controller = {
    getAll: async (req, res) => {
        let { page, size } = req.query;
        
        // let include = ['Color','Brand','Category','Visibility','Size', 'Images'];
        // let include = [{ model: Brand }];

        let meta = { status: "success", length: 0, url: req.originalUrl };

        const { limit, offset } = getPagination(page, size);

        try {
            // rows = products
            // count = total de items en la busqueda
            let rowsCount = await Product.findAndCountAll({ where: { visibilityId: 1 },limit, offset });

            meta.length = rowsCount.count;

            let data = getPagingData(rowsCount, page, limit);

            res.status(200).json({ meta, data });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getOneById: async(req, res) => {
        let { id } = req.params;
        let include = ['Color','Brand','Category','Visibility','Size', 'Images'];

        try {
            let product = await Product.findByPk(id, { include });

            res.status(200).json({ data: product });   
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    search: async (req, res) => {
        let { q, category, color } = req.query;
        let { page, size } = req.query;

        const { limit, offset } = getPagination(page, size);

        let clause = { 
            where: {
                [Op.or]: [
                    { 
                        name: { [Op.like]: q? `%${q}%` : ""}
                    }, 
                    {
                        description: { [Op.like]: q? `%${q}%` : ""}
                    }
                ],
                [Op.and]: [ ]
            },
            limit,
            offset
        };

        if( category && category.length ) {
            clause['where'][Op.and].push({ 
                categoryId: { [Op.eq]: category }
            });
        }

        if( color && color.length ) {
            clause['where'][Op.and].push({ 
                colorId: { [Op.eq]: color }
            });
        }

        if( brand && brand.length ) {
            clause['where'][Op.and].push({ 
                brandId: { [Op.eq]: brand }
            });
        }

        if( size && size.length ) {
            clause['where'][Op.and].push({ 
                sizeId: { [Op.eq]: size }
            });
        }

        
        try {
            let rowsCount = await Product.findAndCountAll(clause);

            let data = getPagingData(rowsCount, page, limit);

            res.status(200).json({ data });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    /*      CRUD        */
    saveOne: async (req, res) => {
        let t;
        let { name, desc, price, stock, stockMin, stockMax, brand, category, size, visible, color, images } = req.body;
        let imagesProducts = [];

        let objAux = {
            name,
            description: desc,
            price,
            stock,
            stock_min: stockMin,
            stock_max: stockMax,
            brandId: brand,
            categoryId: category,
            sizeId: size,
            visibilityId: visible,
            colorId: color
        };

        try {
            t = await sequelize.transaction();

            let newProduct = await Product.create( objAux,{ transaction: t });
            
            imagesProducts = images.map( url => {
                return { name: url, productId: newProduct.id };
            });
            
            let productIamges = await Image.bulkCreate(imagesProducts,{ transaction: t });

            t.commit();

            let data = { 
                product: newProduct, 
                images: productIamges 
            }

            res.status(201).json({ data });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    },
    updateOneById: async (req, res) => {
        let t;
        let { id } = req.params;
        let { name, desc, price, stock, stockMin, stockMax, brand, category, size, visible, color, images } = req.body;

        let objAux = {
            name,
            description: desc,
            price,
            stock,
            stock_min: stockMin,
            stock_max: stockMax,
            brandId: brand,
            categoryId: category,
            sizeId: size,
            visibilityId: visible,
            colorId: color
        };

        try {
            t = await sequelize.transaction();
            // retorna la cantidad de registros afectados
            await Product.update(objAux, { where: { id }, transaction: t});

            let imagesProduct = await Image.findAll({ where: { productId: id }});

            for (let i = 0; i < imagesProduct.length; i++) {
                imagesProduct[i].set({ name: images[i] });
                await imagesProduct[i].save({ transaction: t});
            }

            let updatedproduct = await Product.findByPk(id);
            t.commit();

            res.status(201).json({ meta, data: updatedproduct });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    },
    deleteOneById: async( req, res) => {
        let t;
        let { id } = req.params;

        try {
            t = await sequelize.transaction();

            await Image.destroy( { where: { productId: id }, transaction: t });
            await Product.destroy( { where: { id }, transaction: t } );
            
            t.commit();

            res.status(200).json({ data: true });
        } catch (error) {
            t.rollback();
            res.status(500).json({ error: error.message });
        }
    }
}


module.exports = controller;
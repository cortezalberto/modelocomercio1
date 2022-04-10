## Pruebas con Postman

### [ GET ]
Get all | paginado automatico (page=0 size=3) en caso de no especificar `page` `size` en la url 
* **page** : numero de página.
* **size** : cantidad de registros por página.
```
localhost:3000/api/v1/products/api/v1/products/?page=0&size=5
```

Get by id | no paginado
```
localhost:3000/api/v1/products/api/v1/products/details/:id
```

Search | paginado automatico.
* **q** : string a buscar en `products.name` o en `products.description` | requerido | valor por defecto `""`
* **color** : entero que representa el id del foreing key `products.colorId` | opcional
* **category** : entero que representa el id del foreing key `products.categoryId` | opcinal

*Solo se puede filtrar por categoria y color por el momento.*
```
localhost:3000/api/v1/products/api/v1/products/search?q=string&color=number&category=number
```

Search con paginado
```
localhost:3000/api/v1/products/api/v1/products/search?page=0&size=5&q=string&color=number&category=number
```

### [ POST ]
Crear un producto
```
localhost:3000/api/v1/products/
```

body:
```
{
    "name": "Small Soft Gloves",
    "desc": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    "price": 60.00,
    "stock": 200,
    "stockMin": 10,
    "stockMax": 300,
    "brand": 2,
    "category": 1,
    "size": 2,
    "visible": 1,
    "color": 2,
    "images": [
        "https://cdn.shopify.com/s/files/1/0019/1843/5381/products/ac16c283988397.5d4d47cb151e9_2000x.jpg?v=1566480120",
        "https://images.squarespace-cdn.com/content/v1/5811b29bb8a79b740e329a5c/1618552216395-TXBHGC85HY5FCCV0GGCS/product-box-mockup-template.png?format=1500w",
        "https://images.squarespace-cdn.com/content/v1/5811b29bb8a79b740e329a5c/1618552216395-TXBHGC85HY5FCCV0GGCS/product-box-mockup-template.png?format=1500w"
    ]
}
```

### [ PUT ]
Actualizar un producto
```
localhost:3000/api/v1/products/:id
```

body:
```
{
    "name": "Small Soft Gloves fix v.1",
    "desc": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    "price": 75.00,
    "stock": 160,
    "stockMin": 100,
    "stockMax": 500,
    "brand": 1,
    "category": 1,
    "size": 1,
    "visible": 1,
    "color": 1,
    "images": [
        "https://cdn.shopify.com/s/files/1/0019/1843/5381/products/ac16c283988397.5d4d47cb151e9_2000x.jpg?v=1566480120",
        "https://images.squarespace-cdn.com/content/v1/5811b29bb8a79b740e329a5c/1618552216395-TXBHGC85HY5FCCV0GGCS/product-box-mockup-template.png?format=1500w",
        "https://cdn.shopify.com/s/files/1/0019/1843/5381/products/ac16c283988397.5d4d47cb151e9_2000x.jpg?v=1566480120"
    ]
}
```

### [ DELETE ]
Eliminar un producto
```
localhost:3000/api/v1/products/:id
```
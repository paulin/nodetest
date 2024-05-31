# Full-Stack Application with Node.js, Express, React, and PostgreSQL

This project is a full-stack application scaffolded with Node.js, Express, React, and PostgreSQL. It includes dynamically generated CRUD endpoints and React components based on your database models.

The following explains how this was created.

## Project Structure

```
my-fullstack-app/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── ...
├── config/
│   └── database.js
├── models/
│   ├── customers.js
│   ├── customers_email_domains.js
│   ├── customers_buybox_regions.js
│   ├── customers_eins.js
│   ├── deals.js
│   ├── deals_listings.js
│   ├── listings.js
│   ├── listings_properties.js
│   ├── markets.js
│   ├── properties.js
│   ├── property_events.js
│   ├── property_photos.js
│   ├── property_snapshots.js
│   ├── settings.js
│   ├── users.js
│   ├── index.js
│   └── init-models.js
├── routes/
│   └── dynamicRoutes.js
├── server.js
├── plopfile.js
├── generateComponents.js
└── package.json
```

## Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running
- Sequelize CLI installed globally (optional)

## Setup Instructions

### Step 1: Set Up the Backend

1. **Initialize the Node.js Project**

    ```bash
    mkdir my-fullstack-app
    cd my-fullstack-app
    npm init -y
    ```

2. **Install Dependencies**

    ```bash
    npm install express sequelize pg pg-hstore cors
    npm install --save-dev nodemon sequelize-cli
    ```

3. **Configure Database Connection**

    Create `config/database.js` and configure your PostgreSQL connection:

    ```javascript
    const { Sequelize } = require('sequelize');

    const sequelize = new Sequelize('database', 'username', 'password', {
      host: 'localhost',
      dialect: 'postgres'
    });

    module.exports = sequelize;
    ```

4. **Create Models**

    Define your models in the `models` folder. Example for `models/customers.js`:

    ```javascript
    const { DataTypes } = require('sequelize');
    const sequelize = require('../config/database');

    const Customer = sequelize.define('Customer', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'customers',
    });

    module.exports = Customer;
    ```

5. **Load Models Dynamically**

    Ensure `models/index.js` dynamically loads all models:

    ```javascript
    const fs = require('fs');
    const path = require('path');
    const Sequelize = require('sequelize');
    const sequelize = require('../config/database');

    const db = {};

    fs.readdirSync(__dirname)
      .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'init-models.js')
      .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      });

    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    module.exports = db;
    ```

### Step 2: Create Dynamic Routes

1. **Create Dynamic Routes**

    Create `routes/dynamicRoutes.js` to dynamically generate CRUD routes for all models:

    ```javascript
    const express = require('express');
    const models = require('../models');

    const router = express.Router();

    Object.keys(models).forEach((modelName) => {
      const Model = models[modelName];

      if (modelName === 'sequelize' || modelName === 'Sequelize') {
        return;
      }

      // Create
      router.post(`/${modelName.toLowerCase()}`, async (req, res) => {
        try {
          const item = await Model.create(req.body);
          res.json(item);
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      });

      // Read all
      router.get(`/${modelName.toLowerCase()}`, async (req, res) => {
        try {
          const items = await Model.findAll();
          res.json(items);
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      });

      // Read one
      router.get(`/${modelName.toLowerCase()}/:id`, async (req, res) => {
        try {
          const item = await Model.findByPk(req.params.id);
          if (item) {
            res.json(item);
          } else {
            res.status(404).json({ error: 'Item not found' });
          }
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      });

      // Update
      router.put(`/${modelName.toLowerCase()}/:id`, async (req, res) => {
        try {
          const [updated] = await Model.update(req.body, {
            where: { id: req.params.id },
          });
          if (updated) {
            const updatedItem = await Model.findByPk(req.params.id);
            res.json(updatedItem);
          } else {
            res.status(404).json({ error: 'Item not found' });
          }
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      });

      // Delete
      router.delete(`/${modelName.toLowerCase()}/:id`, async (req, res) => {
        try {
          const deleted = await Model.destroy({
            where: { id: req.params.id },
          });
          if (deleted) {
            res.json({ message: 'Item deleted' });
          } else {
            res.status(404).json({ error: 'Item not found' });
          }
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      });
    });

    module.exports = router;
    ```

2. **Use Dynamic Routes in Server**

    Update `server.js` to use these dynamic routes:

    ```javascript
    const express = require('express');
    const cors = require('cors');
    const sequelize = require('./config/database');
    const dynamicRoutes = require('./routes/dynamicRoutes');

    const app = express();
    const PORT = process.env.PORT || 5000;

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Use dynamic routes
    app.use('/api', dynamicRoutes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    sequelize.authenticate()
      .then(() => console.log('Database connected...'))
      .catch(err => console.log('Error: ' + err));
    ```

### Step 3: Set Up the Frontend

1. **Create React App**

    ```bash
    npx create-react-app client
    ```

2. **Install Axios**

    ```bash
    cd client
    npm install axios
    ```

3. **Set Up Proxy for API Requests**

    Add the following to `client/package.json`:

    ```json
    "proxy": "http://localhost:5000"
    ```

### Step 4: Generate React Components

1. **Install Plop**

    ```bash
    npm install --save-dev plop
    ```

2. **Create Plopfile**

    Create `plopfile.js` to dynamically generate React components:

    ```javascript
    const fs = require('fs');
    const path = require('path');
    const { pascalCase, lowerCase } = require('change-case');

    module.exports = function (plop) {
      const modelsDir = path.join(__dirname, 'models');
      const models = fs.readdirSync(modelsDir)
        .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'init-models.js')
        .map(file => file.replace('.js', ''));

      plop.setHelper('pascalCase', (text) => pascalCase(text));
      plop.setHelper('lowerCase', (text) => lowerCase(text));

      models.forEach((model) => {
        plop.setGenerator(model, {
          description: `generate a CRUD React component for ${model}`,
          prompts: [],
          actions: [
            {
              type: 'add',
              path: `client/src/components/{{pascalCase name}}.js`,
              templateFile: 'plop-templates/Component.js.hbs',
            },
          ],
        });
      });
    };
    ```


3. **Create Component Template**

    Create `plop-templates/Component.js.hbs`:

    ```handlebars
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';

    function {{pascalCase name}}() {
        const [items, setItems] = useState([]);
        const [form, setForm] = useState({});

        useEffect(() => {
            fetchItems();
        }, []);

        const fetchItems = async () => {
            const response = await axios.get(`/api/{{lowerCase name}}`);
            setItems(response.data);
        };

        const handleChange = (e) => {
            setForm({
                ...form,
                [e.target.name]: e.target.value,
            });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            await axios.post(`/api/{{lowerCase name}}`, form);
            fetchItems();
        };

        const handleDelete = async (id) => {
            await axios.delete(`/api/{{lowerCase name}}/${id}`);
            fetchItems();
        };

        return (
            <div>
                <h1>{{pascalCase name}}</h1>
                <form onSubmit={handleSubmit}>
                    <input name="name" onChange={handleChange} placeholder="Name" />
                    <button type="submit">Add</button>
                </form>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.name} <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    export default {{pascalCase name}};
    ```

4. **Generate Components for All Models**

    Create a script to automate the generation of React components for each model.

    **generateComponents.js**

    ```javascript
    const { exec } = require('child_process');

    const models = [
      'Customer',
      'CustomerEmailDomain',
      'CustomersBuyboxRegion',
      'CustomersEin',
      'Deal',
      'DealsListing',
      'Listing',
      'ListingProperty',
      'Market',
      'Property',
      'PropertyEvent',
      'PropertyPhoto',
      'PropertySnapshot',
      'Setting',
      'User'
    ];

    models.forEach((model) => {
      exec(`npx plop --plopfile plopfile.js ${model}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error generating component for ${model}:`, error);
          return;
        }
        console.log(`Component for ${model} generated successfully.`);
        console.log(stdout);
        console.error(stderr);
      });
    });
    ```

5. **Run the Script**

    Run the script to generate the components:

    ```bash
    node generateComponents.js
    ```

### Step 5: Use the Generated Components in Your React App

1. **Import and Use Components**

    In `client/src/App.js`, import and use the generated components:

    ```javascript
    import React from 'react';
    import Customer from './components/Customer';
    import CustomerEmailDomain from './components/CustomerEmailDomain';
    // Import other components similarly

    function App() {
      return (
        <div className="App">
          <Customer />
          <CustomerEmailDomain />
          {/* Add other components similarly */}
        </div>
      );
    }

    export default App;
    ```

### Final Notes

This setup provides a basic full-stack application with a Node.js backend, a React frontend, and a PostgreSQL database. The dynamic route generation and automated React component creation should help streamline the development process. You can further customize the templates and configurations to fit your specific needs.
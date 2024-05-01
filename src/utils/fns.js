export const formatRecipe = (recipeString) => {
    try {
        const recipe = JSON.parse(recipeString);

        // Format steps array
        recipe.steps = recipe.steps.map(step => step.trim());

        // Convert ingredients array to an object for easier access
        const formatIngredients = (ingredientsObj) => {
            const formattedIngredients = {};

            // Loop through each ingredient
            for (const [ingredientName, ingredientData] of Object.entries(ingredientsObj)) {
                // Trim whitespace from ingredient name
                const name = ingredientName.trim();

                // Check if name already exists, if so, merge quantities
                if (formattedIngredients[name]) {
                    formattedIngredients[name].quantity += ` + ${ingredientData.quantity}`;
                } else {
                    // If name doesn't exist, add it to formattedIngredients
                    formattedIngredients[name] = {
                        quantity: ingredientData.quantity,
                        name: ingredientData.name
                    };
                }
            }

            return formattedIngredients;
        };

        recipe.ingredients = formatIngredients(recipe.ingredients);

        return recipe;
    } catch (error) {
        console.error('Error formatting recipe:', error);
        return null;
    }
};

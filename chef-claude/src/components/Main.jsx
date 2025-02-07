import {useState} from 'react';

export default function Main() {
    const ingredients = ["Bread", "Oregano", "Tomatoes"]
    const [ingredientsList, setIngredientsList] = useState(ingredients);
    function handleClick() {
        console.log("button clicked")
    }

    const ingredientListItems = ingredientsList.map(item => <li key={item}>{item}</li>)

    function handleSubmit(event) {
        event.preventDefault();
        console.log("form submitted")
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient")
        console.log(newIngredient)
        setIngredientsList(prevItems => [...prevItems, newIngredient])
    }

    return <main>
        <form onSubmit={handleSubmit} className="add-ingredient-form">
            <input type="text" placeholder="e.g.Oregano" aria-label="Add ingredient" name="ingredient"/>
            <button onClick={handleClick} onMouseOver={e => console.log('onMouseOver')}>Add ingredient</button>
        </form>
        <ul>
            {ingredientListItems}
        </ul>
    </main>
}
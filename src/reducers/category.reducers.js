import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null
};

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];

    if(parentId === undefined)
    {
        return [
            ...categories, 
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ];
    }

    for(let cat of categories)
    {
        if(cat._id === parentId)
        {
            const newCategory = {
                _id: category._id,
                name: category.name,
                parentId: category.parentId,
                slug:category.slug,
                children: []
            }
            myCategories.push({
                ...cat, 
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            });
        }
        else
        {
            myCategories.push({
                ...cat, 
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }
    }
    return myCategories;
}

const categoryReducer = (state=initState, action) => {
    switch (action.type) {
        case categoryConstants.CATEGORY_SUCCESS:
            return state = {
                ...state,
                categories: action.payload.categories
            }  
        case categoryConstants.ADD_CATEGORY_REQUEST:
            return state = {
                ...state,
                loading: true
            }
        case categoryConstants.ADD_CATEGORY_SUCCESS:
            const category = action.payload.category;
            return state = {
                ...state,
                categories: buildNewCategories(category.parentId, state.categories, category),
                loading: false
            }
        case categoryConstants.ADD_CATEGORY_FAILURE:
            return state = {
                ...initState            
            }
        default:
            return state;
    }
}

export default categoryReducer;
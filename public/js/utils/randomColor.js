
const { floor, random } = Math;

/**
 * @see https://www.paulirish.com/2009/random-hex-color-code-snippets/
 */
const randomColor = () => floor(random() * 16777215);

export default randomColor;

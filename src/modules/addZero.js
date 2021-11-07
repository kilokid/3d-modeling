const addZero = (num) => {
    return String(num).length === 1 ? "0" + num : num;      
};

export default addZero;
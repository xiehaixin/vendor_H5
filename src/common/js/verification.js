
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function checkPhone(phone) {
    console.log(phone);
    
    if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
        return false; 
    } 
        return true
   
  }
  